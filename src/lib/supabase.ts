import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

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