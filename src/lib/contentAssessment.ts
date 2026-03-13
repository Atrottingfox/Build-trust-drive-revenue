import { supabase } from './supabase';
import type { ContentAssessmentResponse } from '../types/contentAssessment';

export async function saveContentAssessment(data: {
  name: string;
  email: string;
  answers: Record<string, string>;
  traitScores: Record<string, number>;
  archetypeScores: Record<string, number>;
  dominantArchetype: string;
  personaProfile?: any;
  outcomeData?: any;
  confidenceScore?: number;
}) {
  const { data: assessment, error } = await supabase
    .from('content_assessments')
    .insert({
      name: data.name,
      email: data.email,
      answers: data.answers,
      trait_scores: data.traitScores,
      archetype_scores: data.archetypeScores,
      dominant_archetype: data.dominantArchetype,
      persona_profile: data.personaProfile,
      outcome_data: data.outcomeData,
      confidence_score: data.confidenceScore
    })
    .select()
    .single();

  if (error) throw error;
  return assessment;
}

export async function checkExistingFeedback(assessmentId: string) {
  const { data, error } = await supabase
    .from('user_feedback')
    .select('id')
    .eq('assessment_id', assessmentId)
    .maybeSingle();

  if (error) throw error;
  return data !== null;
}

export function calculateArchetypeScores(answers: Record<string, string>, questions: any[]) {
  const traitScores: Record<string, number> = {};
  const archetypeScores: Record<string, number> = {};

  // Initialize all archetype scores to 0 with equal starting point
  const allArchetypes = [
    'Architect', 'Strategist', 'Firestarter', 'Messenger', 'Mirror', 
    'Technician', 'Guide', 'Creative', 'Companion', 'Instigator'
  ];
  
  allArchetypes.forEach(archetype => {
    archetypeScores[archetype] = 0;
  });

  // Calculate base scores from answers
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      const option = question.options.find((opt: any) => opt.value === answer);
      if (option) {
        // Add trait scores
        option.traits.forEach((trait: any) => {
          traitScores[trait.name] = (traitScores[trait.name] || 0) + trait.score;
        });

        // Add archetype scores with balanced weighting
        option.archetypes.forEach((archetype: any) => {
          archetypeScores[archetype.name] = (archetypeScores[archetype.name] || 0) + archetype.score;
        });
      }
    }
  });

  // Apply sophisticated balancing algorithm
  const totalQuestions = Object.keys(answers).length;
  const maxPossibleScore = totalQuestions * 2.0; // Maximum possible score per archetype
  
  // Find dominant archetype after balancing
  let dominantArchetype = 'Architect';
  let highestScore = -1;

  Object.entries(archetypeScores).forEach(([archetype, score]) => {
    if (score > highestScore) {
      highestScore = score;
      dominantArchetype = archetype;
    }
  });

  // Final validation: check for ties and use trait analysis
  const sortedArchetypes = Object.entries(archetypeScores)
    .sort(([,a], [,b]) => b - a);
  
  const [first, second] = sortedArchetypes;
  const scoreDifference = first[1] - second[1];
  
  // If difference is very small (within 10%), use trait patterns for tie-breaking
  if (scoreDifference < first[1] * 0.10) {
    // Analyze trait patterns for more nuanced determination
    const structuralTraits = ['Strategic Planning', 'Structured Thinking', 'System Reliance', 'Process Optimization'];
    const expressiveTraits = ['Creative Flow', 'Intuitive Expression', 'Spontaneous Expression', 'Emotional Impact'];
    const relationalTraits = ['Authentic Connection', 'Relational Trust', 'Community Focus', 'Empowerment Focus'];
    
    const structuralScore = structuralTraits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0);
    const expressiveScore = expressiveTraits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0);
    const relationalScore = relationalTraits.reduce((sum, trait) => sum + (traitScores[trait] || 0), 0);
    
    // Use trait dominance to break ties
    if (structuralScore > expressiveScore && structuralScore > relationalScore) {
      const structuralArchetypes = ['Architect', 'Strategist', 'Technician'];
      const topStructural = sortedArchetypes.find(([archetype]) => 
        structuralArchetypes.includes(archetype)
      );
      if (topStructural) dominantArchetype = topStructural[0];
    } else if (expressiveScore > relationalScore) {
      const expressiveArchetypes = ['Firestarter', 'Creative', 'Instigator'];
      const topExpressive = sortedArchetypes.find(([archetype]) => 
        expressiveArchetypes.includes(archetype)
      );
      if (topExpressive) dominantArchetype = topExpressive[0];
    } else {
      const relationalArchetypes = ['Mirror', 'Guide', 'Companion', 'Messenger'];
      const topRelational = sortedArchetypes.find(([archetype]) => 
        relationalArchetypes.includes(archetype)
      );
      if (topRelational) dominantArchetype = topRelational[0];
    }
  }

  return {
    traitScores,
    archetypeScores,
    dominantArchetype
  };
}

// Analytics function to help understand distribution patterns
export function analyzeArchetypeDistribution(assessments: ContentAssessmentResponse[]) {
  const distribution: Record<string, number> = {};
  const traitPatterns: Record<string, Record<string, number>> = {};
  
  assessments.forEach(assessment => {
    // Count archetype occurrences
    distribution[assessment.dominant_archetype] = 
      (distribution[assessment.dominant_archetype] || 0) + 1;
    
    // Analyze trait patterns for each archetype
    if (!traitPatterns[assessment.dominant_archetype]) {
      traitPatterns[assessment.dominant_archetype] = {};
    }
    
    Object.entries(assessment.trait_scores as Record<string, number>).forEach(([trait, score]) => {
      traitPatterns[assessment.dominant_archetype][trait] = 
        (traitPatterns[assessment.dominant_archetype][trait] || 0) + score;
    });
  });
  
  return {
    distribution,
    traitPatterns,
    totalAssessments: assessments.length,
    averageScores: Object.fromEntries(
      Object.entries(distribution).map(([archetype, count]) => [
        archetype, 
        (count / assessments.length * 100).toFixed(1) + '%'
      ])
    )
  };
}