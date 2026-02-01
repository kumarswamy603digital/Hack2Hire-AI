import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CandidateWithScores, HiringMetrics, CandidateAssessment } from "@/types/analytics";
import { toast } from "sonner";

export function useAnalytics() {
  const [candidates, setCandidates] = useState<CandidateWithScores[]>([]);
  const [metrics, setMetrics] = useState<HiringMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCandidatesWithScores = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch all profiles with candidate role
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // Fetch all assessments
      const { data: assessments, error: assessmentsError } = await supabase
        .from("candidate_assessments")
        .select("*")
        .order("completed_at", { ascending: false });

      if (assessmentsError) throw assessmentsError;

      // Combine profiles with their assessments
      const candidatesWithScores: CandidateWithScores[] = (profiles || []).map(profile => {
        const userAssessments = (assessments || []).filter(
          a => a.user_id === profile.user_id
        ) as CandidateAssessment[];

        const averageScore = userAssessments.length > 0
          ? userAssessments.reduce((sum, a) => {
              const scores = a.scores as Record<string, number>;
              return sum + (scores.overall || 0);
            }, 0) / userAssessments.length
          : 0;

        return {
          ...profile,
          assessments: userAssessments,
          averageScore: Math.round(averageScore),
          totalAssessments: userAssessments.length,
          lastAssessmentDate: userAssessments[0]?.completed_at,
        };
      });

      // Sort by average score
      candidatesWithScores.sort((a, b) => b.averageScore - a.averageScore);
      setCandidates(candidatesWithScores);

      // Calculate metrics
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

      const thisWeekAssessments = (assessments || []).filter(
        a => new Date(a.completed_at) >= weekAgo
      );
      const lastWeekAssessments = (assessments || []).filter(
        a => new Date(a.completed_at) >= twoWeeksAgo && new Date(a.completed_at) < weekAgo
      );

      // Score distribution
      const distribution = [
        { range: "0-20", count: 0 },
        { range: "21-40", count: 0 },
        { range: "41-60", count: 0 },
        { range: "61-80", count: 0 },
        { range: "81-100", count: 0 },
      ];

      (assessments || []).forEach(a => {
        const scores = a.scores as Record<string, number>;
        const score = scores.overall || 0;
        if (score <= 20) distribution[0].count++;
        else if (score <= 40) distribution[1].count++;
        else if (score <= 60) distribution[2].count++;
        else if (score <= 80) distribution[3].count++;
        else distribution[4].count++;
      });

      // Assessments by type
      const typeMap = new Map<string, number>();
      (assessments || []).forEach(a => {
        typeMap.set(a.assessment_type, (typeMap.get(a.assessment_type) || 0) + 1);
      });
      const assessmentsByType = Array.from(typeMap.entries()).map(([type, count]) => ({
        type,
        count,
      }));

      // Weekly trend (last 8 weeks)
      const weeklyTrend: { week: string; count: number; avgScore: number }[] = [];
      for (let i = 7; i >= 0; i--) {
        const weekStart = new Date(now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000);
        const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const weekAssessments = (assessments || []).filter(
          a => new Date(a.completed_at) >= weekStart && new Date(a.completed_at) < weekEnd
        );
        const weekLabel = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const avgScore = weekAssessments.length > 0
          ? weekAssessments.reduce((sum, a) => {
              const scores = a.scores as Record<string, number>;
              return sum + (scores.overall || 0);
            }, 0) / weekAssessments.length
          : 0;
        weeklyTrend.push({
          week: weekLabel,
          count: weekAssessments.length,
          avgScore: Math.round(avgScore),
        });
      }

      const allScores = (assessments || []).map(a => {
        const scores = a.scores as Record<string, number>;
        return scores.overall || 0;
      });
      const overallAvg = allScores.length > 0
        ? allScores.reduce((a, b) => a + b, 0) / allScores.length
        : 0;

      setMetrics({
        totalCandidates: candidatesWithScores.filter(c => c.totalAssessments > 0).length,
        averageScore: Math.round(overallAvg),
        assessmentsThisWeek: thisWeekAssessments.length,
        assessmentsLastWeek: lastWeekAssessments.length,
        topPerformers: candidatesWithScores.slice(0, 5),
        scoreDistribution: distribution,
        assessmentsByType,
        weeklyTrend,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch analytics";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidatesWithScores();
  }, [fetchCandidatesWithScores]);

  return {
    candidates,
    metrics,
    isLoading,
    refresh: fetchCandidatesWithScores,
  };
}
