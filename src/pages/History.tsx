import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAssessmentHistory } from "@/hooks/useAssessmentHistory";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target, 
  Award,
  Calendar,
  Loader2,
  FileText,
  Code,
  MessageSquare,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const typeIcons: Record<string, typeof FileText> = {
  resume: FileText,
  jd: FileText,
  interview: MessageSquare,
  practice: Sparkles,
  coding: Code
};

const typeLabels: Record<string, string> = {
  resume: 'Resume Analysis',
  jd: 'JD Analysis',
  interview: 'Interview',
  practice: 'Practice',
  coding: 'Coding Challenge'
};

const History = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const { history, stats, benchmarks, isLoading, getBenchmarkForSkill } = useAssessmentHistory();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Progress Tracking
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Your Assessment <span className="text-gradient">History</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track your progress, compare with industry benchmarks, and identify areas for improvement.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : history.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <h2 className="font-display font-semibold text-xl text-foreground mb-2">
                No History Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Complete assessments to track your progress over time.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="hero" asChild>
                  <Link to="/practice">Start Practicing</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/interview">Take Interview</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              {stats && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="glass-card rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Sessions</span>
                    </div>
                    <div className="font-display font-bold text-3xl text-foreground">
                      {stats.totalSessions}
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Average Score</span>
                    </div>
                    <div className="font-display font-bold text-3xl text-foreground">
                      {stats.averageScore}
                      <span className="text-base font-normal text-muted-foreground">/100</span>
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Practice Time</span>
                    </div>
                    <div className="font-display font-bold text-3xl text-foreground">
                      {formatTime(stats.totalTime)}
                    </div>
                  </div>

                  <div className="glass-card rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Improvement</span>
                    </div>
                    <div className={cn(
                      "font-display font-bold text-3xl",
                      stats.improvementRate >= 0 ? "text-success" : "text-destructive"
                    )}>
                      {stats.improvementRate >= 0 ? '+' : ''}{stats.improvementRate}%
                    </div>
                  </div>
                </div>
              )}

              {/* Charts Row */}
              {stats && stats.recentTrend.length > 1 && (
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  {/* Score Trend Chart */}
                  <div className="glass-card rounded-xl p-6">
                    <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Score Trend
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats.recentTrend}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="date" className="text-muted-foreground text-xs" />
                          <YAxis domain={[0, 100]} className="text-muted-foreground text-xs" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Skill Breakdown Chart */}
                  {stats.skillBreakdown.length > 0 && (
                    <div className="glass-card rounded-xl p-6">
                      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Skills Performance
                      </h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={stats.skillBreakdown.slice(0, 6)} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis type="number" domain={[0, 100]} className="text-muted-foreground text-xs" />
                            <YAxis dataKey="skill" type="category" width={80} className="text-muted-foreground text-xs" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                            />
                            <Bar dataKey="avgScore" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Benchmark Comparison */}
              {stats && stats.skillBreakdown.length > 0 && (
                <div className="glass-card rounded-xl p-6 mb-8">
                  <h3 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Industry Benchmark Comparison
                  </h3>
                  <div className="space-y-4">
                    {stats.skillBreakdown.slice(0, 5).map(skill => {
                      const benchmark = getBenchmarkForSkill(skill.skill);
                      if (!benchmark) return null;
                      
                      const difference = skill.avgScore - benchmark.average_score;
                      const percentile = skill.avgScore >= benchmark.percentile_75 ? 'Top 25%' :
                                        skill.avgScore >= benchmark.percentile_50 ? 'Top 50%' :
                                        skill.avgScore >= benchmark.percentile_25 ? 'Top 75%' : 'Below Average';
                      
                      return (
                        <div key={skill.skill} className="bg-secondary/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground">{skill.skill}</span>
                            <div className="flex items-center gap-3">
                              <Badge variant={difference >= 0 ? "default" : "secondary"}>
                                {percentile}
                              </Badge>
                              <span className={cn(
                                "text-sm font-medium",
                                difference >= 0 ? "text-success" : "text-destructive"
                              )}>
                                {difference >= 0 ? '+' : ''}{difference} vs avg
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Your Score: {skill.avgScore}</span>
                                <span>Industry Avg: {benchmark.average_score}</span>
                              </div>
                              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="absolute h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${skill.avgScore}%` }}
                                />
                                <div 
                                  className="absolute h-full w-0.5 bg-warning"
                                  style={{ left: `${benchmark.average_score}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recent Sessions */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Recent Sessions
                </h3>
                <div className="space-y-3">
                  {history.slice(0, 10).map(item => {
                    const Icon = typeIcons[item.assessment_type] || FileText;
                    return (
                      <div 
                        key={item.id}
                        className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary/80 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">
                              {typeLabels[item.assessment_type]}
                            </span>
                            {item.skill_area && (
                              <Badge variant="outline" className="text-xs">
                                {item.skill_area}
                              </Badge>
                            )}
                            {item.difficulty && (
                              <Badge variant="secondary" className="text-xs capitalize">
                                {item.difficulty}
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(item.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {item.time_taken_seconds && (
                              <span className="ml-2">• {formatTime(item.time_taken_seconds)}</span>
                            )}
                          </div>
                        </div>
                        {item.score !== null && (
                          <div className={cn(
                            "text-lg font-bold",
                            item.score >= 70 ? "text-success" :
                            item.score >= 50 ? "text-warning" : "text-destructive"
                          )}>
                            {item.score}
                          </div>
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
