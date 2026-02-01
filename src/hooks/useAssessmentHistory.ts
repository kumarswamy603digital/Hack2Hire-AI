import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface AssessmentHistoryItem {
  id: string;
  session_id: string;
  assessment_type: 'resume' | 'jd' | 'interview' | 'practice' | 'coding';
  skill_area: string | null;
  difficulty: 'easy' | 'medium' | 'hard' | null;
  score: number | null;
  time_taken_seconds: number | null;
  metadata: Record<string, any>;
  created_at: string;
}

interface Benchmark {
  id: string;
  skill_area: string;
  role_level: string;
  industry: string;
  average_score: number;
  percentile_25: number;
  percentile_50: number;
  percentile_75: number;
  sample_size: number;
}

interface HistoryStats {
  totalSessions: number;
  averageScore: number;
  totalTime: number;
  improvementRate: number;
  skillBreakdown: { skill: string; avgScore: number; count: number }[];
  recentTrend: { date: string; score: number }[];
}

export function useAssessmentHistory() {
  const { user } = useAuthContext();
  const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [stats, setStats] = useState<HistoryStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('assessment_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      // Type assertion for the data
      const typedData = (data || []) as AssessmentHistoryItem[];
      setHistory(typedData);
      calculateStats(typedData);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const fetchBenchmarks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('industry_benchmarks')
        .select('*');

      if (error) throw error;
      setBenchmarks((data || []) as Benchmark[]);
    } catch (error) {
      console.error('Error fetching benchmarks:', error);
    }
  }, []);

  const calculateStats = (data: AssessmentHistoryItem[]) => {
    if (data.length === 0) {
      setStats(null);
      return;
    }

    const withScores = data.filter(d => d.score !== null);
    const totalTime = data.reduce((sum, d) => sum + (d.time_taken_seconds || 0), 0);
    const averageScore = withScores.length > 0
      ? Math.round(withScores.reduce((sum, d) => sum + (d.score || 0), 0) / withScores.length)
      : 0;

    // Calculate improvement rate (compare last 5 vs first 5)
    const recentScores = withScores.slice(0, 5);
    const oldScores = withScores.slice(-5);
    const recentAvg = recentScores.length > 0
      ? recentScores.reduce((sum, d) => sum + (d.score || 0), 0) / recentScores.length
      : 0;
    const oldAvg = oldScores.length > 0
      ? oldScores.reduce((sum, d) => sum + (d.score || 0), 0) / oldScores.length
      : 0;
    const improvementRate = oldAvg > 0 ? Math.round(((recentAvg - oldAvg) / oldAvg) * 100) : 0;

    // Skill breakdown
    const skillMap = new Map<string, { total: number; count: number }>();
    withScores.forEach(d => {
      if (d.skill_area) {
        const existing = skillMap.get(d.skill_area) || { total: 0, count: 0 };
        skillMap.set(d.skill_area, {
          total: existing.total + (d.score || 0),
          count: existing.count + 1
        });
      }
    });
    const skillBreakdown = Array.from(skillMap.entries()).map(([skill, data]) => ({
      skill,
      avgScore: Math.round(data.total / data.count),
      count: data.count
    })).sort((a, b) => b.count - a.count);

    // Recent trend (last 10 sessions by date)
    const recentTrend = withScores.slice(0, 10).reverse().map(d => ({
      date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: d.score || 0
    }));

    setStats({
      totalSessions: data.length,
      averageScore,
      totalTime,
      improvementRate,
      skillBreakdown,
      recentTrend
    });
  };

  const recordAssessment = useCallback(async (
    assessment: Omit<AssessmentHistoryItem, 'id' | 'session_id' | 'created_at'> & { user_id?: string }
  ) => {
    if (!user) {
      console.log('User not logged in, skipping history record');
      return;
    }

    try {
      const { error } = await supabase
        .from('assessment_history')
        .insert({
          user_id: user.id,
          assessment_type: assessment.assessment_type,
          skill_area: assessment.skill_area,
          difficulty: assessment.difficulty,
          score: assessment.score,
          time_taken_seconds: assessment.time_taken_seconds,
          metadata: assessment.metadata || {}
        });

      if (error) throw error;
      
      // Refresh history after recording
      await fetchHistory();
    } catch (error) {
      console.error('Error recording assessment:', error);
    }
  }, [user, fetchHistory]);

  const getBenchmarkForSkill = useCallback((skillArea: string, roleLevel: string = 'mid') => {
    return benchmarks.find(
      b => b.skill_area.toLowerCase() === skillArea.toLowerCase() && 
           b.role_level === roleLevel
    );
  }, [benchmarks]);

  const getPercentile = useCallback((score: number, skillArea: string, roleLevel: string = 'mid') => {
    const benchmark = getBenchmarkForSkill(skillArea, roleLevel);
    if (!benchmark) return null;

    if (score >= benchmark.percentile_75) return 75;
    if (score >= benchmark.percentile_50) return 50;
    if (score >= benchmark.percentile_25) return 25;
    return 10;
  }, [getBenchmarkForSkill]);

  useEffect(() => {
    fetchHistory();
    fetchBenchmarks();
  }, [fetchHistory, fetchBenchmarks]);

  return {
    history,
    benchmarks,
    stats,
    isLoading,
    recordAssessment,
    getBenchmarkForSkill,
    getPercentile,
    refetch: fetchHistory
  };
}
