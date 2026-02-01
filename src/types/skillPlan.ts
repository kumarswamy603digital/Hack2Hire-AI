export interface SkillPriority {
  skill: string;
  currentLevel: "beginner" | "intermediate" | "advanced";
  targetLevel: "beginner" | "intermediate" | "advanced" | "expert";
  priority: "high" | "medium" | "low";
  estimatedWeeks: number;
}

export interface LearningWeek {
  week: number;
  focus: string;
  activities: string[];
  milestone: string;
}

export interface LearningResource {
  type: "course" | "book" | "practice" | "video" | "documentation";
  name: string;
  description: string;
  skill: string;
  isFree: boolean;
}

export interface SkillImprovementPlan {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  prioritizedSkills: SkillPriority[];
  learningPath: LearningWeek[];
  resources: LearningResource[];
  dailyPractice: string[];
  successMetrics: string[];
}

export interface AssessmentScores {
  technical?: number;
  conceptual?: number;
  behavioral?: number;
  coding?: number;
  timeManagement?: number;
  overall?: number;
}
