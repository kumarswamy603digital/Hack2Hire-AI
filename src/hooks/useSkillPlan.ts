import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SkillImprovementPlan, AssessmentScores } from "@/types/skillPlan";
import { toast } from "sonner";

export function useSkillPlan() {
  const [plan, setPlan] = useState<SkillImprovementPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePlan = useCallback(async (
    assessmentScores: AssessmentScores,
    skillCategories?: string[],
    currentRole?: string,
    targetRole?: string,
    availableHoursPerWeek?: number
  ) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke<SkillImprovementPlan & { success: boolean }>(
        "skill-plan",
        {
          body: {
            assessmentScores,
            skillCategories,
            currentRole,
            targetRole,
            availableHoursPerWeek,
          },
        }
      );

      if (error || !data?.success) {
        throw new Error(error?.message || "Failed to generate plan");
      }

      setPlan(data);
      toast.success("Your personalized learning plan is ready!");
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate plan";
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearPlan = useCallback(() => {
    setPlan(null);
  }, []);

  return {
    plan,
    isLoading,
    generatePlan,
    clearPlan,
  };
}
