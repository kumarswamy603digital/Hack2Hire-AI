import { Header } from "@/components/Header";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  Target,
  Trophy,
  Clock,
  Loader2,
  ArrowUpRight,
  Calendar,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const COLORS = ["hsl(var(--destructive))", "hsl(var(--warning))", "hsl(var(--muted))", "hsl(var(--primary))", "hsl(var(--success))"];
const TYPE_COLORS: Record<string, string> = {
  interview: "hsl(var(--primary))",
  coding: "hsl(var(--success))",
  practice: "hsl(var(--warning))",
  resume: "hsl(var(--muted-foreground))",
};

export default function Analytics() {
  const { metrics, candidates, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12 text-center">
          <p className="text-muted-foreground">No analytics data available.</p>
        </main>
      </div>
    );
  }

  const weeklyChange = metrics.assessmentsThisWeek - metrics.assessmentsLastWeek;
  const weeklyChangePercent = metrics.assessmentsLastWeek > 0 
    ? Math.round((weeklyChange / metrics.assessmentsLastWeek) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" />
              Analytics Dashboard
            </div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-2">
              Hiring <span className="text-gradient">Analytics</span>
            </h1>
            <p className="text-muted-foreground">
              Track performance metrics and candidate insights
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="text-xs">Total</Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {metrics.totalCandidates}
              </div>
              <p className="text-sm text-muted-foreground">Active Candidates</p>
            </div>

            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-5 h-5 text-success" />
                <Badge variant="secondary" className="text-xs">Avg</Badge>
              </div>
              <div className={cn(
                "text-3xl font-bold mb-1",
                metrics.averageScore >= 70 ? "text-success" : 
                  metrics.averageScore >= 50 ? "text-warning" : "text-destructive"
              )}>
                {metrics.averageScore}
              </div>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>

            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                {weeklyChange !== 0 && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      weeklyChange > 0 ? "text-success border-success/30" : "text-destructive border-destructive/30"
                    )}
                  >
                    {weeklyChange > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(weeklyChangePercent)}%
                  </Badge>
                )}
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {metrics.assessmentsThisWeek}
              </div>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>

            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-5 h-5 text-warning" />
                <Badge variant="secondary" className="text-xs">All Time</Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {candidates.reduce((sum, c) => sum + c.totalAssessments, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Assessments</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Trend */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weekly Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                      name="Assessments"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avgScore" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--success))" }}
                      name="Avg Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Score Distribution */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Score Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.scoreDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="range" 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="count" name="Candidates" radius={[4, 4, 0, 0]}>
                      {metrics.scoreDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Assessments by Type */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                By Assessment Type
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={metrics.assessmentsByType}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={({ type }) => type}
                    >
                      {metrics.assessmentsByType.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={TYPE_COLORS[entry.type] || "hsl(var(--muted))"}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Performers */}
            <div className="glass-card rounded-2xl p-6 lg:col-span-2">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Top Performers
              </h3>
              <div className="space-y-3">
                {metrics.topPerformers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No candidates yet</p>
                ) : (
                  metrics.topPerformers.map((candidate, index) => (
                    <div 
                      key={candidate.id}
                      className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50"
                    >
                      <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        index === 0 ? "bg-warning/20 text-warning" :
                          index === 1 ? "bg-secondary text-foreground" :
                            index === 2 ? "bg-warning/30 text-warning" :
                              "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {candidate.full_name || candidate.email.split("@")[0]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {candidate.totalAssessments} assessments
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          "text-xl font-bold",
                          candidate.averageScore >= 80 ? "text-success" :
                            candidate.averageScore >= 60 ? "text-warning" : "text-destructive"
                        )}>
                          {candidate.averageScore}
                        </div>
                        <Progress value={candidate.averageScore} className="h-1 w-20" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
