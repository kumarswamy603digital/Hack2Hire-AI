import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  InterviewQuestion, 
  AnswerEvaluation, 
  InterviewState, 
  AnswerRecord,
  FinalScoreBreakdown,
  QuestionCategory
} from "@/types/interview";
import { toast } from "sonner";

const MAX_QUESTIONS = 6;

export function useInterview() {
  const [state, setState] = useState<InterviewState>({
    status: "setup",
    currentQuestion: null,
    questionNumber: 0,
    totalQuestions: MAX_QUESTIONS,
    answers: [],
    currentDifficulty: "easy",
    skills: [],
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const previousQuestions = useRef<string[]>([]);

  const startInterview = useCallback(async (skills: string[], jobRequirements?: string[]) => {
    setIsLoading(true);
    previousQuestions.current = [];
    
    try {
      const { data, error } = await supabase.functions.invoke<InterviewQuestion & { success: boolean }>(
        "generate-question",
        {
          body: { 
            skills, 
            jobRequirements,
            difficulty: "easy",
            previousQuestions: []
          },
        }
      );

      if (error || !data?.success) {
        throw new Error(error?.message || "Failed to generate question");
      }

      previousQuestions.current.push(data.question);

      setState({
        status: "in_progress",
        currentQuestion: data,
        questionNumber: 1,
        totalQuestions: MAX_QUESTIONS,
        answers: [],
        currentDifficulty: "easy",
        skills,
        jobRequirements,
      });

      toast.success("Interview started! Good luck!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to start interview";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitAnswer = useCallback(async (answer: string, timeSpent: number) => {
    if (!state.currentQuestion) return null;

    setIsLoading(true);

    try {
      // Get last scores for average calculation
      const lastScores = state.answers.slice(-2).map(a => a.evaluation.overall_score);

      // Evaluate the answer with last scores for early termination check
      const { data: evalData, error: evalError } = await supabase.functions.invoke<AnswerEvaluation & { success: boolean }>(
        "evaluate-answer",
        {
          body: {
            question: state.currentQuestion.question,
            answer,
            keyPoints: state.currentQuestion.key_points,
            expectedTimeSeconds: state.currentQuestion.expected_time_seconds,
            actualTimeSeconds: timeSpent,
            difficulty: state.currentQuestion.difficulty,
            lastScores,
          },
        }
      );

      if (evalError || !evalData?.success) {
        throw new Error(evalError?.message || "Failed to evaluate answer");
      }

      const answerRecord: AnswerRecord = {
        question: state.currentQuestion,
        answer,
        evaluation: evalData,
        timeSpent,
      };

      const newAnswers = [...state.answers, answerRecord];
      const nextQuestionNumber = state.questionNumber + 1;

      // Check if interview should end
      if (!evalData.should_continue || nextQuestionNumber > MAX_QUESTIONS) {
        setState(prev => ({
          ...prev,
          status: evalData.should_continue ? "completed" : "terminated",
          currentQuestion: null,
          answers: newAnswers,
        }));
        
        const message = !evalData.should_continue && evalData.termination_reason
          ? `Interview ended: ${evalData.termination_reason}`
          : evalData.should_continue 
            ? "Interview completed!" 
            : "Interview ended early based on performance.";
        
        toast.info(message);
        return evalData;
      }

      // Generate next question
      const { data: questionData, error: questionError } = await supabase.functions.invoke<InterviewQuestion & { success: boolean }>(
        "generate-question",
        {
          body: {
            skills: state.skills,
            jobRequirements: state.jobRequirements,
            difficulty: evalData.next_difficulty,
            previousQuestions: previousQuestions.current,
          },
        }
      );

      if (questionError || !questionData?.success) {
        throw new Error(questionError?.message || "Failed to generate next question");
      }

      previousQuestions.current.push(questionData.question);

      setState(prev => ({
        ...prev,
        currentQuestion: questionData,
        questionNumber: nextQuestionNumber,
        currentDifficulty: evalData.next_difficulty,
        answers: newAnswers,
      }));

      return evalData;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to process answer";
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [state]);

  const resetInterview = useCallback(() => {
    previousQuestions.current = [];
    setState({
      status: "setup",
      currentQuestion: null,
      questionNumber: 0,
      totalQuestions: MAX_QUESTIONS,
      answers: [],
      currentDifficulty: "easy",
      skills: [],
    });
  }, []);

  const calculateFinalScore = useCallback((): FinalScoreBreakdown => {
    if (state.answers.length === 0) {
      return { technical: 0, conceptual: 0, behavioral: 0, timeManagement: 0, adaptability: 0, weighted: 0 };
    }

    // Group scores by category
    const categoryScores: Record<QuestionCategory, number[]> = {
      technical: [],
      conceptual: [],
      behavioral: [],
    };

    let totalTimeEfficiency = 0;
    const difficultyProgression: string[] = [];

    state.answers.forEach((a) => {
      const category = a.question.category || "technical"; // fallback for old data
      categoryScores[category].push(a.evaluation.overall_score);
      totalTimeEfficiency += a.evaluation.time_efficiency;
      difficultyProgression.push(a.question.difficulty);
    });

    // Calculate average for each category (0 if no questions in category)
    const technical = categoryScores.technical.length > 0 
      ? categoryScores.technical.reduce((a, b) => a + b, 0) / categoryScores.technical.length 
      : 0;
    const conceptual = categoryScores.conceptual.length > 0 
      ? categoryScores.conceptual.reduce((a, b) => a + b, 0) / categoryScores.conceptual.length 
      : 0;
    const behavioral = categoryScores.behavioral.length > 0 
      ? categoryScores.behavioral.reduce((a, b) => a + b, 0) / categoryScores.behavioral.length 
      : 0;

    // Time Management = average time_efficiency across all answers
    const timeManagement = totalTimeEfficiency / state.answers.length;

    // Adaptability = how well they handled difficulty changes
    // Score based on reaching higher difficulties and maintaining performance
    let adaptability = 50; // base score
    const maxDifficulty = difficultyProgression.includes("hard") ? 100 : difficultyProgression.includes("medium") ? 70 : 40;
    const avgScore = state.answers.reduce((sum, a) => sum + a.evaluation.overall_score, 0) / state.answers.length;
    adaptability = (maxDifficulty * 0.5) + (avgScore * 0.5);

    // Weighted final score
    const weighted = Math.round(
      (technical * 0.35) +
      (conceptual * 0.25) +
      (behavioral * 0.20) +
      (timeManagement * 0.10) +
      (adaptability * 0.10)
    );

    return {
      technical: Math.round(technical),
      conceptual: Math.round(conceptual),
      behavioral: Math.round(behavioral),
      timeManagement: Math.round(timeManagement),
      adaptability: Math.round(adaptability),
      weighted,
    };
  }, [state.answers]);

  return {
    state,
    isLoading,
    startInterview,
    submitAnswer,
    resetInterview,
    calculateFinalScore,
  };
}
