export interface CandidateAssessment {
  id: string;
  user_id: string;
  assessment_type: "interview" | "coding" | "practice" | "resume";
  scores: {
    overall?: number;
    technical?: number;
    behavioral?: number;
    conceptual?: number;
    coding?: number;
    communication?: number;
  };
  feedback?: string;
  duration_seconds?: number;
  completed_at: string;
  created_at: string;
}

export interface CandidateProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  company_name?: string;
}

export interface CandidateWithScores extends CandidateProfile {
  assessments: CandidateAssessment[];
  averageScore: number;
  totalAssessments: number;
  lastAssessmentDate?: string;
}

export interface HiringMetrics {
  totalCandidates: number;
  averageScore: number;
  assessmentsThisWeek: number;
  assessmentsLastWeek: number;
  topPerformers: CandidateWithScores[];
  scoreDistribution: { range: string; count: number }[];
  assessmentsByType: { type: string; count: number }[];
  weeklyTrend: { week: string; count: number; avgScore: number }[];
}

export interface ComparisonCandidate {
  profile: CandidateProfile;
  scores: {
    overall: number;
    technical: number;
    behavioral: number;
    coding: number;
  };
  strengths: string[];
  assessmentCount: number;
}
