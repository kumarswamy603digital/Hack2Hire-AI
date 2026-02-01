import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  CodingChallenge, 
  CodingEvaluation, 
  SupportedLanguage,
  SAMPLE_CHALLENGES 
} from "@/types/coding";
import { toast } from "sonner";

export interface CodingSessionState {
  status: "selecting" | "coding" | "submitting" | "reviewing";
  currentChallenge: CodingChallenge | null;
  code: string;
  language: SupportedLanguage;
  evaluation: CodingEvaluation | null;
  startTime: number | null;
}

export function useCodingChallenge() {
  const [state, setState] = useState<CodingSessionState>({
    status: "selecting",
    currentChallenge: null,
    code: "",
    language: "javascript",
    evaluation: null,
    startTime: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);

  const selectChallenge = useCallback((challenge: CodingChallenge) => {
    setState({
      status: "coding",
      currentChallenge: challenge,
      code: challenge.starterCode.javascript,
      language: "javascript",
      evaluation: null,
      startTime: Date.now(),
    });
    setHintsRevealed([]);
  }, []);

  const updateCode = useCallback((code: string) => {
    setState(prev => ({ ...prev, code }));
  }, []);

  const changeLanguage = useCallback((language: SupportedLanguage) => {
    setState(prev => {
      if (!prev.currentChallenge) return prev;
      return {
        ...prev,
        language,
        code: prev.currentChallenge.starterCode[language],
      };
    });
  }, []);

  const revealHint = useCallback((index: number) => {
    setHintsRevealed(prev => 
      prev.includes(index) ? prev : [...prev, index]
    );
  }, []);

  const submitCode = useCallback(async () => {
    if (!state.currentChallenge || !state.code.trim()) {
      toast.error("Please write some code before submitting");
      return null;
    }

    setIsLoading(true);
    setState(prev => ({ ...prev, status: "submitting" }));

    const timeSpentSeconds = state.startTime 
      ? Math.round((Date.now() - state.startTime) / 1000)
      : 0;

    try {
      const { data, error } = await supabase.functions.invoke<CodingEvaluation & { success: boolean }>(
        "evaluate-code",
        {
          body: {
            code: state.code,
            language: state.language,
            challengeTitle: state.currentChallenge.title,
            challengeDescription: state.currentChallenge.description,
            testCases: state.currentChallenge.testCases.map(tc => ({
              id: tc.id,
              input: tc.input,
              expectedOutput: tc.expectedOutput,
            })),
            timeSpentSeconds,
            expectedTimeMinutes: state.currentChallenge.expectedTimeMinutes,
          },
        }
      );

      if (error || !data?.success) {
        throw new Error(error?.message || "Failed to evaluate code");
      }

      setState(prev => ({
        ...prev,
        status: "reviewing",
        evaluation: data,
      }));

      if (data.score >= 80) {
        toast.success(`Excellent! Score: ${data.score}/100`);
      } else if (data.score >= 60) {
        toast.success(`Good job! Score: ${data.score}/100`);
      } else {
        toast.info(`Score: ${data.score}/100 - Keep practicing!`);
      }

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit code";
      toast.error(message);
      setState(prev => ({ ...prev, status: "coding" }));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [state]);

  const resetChallenge = useCallback(() => {
    if (!state.currentChallenge) return;
    setState(prev => ({
      ...prev,
      status: "coding",
      code: prev.currentChallenge!.starterCode[prev.language],
      evaluation: null,
      startTime: Date.now(),
    }));
    setHintsRevealed([]);
  }, [state.currentChallenge]);

  const goToSelection = useCallback(() => {
    setState({
      status: "selecting",
      currentChallenge: null,
      code: "",
      language: "javascript",
      evaluation: null,
      startTime: null,
    });
    setHintsRevealed([]);
  }, []);

  const getElapsedTime = useCallback(() => {
    if (!state.startTime) return 0;
    return Math.round((Date.now() - state.startTime) / 1000);
  }, [state.startTime]);

  return {
    state,
    isLoading,
    hintsRevealed,
    challenges: SAMPLE_CHALLENGES,
    selectChallenge,
    updateCode,
    changeLanguage,
    revealHint,
    submitCode,
    resetChallenge,
    goToSelection,
    getElapsedTime,
  };
}
