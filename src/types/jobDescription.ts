export interface SkillItem {
  skill: string;
  category: "technical" | "conceptual" | "behavioral";
}

export interface JDAnalysis {
  must_have: SkillItem[];
  nice_to_have: SkillItem[];
  role_level: "junior" | "mid" | "senior";
  summary: string;
}

export interface JDAnalysisResult {
  success: boolean;
  analysis?: JDAnalysis;
  error?: string;
}
