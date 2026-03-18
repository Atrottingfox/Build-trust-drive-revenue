import { supabase } from './supabase';

// --- Interfaces ---

export interface ContentEngineSession {
  id?: string;
  email: string;
  name?: string;
  current_stage: number;
  answers: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

export interface ContentEngineAngle {
  id?: string;
  session_id: string;
  title: string;
  source_question: string;
  suggested_type: string;
  raw_excerpt: string;
  is_manual: boolean;
  is_selected: boolean;
  created_at?: string;
}

export interface ContentEngineOutline {
  id?: string;
  angle_id: string;
  content_type: string;
  variation: string;
  hook: string;
  steps: Array<{ label: string; content: string }>;
  trust_layer: string;
  is_complete: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FullSessionData {
  session: ContentEngineSession;
  angles: ContentEngineAngle[];
  outlines: ContentEngineOutline[];
}

// --- Session ---

export async function saveSession(data: ContentEngineSession): Promise<ContentEngineSession> {
  try {
    const { data: session, error } = await supabase
      .from('content_engine_sessions')
      .upsert({
        id: data.id,
        email: data.email,
        name: data.name,
        current_stage: data.current_stage,
        answers: data.answers,
      }, {
        onConflict: 'email'
      })
      .select()
      .single();

    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Error saving session:', error);
    throw error;
  }
}

export async function getSessionByEmail(email: string): Promise<FullSessionData | null> {
  try {
    const { data: session, error: sessionError } = await supabase
      .from('content_engine_sessions')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (sessionError) throw sessionError;
    if (!session) return null;

    const { data: angles, error: anglesError } = await supabase
      .from('content_engine_angles')
      .select('*')
      .eq('session_id', session.id)
      .order('created_at', { ascending: true });

    if (anglesError) throw anglesError;

    const angleIds = (angles || []).map(a => a.id);
    let outlines: ContentEngineOutline[] = [];

    if (angleIds.length > 0) {
      const { data: outlinesData, error: outlinesError } = await supabase
        .from('content_engine_outlines')
        .select('*')
        .in('angle_id', angleIds)
        .order('created_at', { ascending: true });

      if (outlinesError) throw outlinesError;
      outlines = outlinesData || [];
    }

    return { session, angles: angles || [], outlines };
  } catch (error) {
    console.error('Error loading session:', error);
    return null;
  }
}

// --- Angles ---

export async function saveAngles(sessionId: string, angles: Omit<ContentEngineAngle, 'session_id'>[]): Promise<ContentEngineAngle[]> {
  try {
    // Delete existing angles for this session (cascade deletes outlines)
    await supabase
      .from('content_engine_angles')
      .delete()
      .eq('session_id', sessionId);

    if (angles.length === 0) return [];

    const { data, error } = await supabase
      .from('content_engine_angles')
      .insert(angles.map(a => ({ ...a, session_id: sessionId })))
      .select();

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error saving angles:', error);
    throw error;
  }
}

export async function updateAngleSelection(angleId: string, isSelected: boolean): Promise<void> {
  try {
    const { error } = await supabase
      .from('content_engine_angles')
      .update({ is_selected: isSelected })
      .eq('id', angleId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating angle selection:', error);
    throw error;
  }
}

// --- Outlines ---

export async function saveOutline(outline: ContentEngineOutline): Promise<ContentEngineOutline> {
  try {
    const { data, error } = await supabase
      .from('content_engine_outlines')
      .upsert(outline)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving outline:', error);
    throw error;
  }
}

// --- Tracking ---

export async function trackContentEngineUsage(email: string, eventType: string, metadata?: Record<string, unknown>): Promise<void> {
  try {
    const { data: contact } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', email)
      .single();

    if (contact) {
      await supabase
        .from('interactions')
        .insert({
          contact_id: contact.id,
          type: `content_engine_${eventType}`,
          description: JSON.stringify(metadata || {})
        });
    }
  } catch (error) {
    console.error('Error tracking usage:', error);
  }
}

// --- Local Storage helpers (pre-email gate) ---

const LOCAL_KEY = 'contentEngineV2';

export interface LocalEngineState {
  answers: Record<string, string>;
  currentStage: number;
  angles: Array<{
    id: string;
    title: string;
    sourceQuestion: string;
    suggestedType: string;
    rawExcerpt: string;
    isManual: boolean;
    isSelected: boolean;
  }>;
  outlines: Record<string, {
    contentType: string;
    variation: string;
    hook: string;
    steps: Array<{ label: string; content: string }>;
    trustLayer: string;
    isComplete: boolean;
  }>;
}

export function saveLocalState(state: LocalEngineState): void {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  } catch {
    // localStorage full or unavailable
  }
}

export function loadLocalState(): LocalEngineState | null {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearLocalState(): void {
  try {
    localStorage.removeItem(LOCAL_KEY);
  } catch {
    // ignore
  }
}
