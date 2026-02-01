import { useState } from "react";
import { Header } from "@/components/Header";
import { useSkillPlan } from "@/hooks/useSkillPlan";
import { AssessmentScores } from "@/types/skillPlan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Target,
  BookOpen,
  Calendar,
  CheckCircle2,
  Lightbulb,
  Loader2,
  ArrowRight,
  Clock,
  Sparkles,
  Trophy,
  XCircle,
  Play,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "SQL", "System Design", "Data Structures", "Algorithms"
];

export default function SkillPlan() {
  const { plan, isLoading, generatePlan, clearPlan } = useSkillPlan();

  // Form state
  const [scores, setScores] = useState<AssessmentScores>({
    technical: 65,
    conceptual: 55,
    behavioral: 70,
    coding: 50,
    timeManagement: 60,
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["JavaScript", "React", "System Design"]);
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(10);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleGenerate = () => {
    generatePlan(scores, selectedSkills, currentRole, targetRole, hoursPerWeek);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive bg-destructive/10 border-destructive/30";
      case "medium":
        return "text-warning bg-warning/10 border-warning/30";
      default:
        return "text-muted-foreground bg-secondary border-border";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <GraduationCap className="w-4 h-4" />;
      case "book":
        return <BookOpen className="w-4 h-4" />;
      case "practice":
        return <Target className="w-4 h-4" />;
      case "video":
        return <Play className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  // Plan View
  if (plan) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display font-bold text-3xl text-foreground mb-2">
                Your Learning Plan
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {plan.summary}
              </p>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="font-semibold text-foreground">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {plan.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-warning" />
                  <h3 className="font-semibold text-foreground">Areas to Improve</h3>
                </div>
                <ul className="space-y-2">
                  {plan.weaknesses.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Priority Skills */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Priority Skills
              </h3>
              <div className="space-y-4">
                {plan.prioritizedSkills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Badge variant="outline" className={cn("capitalize", getPriorityColor(skill.priority))}>
                      {skill.priority}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{skill.skill}</span>
                        <span className="text-xs text-muted-foreground">
                          {skill.currentLevel} → {skill.targetLevel}
                        </span>
                      </div>
                      <Progress value={(["beginner", "intermediate", "advanced", "expert"].indexOf(skill.currentLevel) + 1) * 25} className="h-2" />
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      ~{skill.estimatedWeeks} weeks
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Learning Path */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Weekly Learning Path
              </h3>
              <div className="space-y-4">
                {plan.learningPath.map((week) => (
                  <div key={week.week} className="border-l-2 border-primary/30 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Week {week.week}</Badge>
                      <span className="font-medium text-foreground">{week.focus}</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1 mb-2">
                      {week.activities.map((activity, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-xs">
                      <Target className="w-3 h-3 text-success" />
                      <span className="text-success">Milestone: {week.milestone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="glass-card rounded-xl p-6 mb-8">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Recommended Resources
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {plan.resources.map((resource, i) => (
                  <div key={i} className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {getResourceIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground text-sm truncate">
                            {resource.name}
                          </span>
                          {resource.isFree && (
                            <Badge variant="outline" className="text-xs text-success border-success/30">
                              Free
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {resource.description}
                        </p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {resource.skill}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Practice & Success Metrics */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Daily Practice
                </h3>
                <ul className="space-y-2">
                  {plan.dailyPractice.map((practice, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {practice}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-xl p-5">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" />
                  Success Metrics
                </h3>
                <ul className="space-y-2">
                  {plan.successMetrics.map((metric, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Sparkles className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="text-center">
              <Button variant="outline" size="lg" onClick={clearPlan}>
                Create New Plan
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Input Form
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container px-4 md:px-6 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Skill Improvement
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Personalized <span className="text-gradient">Learning Plan</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Get AI-powered recommendations to improve your skills based on your assessment results.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            {/* Score Inputs */}
            <div className="mb-8">
              <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                Your Assessment Scores
              </h3>
              <div className="space-y-4">
                {Object.entries(scores).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
                      <span className={cn(
                        "font-bold",
                        value >= 70 ? "text-success" : value >= 50 ? "text-warning" : "text-destructive"
                      )}>
                        {value}
                      </span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={([v]) => setScores(prev => ({ ...prev, [key]: v }))}
                      max={100}
                      step={5}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Categories */}
            <div className="mb-8">
              <Label className="mb-4 block">Skills to Improve</Label>
              <div className="flex flex-wrap gap-2">
                {SKILL_CATEGORIES.map(skill => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                    {selectedSkills.includes(skill) && (
                      <XCircle className="w-3 h-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Role Inputs */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div>
                <Label htmlFor="current-role">Current Role</Label>
                <Input
                  id="current-role"
                  placeholder="e.g., Junior Developer"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="target-role">Target Role</Label>
                <Input
                  id="target-role"
                  placeholder="e.g., Senior Engineer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Hours per week */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <Label>Available Study Time</Label>
                <span className="text-sm text-foreground font-medium">{hoursPerWeek} hours/week</span>
              </div>
              <Slider
                value={[hoursPerWeek]}
                onValueChange={([v]) => setHoursPerWeek(v)}
                min={2}
                max={40}
                step={1}
              />
            </div>

            {/* Generate Button */}
            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Learning Plan
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
