export interface ResumeAnalysis {
  skills: string[];
  tools_technologies: string[];
  experience_years: number;
  project_complexity: "low" | "medium" | "high";
  role_relevance: number;
  summary: string;
}

export interface AnalysisResult {
  success: boolean;
  analysis?: ResumeAnalysis;
  error?: string;
}
