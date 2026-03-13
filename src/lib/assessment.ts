import { supabase } from './supabase';
import type { Database } from './database.types';

export async function saveAssessment(data: {
  name: string;
  email: string;
  archetype: string;
  platformPreference?: string;
  monetizationGoal?: string;
  contentStruggle?: string;
  responses: Array<{
    questionId: string;
    answer: string;
    score: Record<string, number>;
  }>;
  flags: Array<{
    type: string;
    value: string;
  }>;
}) {
  const { data: assessment, error: assessmentError } = await supabase
    .from('authority_assessments')
    .insert({
      name: data.name,
      email: data.email,
      archetype: data.archetype,
      platform_preference: data.platformPreference,
      monetization_goal: data.monetizationGoal,
      content_struggle: data.contentStruggle
    })
    .select()
    .single();

  if (assessmentError) throw assessmentError;

  // Save responses
  const { error: responsesError } = await supabase
    .from('assessment_responses')
    .insert(
      data.responses.map(response => ({
        assessment_id: assessment.id,
        question_id: response.questionId,
        answer: response.answer,
        score: response.score
      }))
    );

  if (responsesError) throw responsesError;

  // Save flags
  const { error: flagsError } = await supabase
    .from('assessment_flags')
    .insert(
      data.flags.map(flag => ({
        assessment_id: assessment.id,
        flag_type: flag.type,
        flag_value: flag.value
      }))
    );

  if (flagsError) throw flagsError;

  return assessment;
}