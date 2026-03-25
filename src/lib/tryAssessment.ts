import { supabase } from './supabase';
import type { TryFormState, GeneratedCadence, ArchetypeScores } from '../types/try';

export async function saveTryAssessment(formState: TryFormState) {
  if (!formState.archetype || !formState.archetypeScores) {
    throw new Error('Archetype is required');
  }

  const { data, error } = await supabase
    .from('try_assessments')
    .insert({
      archetype: formState.archetype,
      archetype_scores: formState.archetypeScores as unknown as Record<string, number>,
      archetype_method: formState.archetypeMethod || 'quiz_8',
      quiz_responses: formState.quizResponses as unknown as Record<string, boolean>,
      industry: formState.industry,
      problem_area: formState.problemArea,
      platforms: formState.platforms,
      posting_frequency: formState.postingFrequency,
      phone: formState.phone || null,
      team_size: formState.teamSize,
      content_role: formState.contentRole,
      generated_cadence: formState.generatedCadence as unknown as Record<string, unknown>,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTryAssessment(id: string) {
  const { data, error } = await supabase
    .from('try_assessments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function markCalendlyBooked(id: string) {
  const { error } = await supabase
    .from('try_assessments')
    .update({ calendly_booked: true })
    .eq('id', id);

  if (error) throw error;
}

export async function markSmsSent(id: string) {
  const { error } = await supabase
    .from('try_assessments')
    .update({ sms_sent: true })
    .eq('id', id);

  if (error) throw error;
}
