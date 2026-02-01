export interface InterviewQuestion {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  expected_time_seconds: number;
  topic: string;
  key_points: string[];
}

export interface AnswerEvaluation {
  score: number;
  technical_accuracy: number;
  completeness: number;
  clarity: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  next_difficulty: "easy" | "medium" | "hard";
  should_continue: boolean;
  time_penalty: number;
  actual_time_seconds: number;
  expected_time_seconds: number;
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
