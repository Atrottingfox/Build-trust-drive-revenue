import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper functions for CRM operations
export async function createContact(contactData: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status?: string;
  lead_source?: string;
}) {
  const { data, error } = await supabase
    .from('contacts')
    .insert(contactData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createQuizResponse(
  contactId: string,
  responseData: {
    name: string;
    email: string;
    answers: any;
    result: string;
  }
) {
  const { data, error } = await supabase
    .from('quiz_responses')
    .insert({
      ...responseData,
      contact_id: contactId
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addInteraction(
  contactId: string,
  type: string,
  description: string
) {
  const { data, error } = await supabase
    .from('interactions')
    .insert({
      contact_id: contactId,
      type,
      description
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createFollowUp(
  contactId: string,
  dueDate: Date,
  description: string,
  priority: 'low' | 'medium' | 'high' = 'medium'
) {
  const { data, error } = await supabase
    .from('follow_ups')
    .insert({
      contact_id: contactId,
      due_date: dueDate.toISOString(),
      description,
      priority
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addNote(
  contactId: string,
  content: string
) {
  const { data, error } = await supabase
    .from('notes')
    .insert({
      contact_id: contactId,
      content
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveUserFeedback(
  assessmentId: string,
  isAccurate: boolean,
  comments?: string
) {
  const { data, error } = await supabase
    .from('user_feedback')
    .insert({
      assessment_id: assessmentId,
      is_accurate: isAccurate,
      comments: comments || null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}