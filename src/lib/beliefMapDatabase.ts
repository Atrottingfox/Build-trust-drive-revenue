import { supabase } from './supabase';

// Enhanced interface for tracking usage patterns
export interface BeliefMapUsageData {
  access_method: 'direct_link' | 'navigation' | 'referral';
  session_duration?: number;
  concepts_created: number;
  export_count: number;
  completion_status: 'started' | 'partial' | 'completed';
}

export interface BeliefMapEntry {
  id?: string;
  name: string;
  email: string;
  category_of_ownership?: string;
  unique_offer?: string;
  traits?: string;
  interests?: string;
  values?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BeliefMapConcept {
  id?: string;
  belief_map_id: string;
  title: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BeliefMapMessage {
  id?: string;
  concept_id: string;
  message: string;
  created_at?: string;
}

export interface BeliefMapContentIdea {
  id?: string;
  concept_id: string;
  idea: string;
  created_at?: string;
}

export interface FullBeliefMapData {
  entry: BeliefMapEntry;
  concepts: Array<{
    concept: BeliefMapConcept;
    messages: BeliefMapMessage[];
    content_ideas: BeliefMapContentIdea[];
  }>;
}

// Track belief map usage and engagement
export async function trackBeliefMapUsage(email: string, usageData: Partial<BeliefMapUsageData>): Promise<void> {
  try {
    // Get the user's contact record
    const { data: contact } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', email)
      .single();

    if (contact) {
      // Add interaction for usage tracking
      await supabase
        .from('interactions')
        .insert({
          contact_id: contact.id,
          type: 'belief_map_usage',
          description: JSON.stringify(usageData)
        });
    }
  } catch (error) {
    console.error('Error tracking belief map usage:', error);
    // Don't throw - this shouldn't block the user experience
  }
}

// Track when users export their belief map
export async function trackBeliefMapExport(email: string, exportType: 'worksheet' | 'belief_map'): Promise<void> {
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
          type: 'belief_map_export',
          description: `Exported ${exportType}`
        });
    }
  } catch (error) {
    console.error('Error tracking export:', error);
  }
}

// Create or update a belief map entry
export async function saveBeliefMapEntry(data: BeliefMapEntry): Promise<BeliefMapEntry> {
  try {
    const { data: entry, error } = await supabase
      .from('belief_map_entries')
      .upsert({
        name: data.name,
        email: data.email,
        category_of_ownership: data.category_of_ownership,
        unique_offer: data.unique_offer,
        traits: data.traits,
        interests: data.interests,
        values: data.values
      }, {
        onConflict: 'email'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving belief map entry:', error);
      throw error;
    }
    return entry;
  } catch (error) {
    console.error('Error in saveBeliefMapEntry:', error);
    throw error;
  }
}

// Get belief map entry by email
export async function getBeliefMapByEmail(email: string): Promise<FullBeliefMapData | null> {
  try {
    const { data: entry, error: entryError } = await supabase
      .from('belief_map_entries')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (entryError) {
      console.error('Error fetching belief map entry:', entryError);
      throw entryError;
    }

    if (!entry) return null;

    const { data: concepts, error: conceptsError } = await supabase
      .from('belief_map_concepts')
      .select(`
        *,
        belief_map_messages(*),
        belief_map_content_ideas(*)
      `)
      .eq('belief_map_id', entry.id);

    if (conceptsError) {
      console.error('Error fetching concepts:', conceptsError);
      throw conceptsError;
    }

    return {
      entry,
      concepts: concepts?.map(concept => ({
        concept: {
          id: concept.id,
          belief_map_id: concept.belief_map_id,
          title: concept.title,
          description: concept.description,
          created_at: concept.created_at,
          updated_at: concept.updated_at
        },
        messages: concept.belief_map_messages || [],
        content_ideas: concept.belief_map_content_ideas || []
      })) || []
    };
  } catch (error) {
    console.error('Error in getBeliefMapByEmail:', error);
    return null;
  }
}

// Save a concept
export async function saveBeliefMapConcept(concept: BeliefMapConcept): Promise<BeliefMapConcept> {
  try {
    const { data, error } = await supabase
      .from('belief_map_concepts')
      .upsert(concept)
      .select()
      .single();

    if (error) {
      console.error('Error saving concept:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in saveBeliefMapConcept:', error);
    throw error;
  }
}

// Delete a concept and all related data
export async function deleteBeliefMapConcept(conceptId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('belief_map_concepts')
      .delete()
      .eq('id', conceptId);

    if (error) {
      console.error('Error deleting concept:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteBeliefMapConcept:', error);
    throw error;
  }
}

// Save messages for a concept
export async function saveBeliefMapMessages(conceptId: string, messages: string[]): Promise<void> {
  try {
    // First, delete existing messages
    await supabase
      .from('belief_map_messages')
      .delete()
      .eq('concept_id', conceptId);

    // Then insert new messages
    if (messages.length > 0) {
      const { error } = await supabase
        .from('belief_map_messages')
        .insert(
          messages.filter(msg => msg.trim()).map(message => ({
            concept_id: conceptId,
            message
          }))
        );

      if (error) {
        console.error('Error saving messages:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in saveBeliefMapMessages:', error);
    throw error;
  }
}

// Save content ideas for a concept
export async function saveBeliefMapContentIdeas(conceptId: string, ideas: string[]): Promise<void> {
  try {
    // First, delete existing ideas
    await supabase
      .from('belief_map_content_ideas')
      .delete()
      .eq('concept_id', conceptId);

    // Then insert new ideas
    if (ideas.length > 0) {
      const { error } = await supabase
        .from('belief_map_content_ideas')
        .insert(
          ideas.filter(idea => idea.trim()).map(idea => ({
            concept_id: conceptId,
            idea
          }))
        );

      if (error) {
        console.error('Error saving content ideas:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in saveBeliefMapContentIdeas:', error);
    throw error;
  }
}

// Save complete belief map data
export async function saveCompleteBeliefMap(mapData: {
  name: string;
  email: string;
  categoryOfOwnership: string;
  uniqueOffer: string;
  traits: string;
  interests: string;
  values: string;
  concepts: Array<{
    id?: string;
    title: string;
    description: string;
    keyMessages: string[];
    contentIdeas: string[];
  }>;
}): Promise<void> {
  try {
    // Track completion status
    const completionStatus = mapData.concepts.length > 0 ? 
      (mapData.concepts.length >= 3 ? 'completed' : 'partial') : 'started';

    // Save the main entry
    const entry = await saveBeliefMapEntry({
      name: mapData.name,
      email: mapData.email,
      category_of_ownership: mapData.categoryOfOwnership,
      unique_offer: mapData.uniqueOffer,
      traits: mapData.traits,
      interests: mapData.interests,
      values: mapData.values
    });

    // Save each concept
    for (const conceptData of mapData.concepts) {
      const concept = await saveBeliefMapConcept({
        id: conceptData.id,
        belief_map_id: entry.id!,
        title: conceptData.title,
        description: conceptData.description
      });

      // Save messages and content ideas
      await saveBeliefMapMessages(concept.id!, conceptData.keyMessages);
      await saveBeliefMapContentIdeas(concept.id!, conceptData.contentIdeas);
    }

    // Track usage data
    await trackBeliefMapUsage(mapData.email, {
      concepts_created: mapData.concepts.length,
      completion_status: completionStatus,
      access_method: 'direct_link'
    });

  } catch (error) {
    console.error('Error saving belief map:', error);
    throw error;
  }
}

// Get all belief map entries (for admin purposes)
export async function getAllBeliefMapEntries(): Promise<BeliefMapEntry[]> {
  try {
    const { data, error } = await supabase
      .from('belief_map_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all entries:', error);
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error in getAllBeliefMapEntries:', error);
    throw error;
  }
}

// Get all belief map entries with their concepts (for admin dashboard)
export async function getAllBeliefMapsWithConcepts(): Promise<FullBeliefMapData[]> {
  try {
    const { data: entries, error: entriesError } = await supabase
      .from('belief_map_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (entriesError) {
      console.error('Error fetching entries:', entriesError);
      throw entriesError;
    }

    const fullData: FullBeliefMapData[] = [];

    for (const entry of entries || []) {
      const { data: concepts, error: conceptsError } = await supabase
        .from('belief_map_concepts')
        .select(`
          *,
          belief_map_messages(*),
          belief_map_content_ideas(*)
        `)
        .eq('belief_map_id', entry.id);

      if (conceptsError) {
        console.error('Error fetching concepts for entry:', entry.id, conceptsError);
        continue;
      }

      fullData.push({
        entry,
        concepts: concepts?.map(concept => ({
          concept: {
            id: concept.id,
            belief_map_id: concept.belief_map_id,
            title: concept.title,
            description: concept.description,
            created_at: concept.created_at,
            updated_at: concept.updated_at
          },
          messages: concept.belief_map_messages || [],
          content_ideas: concept.belief_map_content_ideas || []
        })) || []
      });
    }

    return fullData;
  } catch (error) {
    console.error('Error in getAllBeliefMapsWithConcepts:', error);
    throw error;
  }
}