import type {
  TryArchetypeId,
  ProblemArea,
  Platform,
  PostingFrequency,
  ContentRole,
  TeamSize,
  WhichA,
  Industry,
  GeneratedCadence,
  CadenceWeek,
  ContentPiece,
  ContentTypeId,
  PrimaryGoal,
} from '../types/try';
import { getContentForBucket } from './tryContentBank';
import { getArchetype } from './tryArchetypes';

const PROBLEM_TO_A: Record<ProblemArea, WhichA> = {
  clarity: 'attention',
  visibility: 'alignment',
  authority: 'authorship',
  qualification: 'achievability',
};

const WEEK_A_ORDER: WhichA[] = ['attention', 'alignment', 'authorship', 'achievability'];

const WEEK_LABELS: Record<WhichA, { label: string; description: string }> = {
  attention: {
    label: 'Attention',
    description: 'Discovery content. Hooks, pattern interrupts, broad reach. Stop the scroll.',
  },
  alignment: {
    label: 'Alignment',
    description: 'Belief shifting. Values, philosophy, positioning. Make them think "this is for me."',
  },
  authorship: {
    label: 'Authorship',
    description: 'Proof and demonstrations. Frameworks, case studies, earned credibility.',
  },
  achievability: {
    label: 'Achievability',
    description: 'Implementation. How-tos, quick wins, systems they can use today.',
  },
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const FREQUENCY_TO_WEEKLY: Record<PostingFrequency, number> = {
  not_posting: 2,
  '1-2x': 2,
  '3-4x': 4,
  '5+': 6,
};

export function generateCadence(params: {
  archetype: TryArchetypeId;
  problemArea: ProblemArea;
  platforms: Platform[];
  postingFrequency: PostingFrequency;
  contentRole: ContentRole;
  teamSize: TeamSize;
  industry: Industry;
}): GeneratedCadence {
  const {
    archetype,
    problemArea,
    platforms,
    postingFrequency,
    contentRole,
    teamSize,
    industry,
  } = params;

  const focusA = PROBLEM_TO_A[problemArea];
  const weeklySlots = FREQUENCY_TO_WEEKLY[postingFrequency];

  // Adjust total slots based on content role and team size
  const roleMultiplier = contentRole === 'primary' ? 1.2 : contentRole === 'secondary' ? 1 : 0.8;
  const teamMultiplier = teamSize === '1' ? 0.8 : teamSize === '2-5' ? 1 : 1.1;
  const adjustedWeekly = Math.max(2, Math.round(weeklySlots * roleMultiplier * teamMultiplier));

  // Distribute slots across 4 weeks — focus week gets ~40% more
  const baseSlots = adjustedWeekly;
  const focusSlots = Math.round(baseSlots * 1.4);

  const weeks: CadenceWeek[] = WEEK_A_ORDER.map((whichA, index) => {
    const isFocusWeek = whichA === focusA;
    const slotsThisWeek = isFocusWeek ? focusSlots : baseSlots;
    const { label, description } = WEEK_LABELS[whichA];

    // Get content bank entries for this archetype/industry/A
    const bankEntries = getContentForBucket(archetype, industry, whichA);

    // Generate content pieces for this week
    const pieces: ContentPiece[] = [];
    for (let i = 0; i < slotsThisWeek; i++) {
      const entry = bankEntries[i % bankEntries.length];
      const platform = platforms[i % platforms.length];
      const dayIndex = Math.floor((i / slotsThisWeek) * Math.min(DAYS.length, slotsThisWeek + 1));
      const dayOfWeek = DAYS[Math.min(dayIndex, DAYS.length - 1)];

      // For long-form types on YouTube/LinkedIn, keep them. For TikTok/IG, prefer short-form
      let contentType = entry.contentType;
      const isShortPlatform = platform === 'tiktok' || platform === 'instagram';
      const isLongType = contentType === 'teach' || contentType === 'distill' || contentType === 'apply';

      if (isShortPlatform && isLongType) {
        // Swap to a short-form type that matches the archetype
        const archetypeData = getArchetype(archetype);
        const shortTypes = archetypeData.preferredContentTypes.filter(
          t => t !== 'teach' && t !== 'distill' && t !== 'apply'
        );
        contentType = shortTypes[i % shortTypes.length];
      }

      pieces.push({
        weekNumber: index + 1,
        dayOfWeek,
        platform,
        contentType,
        variationName: entry.variationName,
        topic: entry.topic,
        angle: entry.angle,
        whichA,
        outline: entry.outline,
      });
    }

    return {
      weekNumber: index + 1,
      whichA,
      label,
      description,
      isFocusWeek,
      pieces,
    };
  });

  const totalPieces = weeks.reduce((sum, w) => sum + w.pieces.length, 0);

  return {
    weeks,
    archetype,
    problemArea,
    totalPieces,
  };
}
