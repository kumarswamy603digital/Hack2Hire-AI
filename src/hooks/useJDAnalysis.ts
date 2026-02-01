import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { JDAnalysisResult, JDAnalysis } from "@/types/jobDescription";
import { toast } from "sonner";

export function useJDAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<JDAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeJD = useCallback(async (jobDescription: string) => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke<JDAnalysisResult>(
        "analyze-jd",
        {
          body: { jobDescription },
        }
      );

      if (functionError) {
        throw new Error(functionError.message);
      }

      if (!data?.success || !data.analysis) {
        throw new Error(data?.error || "Failed to analyze job description");
      }

      setAnalysis(data.analysis);
      toast.success("Job description analyzed successfully!");
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
    analyzeJD,
    reset,
  };
}
