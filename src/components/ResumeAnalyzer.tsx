import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";
import { AnalysisResults } from "./AnalysisResults";
import { FileText, Loader2, RotateCcw, Sparkles, Briefcase } from "lucide-react";

const SAMPLE_RESUME = `John Smith
Senior Software Engineer

SUMMARY
Experienced full-stack developer with 6+ years building scalable web applications. 
Specialized in React, Node.js, and cloud architecture. Led teams of 5-8 engineers 
on complex enterprise projects.

EXPERIENCE

Senior Software Engineer | TechCorp Inc. (2021 - Present)
- Architected microservices platform handling 10M+ requests/day
- Led migration from monolith to AWS-based distributed system
- Mentored 4 junior developers and conducted code reviews

Software Engineer | StartupXYZ (2018 - 2021)
- Built React/TypeScript dashboard used by 50k+ users
- Implemented CI/CD pipelines reducing deployment time by 80%
- Integrated Stripe payments processing $2M+ monthly

Junior Developer | WebAgency (2017 - 2018)
- Developed responsive websites using HTML, CSS, JavaScript
- Collaborated with designers on 20+ client projects

SKILLS
JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, PostgreSQL, 
MongoDB, Redis, GraphQL, REST APIs, Agile/Scrum

EDUCATION
B.S. Computer Science, State University, 2017`;

export const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { isAnalyzing, analysis, analyzeResume, reset } = useResumeAnalysis();

  const handleAnalyze = () => {
    analyzeResume(resumeText, jobDescription || undefined);
  };

  const loadSample = () => {
    setResumeText(SAMPLE_RESUME);
  };

  const handleReset = () => {
    setResumeText("");
    setJobDescription("");
    reset();
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Analysis
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Resume <span className="text-gradient">Analyzer</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Extract skills, experience, and role relevance from candidate resumes 
            using advanced AI analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Resume Input */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-semibold text-foreground">
                    Candidate Resume
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={loadSample}>
                  Load Sample
                </Button>
              </div>
              <Textarea
                placeholder="Paste resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[300px] resize-none bg-background/50"
              />
            </div>

            {/* Job Description (Optional) */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="font-display font-semibold text-foreground">
                  Job Description
                  <span className="text-muted-foreground font-normal text-sm ml-2">
                    (Optional)
                  </span>
                </h2>
              </div>
              <Textarea
                placeholder="Paste job description to compare against..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[120px] resize-none bg-background/50"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="hero"
                size="lg"
                className="flex-1"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !resumeText.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Resume
                  </>
                )}
              </Button>
              {(resumeText || analysis) && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div>
            {analysis ? (
              <AnalysisResults analysis={analysis} />
            ) : (
              <div className="glass-card rounded-2xl p-12 h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No analysis yet</p>
                  <p className="text-sm mt-1">
                    Paste a resume and click analyze to see results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
