import { useState } from "react";
import { Header } from "@/components/Header";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CandidateWithScores } from "@/types/analytics";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Trophy,
  Target,
  Code2,
  MessageSquare,
  XCircle,
  Loader2,
  ArrowUpDown,
  Star,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function CandidateComparison() {
  const { candidates, isLoading } = useAnalytics();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "name" | "assessments">("score");

  const toggleCandidate = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 4) {
        next.add(id);
      }
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const filteredCandidates = candidates
    .filter(c => c.totalAssessments > 0)
    .filter(c => 
      c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "score") return b.averageScore - a.averageScore;
      if (sortBy === "name") return (a.full_name || "").localeCompare(b.full_name || "");
      return b.totalAssessments - a.totalAssessments;
    });

  const selectedCandidates = candidates.filter(c => selectedIds.has(c.id));

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getAverageScoreForType = (candidate: CandidateWithScores, type: string) => {
    const typeAssessments = candidate.assessments.filter(a => a.assessment_type === type);
    if (typeAssessments.length === 0) return null;
    const avg = typeAssessments.reduce((sum, a) => {
      const scores = a.scores as Record<string, number>;
      return sum + (scores.overall || 0);
    }, 0) / typeAssessments.length;
    return Math.round(avg);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Candidate Comparison
              </div>
              <h1 className="font-display font-bold text-3xl text-foreground mb-2">
                Compare <span className="text-gradient">Candidates</span>
              </h1>
              <p className="text-muted-foreground">
                Select up to 4 candidates to compare side-by-side
              </p>
            </div>

            {selectedIds.size > 0 && (
              <Button variant="outline" onClick={clearSelection}>
                <XCircle className="w-4 h-4 mr-2" />
                Clear ({selectedIds.size})
              </Button>
            )}
          </div>

          {/* Comparison View */}
          {selectedCandidates.length >= 2 && (
            <div className="glass-card rounded-2xl p-6 mb-8 overflow-x-auto">
              <h2 className="font-display font-semibold text-lg text-foreground mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Side-by-Side Comparison
              </h2>
              
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedCandidates.length}, minmax(200px, 1fr))` }}>
                {/* Names */}
                {selectedCandidates.map((candidate, i) => (
                  <div key={candidate.id} className="text-center pb-4 border-b border-border">
                    <div className={cn(
                      "w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold",
                      i === 0 ? "bg-primary/20 text-primary" : "bg-secondary text-foreground"
                    )}>
                      {(candidate.full_name || candidate.email)[0].toUpperCase()}
                    </div>
                    <h3 className="font-semibold text-foreground truncate">
                      {candidate.full_name || candidate.email.split("@")[0]}
                    </h3>
                    {i === 0 && (
                      <Badge className="mt-1 bg-primary/20 text-primary border-primary/30">
                        <Star className="w-3 h-3 mr-1" /> Top Scorer
                      </Badge>
                    )}
                  </div>
                ))}

                {/* Overall Score */}
                <div className="col-span-full text-sm font-medium text-muted-foreground mt-4 mb-2">Overall Score</div>
                {selectedCandidates.map(candidate => (
                  <div key={`score-${candidate.id}`} className="text-center">
                    <span className={cn("text-3xl font-bold", getScoreColor(candidate.averageScore))}>
                      {candidate.averageScore}
                    </span>
                    <span className="text-muted-foreground">/100</span>
                    <Progress value={candidate.averageScore} className="h-2 mt-2" />
                  </div>
                ))}

                {/* Interview Score */}
                <div className="col-span-full text-sm font-medium text-muted-foreground mt-4 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Interview
                </div>
                {selectedCandidates.map(candidate => {
                  const score = getAverageScoreForType(candidate, "interview");
                  return (
                    <div key={`interview-${candidate.id}`} className="text-center">
                      {score !== null ? (
                        <>
                          <span className={cn("text-2xl font-bold", getScoreColor(score))}>{score}</span>
                          <Progress value={score} className="h-1.5 mt-2" />
                        </>
                      ) : (
                        <span className="text-muted-foreground text-sm">No data</span>
                      )}
                    </div>
                  );
                })}

                {/* Coding Score */}
                <div className="col-span-full text-sm font-medium text-muted-foreground mt-4 mb-2 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Coding
                </div>
                {selectedCandidates.map(candidate => {
                  const score = getAverageScoreForType(candidate, "coding");
                  return (
                    <div key={`coding-${candidate.id}`} className="text-center">
                      {score !== null ? (
                        <>
                          <span className={cn("text-2xl font-bold", getScoreColor(score))}>{score}</span>
                          <Progress value={score} className="h-1.5 mt-2" />
                        </>
                      ) : (
                        <span className="text-muted-foreground text-sm">No data</span>
                      )}
                    </div>
                  );
                })}

                {/* Assessments Count */}
                <div className="col-span-full text-sm font-medium text-muted-foreground mt-4 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Total Assessments
                </div>
                {selectedCandidates.map(candidate => (
                  <div key={`count-${candidate.id}`} className="text-center">
                    <span className="text-2xl font-bold text-foreground">{candidate.totalAssessments}</span>
                  </div>
                ))}

                {/* Last Activity */}
                <div className="col-span-full text-sm font-medium text-muted-foreground mt-4 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Last Activity
                </div>
                {selectedCandidates.map(candidate => (
                  <div key={`date-${candidate.id}`} className="text-center text-sm text-muted-foreground">
                    {candidate.lastAssessmentDate 
                      ? format(new Date(candidate.lastAssessmentDate), "MMM d, yyyy")
                      : "N/A"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidate List */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-lg text-foreground">
                All Candidates ({filteredCandidates.length})
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortBy(sortBy === "score" ? "name" : sortBy === "name" ? "assessments" : "score")}
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort by {sortBy}
                </Button>
              </div>
            </div>

            {filteredCandidates.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No candidates with completed assessments found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCandidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer",
                      selectedIds.has(candidate.id) 
                        ? "bg-primary/10 border-2 border-primary/30"
                        : "bg-secondary/50 hover:bg-secondary border-2 border-transparent"
                    )}
                    onClick={() => toggleCandidate(candidate.id)}
                  >
                    <Checkbox
                      checked={selectedIds.has(candidate.id)}
                      disabled={!selectedIds.has(candidate.id) && selectedIds.size >= 4}
                    />
                    
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {candidate.full_name || candidate.email.split("@")[0]}
                        </span>
                        {index === 0 && (
                          <Badge variant="outline" className="text-xs text-primary border-primary/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Top Performer
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{candidate.email}</p>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={cn("text-xl font-bold", getScoreColor(candidate.averageScore))}>
                          {candidate.averageScore}
                        </div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xl font-bold text-foreground">
                          {candidate.totalAssessments}
                        </div>
                        <div className="text-xs text-muted-foreground">Tests</div>
                      </div>

                      <div className="text-right text-sm text-muted-foreground w-24">
                        {candidate.lastAssessmentDate 
                          ? format(new Date(candidate.lastAssessmentDate), "MMM d")
                          : "—"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
