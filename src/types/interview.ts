export interface InterviewQuestion {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  expected_time_seconds: number;
  topic: string;
  key_points: string[];
}

export interface AnswerEvaluation {
  // Core scoring dimensions
  accuracy: number;
  clarity: number;
  depth: number;
  relevance: number;
  time_efficiency: number;
  overall_score: number;
  verdict: "strong" | "average" | "weak";
  
  // Feedback
  feedback: string;
  strengths: string[];
  improvements: string[];
  penalties_applied: string[];
  
  // Interview flow
  next_difficulty: "easy" | "medium" | "hard";
  should_continue: boolean;
  termination_reason?: string;
  
  // Time tracking
  time_taken_seconds: number;
  expected_time_seconds: number;
  overtime_seconds: number;
}

export interface InterviewState {
  status: "setup" | "in_progress" | "completed" | "terminated";
  currentQuestion: InterviewQuestion | null;
  questionNumber: number;
  totalQuestions: number;
  answers: AnswerRecord[];
  currentDifficulty: "easy" | "medium" | "hard";
  skills: string[];
  jobRequirements?: string[];
}

export interface AnswerRecord {
  question: InterviewQuestion;
  answer: string;
  evaluation: AnswerEvaluation;
  timeSpent: number;
}
