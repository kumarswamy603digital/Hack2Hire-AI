import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { InterviewQuestion, QuestionCategory } from "@/types/interview";
import { toast } from "sonner";

export interface PracticeEvaluation {
  score: number;
  strengths: string[];
  improvements: string[];
  model_answer: string;
  coaching_tips: string[];
  next_topic_suggestion: string;
}

export interface PracticeRecord {
  question: InterviewQuestion;
  userAnswer: string;
  evaluation: PracticeEvaluation;
  timeSpent: number;
}

export interface PracticeState {
  status: "setup" | "practicing" | "reviewing";
  currentQuestion: InterviewQuestion | null;
  selectedSkill: string;
  selectedDifficulty: "easy" | "medium" | "hard";
  selectedCategory: QuestionCategory;
  history: PracticeRecord[];
  currentEvaluation: PracticeEvaluation | null;
}

export function usePractice() {
  const [state, setState] = useState<PracticeState>({
    status: "setup",
    currentQuestion: null,
    selectedSkill: "",
    selectedDifficulty: "easy",
    selectedCategory: "technical",
    history: [],
    currentEvaluation: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const previousQuestions = useRef<string[]>([]);

  const generateQuestion = useCallback(async (
    skill: string,
    difficulty: "easy" | "medium" | "hard",
    category: QuestionCategory
  ) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke<InterviewQuestion & { success: boolean }>(
        "generate-question",
        {
          body: {
            skills: [skill],
            difficulty,
            previousQuestions: previousQuestions.current,
            // Hint to generate specific category
            topic: `${category} question about ${skill}`,
          },
        }
      );

      if (error || !data?.success) {
        throw new Error(error?.message || "Failed to generate question");
      }

      previousQuestions.current.push(data.question);

      setState(prev => ({
        ...prev,
        status: "practicing",
        currentQuestion: { ...data, category },
        selectedSkill: skill,
        selectedDifficulty: difficulty,
        selectedCategory: category,
        currentEvaluation: null,
      }));

      toast.success("New practice question ready!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate question";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitPracticeAnswer = useCallback(async (answer: string, timeSpent: number) => {
    if (!state.currentQuestion) return null;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke<PracticeEvaluation & { success: boolean }>(
        "practice-evaluate",
        {
          body: {
            question: state.currentQuestion.question,
            answer,
            keyPoints: state.currentQuestion.key_points,
            topic: state.currentQuestion.topic,
            difficulty: state.currentQuestion.difficulty,
            timeSpent,
            expectedTime: state.currentQuestion.expected_time_seconds,
          },
        }
      );

      if (error || !data?.success) {
        throw new Error(error?.message || "Failed to evaluate answer");
      }

      const record: PracticeRecord = {
        question: state.currentQuestion,
        userAnswer: answer,
        evaluation: data,
        timeSpent,
      };

      setState(prev => ({
        ...prev,
        status: "reviewing",
        history: [...prev.history, record],
        currentEvaluation: data,
      }));

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to evaluate answer";
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [state.currentQuestion]);

  const practiceAgain = useCallback(() => {
    setState(prev => ({
      ...prev,
      status: "setup",
      currentQuestion: null,
      currentEvaluation: null,
    }));
  }, []);

  const tryAnotherQuestion = useCallback(() => {
    generateQuestion(
      state.selectedSkill,
      state.selectedDifficulty,
      state.selectedCategory
    );
  }, [generateQuestion, state.selectedSkill, state.selectedDifficulty, state.selectedCategory]);

  const resetPractice = useCallback(() => {
    previousQuestions.current = [];
    setState({
      status: "setup",
      currentQuestion: null,
      selectedSkill: "",
      selectedDifficulty: "easy",
      selectedCategory: "technical",
      history: [],
      currentEvaluation: null,
    });
  }, []);

  const getAverageScore = useCallback(() => {
    if (state.history.length === 0) return 0;
    const total = state.history.reduce((sum, r) => sum + r.evaluation.score, 0);
    return Math.round(total / state.history.length);
  }, [state.history]);

  return {
    state,
    isLoading,
    generateQuestion,
    submitPracticeAnswer,
    practiceAgain,
    tryAnotherQuestion,
    resetPractice,
    getAverageScore,
  };
}
