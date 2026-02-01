import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AnalysisResult, ResumeAnalysis } from "@/types/resume";
import { toast } from "sonner";

export function useResumeAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = useCallback(async (resumeText: string, jobDescription?: string) => {
    if (!resumeText.trim()) {
      toast.error("Please enter resume text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke<AnalysisResult>(
        "analyze-resume",
        {
          body: { resumeText, jobDescription },
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data?.success || !data.analysis) {
        throw new Error(data?.error || "Failed to analyze resume");
      }

      setAnalysis(data.analysis);
      toast.success("Resume analyzed successfully!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setAnalysis(null);
    setError(null);
  }, []);

  return {
    isAnalyzing,
    analysis,
    error,
    analyzeResume,
    reset,
  };
}
