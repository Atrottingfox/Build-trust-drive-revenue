import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { ProgressBar } from '../components/try/ProgressBar';
import { ScreenArchetype } from '../components/try/ScreenArchetype';
import { ScreenIndustry } from '../components/try/ScreenIndustry';
import { ScreenProblem } from '../components/try/ScreenProblem';
import { ScreenPlatforms } from '../components/try/ScreenPlatforms';
import { ScreenFrequency } from '../components/try/ScreenFrequency';
import { ScreenPhoneCapture } from '../components/try/ScreenPhoneCapture';
import { ScreenTeamSize } from '../components/try/ScreenTeamSize';
import { ScreenIntention } from '../components/try/ScreenIntention';
import { ScreenResults } from '../components/try/ScreenResults';
import { generateCadence } from '../lib/tryEngine';
import { saveTryAssessment, getTryAssessment } from '../lib/tryAssessment';
import type {
  TryFormState,
  TryArchetypeId,
  ArchetypeScores,
  Industry,
  ProblemArea,
  Platform,
  PostingFrequency,
  TeamSize,
  ContentRole,
  GeneratedCadence,
} from '../types/try';
import { INITIAL_FORM_STATE } from '../types/try';

const TOTAL_SCREENS = 9;

export default function Try() {
  const { id: resultId } = useParams<{ id: string }>();
  const [screen, setScreen] = useState(0);
  const [formState, setFormState] = useState<TryFormState>(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);

  // If loading a saved result by ID
  useEffect(() => {
    if (resultId) {
      setLoading(true);
      getTryAssessment(resultId)
        .then((data) => {
          if (data?.generated_cadence) {
            setFormState((prev) => ({
              ...prev,
              archetype: data.archetype as TryArchetypeId,
              generatedCadence: data.generated_cadence as unknown as GeneratedCadence,
            }));
            setScreen(8); // Go straight to results
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [resultId]);

  const advance = () => setScreen((s) => Math.min(s + 1, TOTAL_SCREENS - 1));

  const handleArchetypeComplete = (data: {
    archetype: TryArchetypeId;
    scores: ArchetypeScores;
    method: 'quiz_8' | 'quiz_30' | 'picked';
    responses: Record<number, boolean> | Record<string, number>;
  }) => {
    setFormState((prev) => ({
      ...prev,
      archetype: data.archetype,
      archetypeScores: data.scores,
      archetypeMethod: data.method,
      quizResponses: data.responses as Record<number, boolean>,
    }));
    advance();
  };

  const handleIndustry = (industry: Industry) => {
    setFormState((prev) => ({ ...prev, industry }));
    advance();
  };

  const handleProblem = (problemArea: ProblemArea) => {
    setFormState((prev) => ({ ...prev, problemArea }));
    advance();
  };

  const handlePlatforms = (platforms: Platform[]) => {
    setFormState((prev) => ({ ...prev, platforms }));
    advance();
  };

  const handleFrequency = (postingFrequency: PostingFrequency) => {
    setFormState((prev) => ({ ...prev, postingFrequency }));
    advance();
  };

  const handlePhone = (phone: string) => {
    setFormState((prev) => ({ ...prev, phone }));
    advance();
  };

  const handleTeamSize = (teamSize: TeamSize) => {
    setFormState((prev) => ({ ...prev, teamSize }));
    advance();
  };

  const handleIntention = async (contentRole: ContentRole) => {
    const updatedState = { ...formState, contentRole };
    setFormState(updatedState);

    // Generate cadence
    if (
      updatedState.archetype &&
      updatedState.problemArea &&
      updatedState.platforms.length > 0 &&
      updatedState.postingFrequency &&
      updatedState.industry
    ) {
      const cadence = generateCadence({
        archetype: updatedState.archetype,
        problemArea: updatedState.problemArea,
        platforms: updatedState.platforms,
        postingFrequency: updatedState.postingFrequency,
        contentRole,
        teamSize: updatedState.teamSize || '1',
        industry: updatedState.industry,
      });

      const finalState = { ...updatedState, generatedCadence: cadence };
      setFormState(finalState);

      // Save to Supabase
      try {
        await saveTryAssessment(finalState);
      } catch (err) {
        console.error('Failed to save assessment:', err);
      }

      setScreen(8);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-16 md:py-24">
      <Container>
        <div className="max-w-xl mx-auto">
          {screen < 8 && (
            <ProgressBar currentStep={screen} totalSteps={TOTAL_SCREENS - 1} />
          )}

          <AnimatePresence mode="wait">
            {screen === 0 && (
              <ScreenArchetype
                key="archetype"
                onComplete={handleArchetypeComplete}
              />
            )}
            {screen === 1 && (
              <ScreenIndustry key="industry" onSelect={handleIndustry} />
            )}
            {screen === 2 && (
              <ScreenProblem key="problem" onSelect={handleProblem} />
            )}
            {screen === 3 && (
              <ScreenPlatforms key="platforms" onComplete={handlePlatforms} />
            )}
            {screen === 4 && (
              <ScreenFrequency key="frequency" onSelect={handleFrequency} />
            )}
            {screen === 5 && (
              <ScreenPhoneCapture key="phone" onSubmit={handlePhone} />
            )}
            {screen === 6 && (
              <ScreenTeamSize key="team" onSelect={handleTeamSize} />
            )}
            {screen === 7 && (
              <ScreenIntention key="intention" onSelect={handleIntention} />
            )}
            {screen === 8 && formState.generatedCadence && (
              <ScreenResults key="results" cadence={formState.generatedCadence} />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
