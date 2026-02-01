import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  InterviewQuestion, 
  AnswerEvaluation, 
  InterviewState, 
  AnswerRecord 
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
      // Evaluate the answer
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
        
        toast.info(evalData.should_continue ? "Interview completed!" : "Interview ended early based on performance.");
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

  const calculateFinalScore = useCallback(() => {
    if (state.answers.length === 0) return 0;
    const total = state.answers.reduce((sum, a) => sum + a.evaluation.score, 0);
    return Math.round(total / state.answers.length);
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
