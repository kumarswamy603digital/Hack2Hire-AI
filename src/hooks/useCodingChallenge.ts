import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  CodingChallenge, 
  CodingEvaluation, 
  SupportedLanguage,
} from "@/types/coding";
import { ALL_CHALLENGES, CategoryId, getChallengesByCategory } from "@/data/codingChallenges";
import { toast } from "sonner";

export interface CodingSessionState {
  status: "selecting" | "category" | "coding" | "submitting" | "reviewing";
  currentChallenge: CodingChallenge | null;
  selectedCategory: CategoryId | null;
  code: string;
  language: SupportedLanguage;
  evaluation: CodingEvaluation | null;
  startTime: number | null;
  consoleOutput: string;
}

export function useCodingChallenge() {
  const [state, setState] = useState<CodingSessionState>({
    status: "selecting",
    currentChallenge: null,
    selectedCategory: null,
    code: "",
    language: "javascript",
    evaluation: null,
    startTime: null,
    consoleOutput: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);

  const selectCategory = useCallback((categoryId: CategoryId) => {
    setState(prev => ({
      ...prev,
      status: "category",
      selectedCategory: categoryId,
    }));
  }, []);

  const selectChallenge = useCallback((challenge: CodingChallenge) => {
    setState({
      status: "coding",
      currentChallenge: challenge,
      selectedCategory: challenge.category as CategoryId,
      code: challenge.starterCode.javascript,
      language: "javascript",
      evaluation: null,
      startTime: Date.now(),
      consoleOutput: "",
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
        consoleOutput: "",
      };
    });
  }, []);

  const revealHint = useCallback((index: number) => {
    setHintsRevealed(prev => 
      prev.includes(index) ? prev : [...prev, index]
    );
  }, []);

  const runCode = useCallback(async () => {
    if (!state.code.trim()) {
      toast.error("Please write some code before running");
      return null;
    }

    setIsRunning(true);
    setState(prev => ({ ...prev, consoleOutput: "Running..." }));

    try {
      const { data, error } = await supabase.functions.invoke<{ success: boolean; output: string; error?: string }>(
        "run-code",
        {
          body: {
            code: state.code,
            language: state.language,
          },
        }
      );

      if (error || !data?.success) {
        const errorMessage = data?.error || error?.message || "Failed to run code";
        setState(prev => ({ ...prev, consoleOutput: `Error: ${errorMessage}` }));
        return null;
      }

      setState(prev => ({ ...prev, consoleOutput: data.output }));
      return data.output;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to run code";
      setState(prev => ({ ...prev, consoleOutput: `Error: ${message}` }));
      return null;
    } finally {
      setIsRunning(false);
    }
  }, [state.code, state.language]);

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
      consoleOutput: "",
    }));
    setHintsRevealed([]);
  }, [state.currentChallenge]);

  const goToSelection = useCallback(() => {
    setState({
      status: "selecting",
      currentChallenge: null,
      selectedCategory: null,
      code: "",
      language: "javascript",
      evaluation: null,
      startTime: null,
      consoleOutput: "",
    });
    setHintsRevealed([]);
  }, []);

  const goToCategory = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: "category",
      currentChallenge: null,
      code: "",
      evaluation: null,
      startTime: null,
      consoleOutput: "",
    }));
    setHintsRevealed([]);
  }, []);

  const getElapsedTime = useCallback(() => {
    if (!state.startTime) return 0;
    return Math.round((Date.now() - state.startTime) / 1000);
  }, [state.startTime]);

  const getCategoryChallenges = useCallback(() => {
    if (!state.selectedCategory) return [];
    return getChallengesByCategory(state.selectedCategory);
  }, [state.selectedCategory]);

  return {
    state,
    isLoading,
    isRunning,
    hintsRevealed,
    challenges: ALL_CHALLENGES,
    selectCategory,
    selectChallenge,
    updateCode,
    changeLanguage,
    revealHint,
    runCode,
    submitCode,
    resetChallenge,
    goToSelection,
    goToCategory,
    getElapsedTime,
    getCategoryChallenges,
  };
}
