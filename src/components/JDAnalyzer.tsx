import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useJDAnalysis } from "@/hooks/useJDAnalysis";
import { JDAnalysisResults } from "./JDAnalysisResults";
import { PDFJDUploader } from "./PDFJDUploader";
import { FileText, Loader2, RotateCcw, Sparkles, Briefcase, Upload, Type } from "lucide-react";

const SAMPLE_JD = `Senior Full-Stack Engineer

About the Role:
We're looking for a Senior Full-Stack Engineer to join our growing engineering team. 
You'll be responsible for designing, building, and maintaining our core product 
infrastructure serving millions of users.

Requirements:
- 5+ years of experience in software development
- Strong proficiency in React, TypeScript, and Node.js
- Experience with cloud platforms (AWS, GCP, or Azure)
- Solid understanding of database design (PostgreSQL, MongoDB)
- Experience with CI/CD pipelines and DevOps practices
- Strong problem-solving and communication skills
- Experience leading technical projects and mentoring junior developers

Nice to Have:
- Experience with GraphQL
- Knowledge of containerization (Docker, Kubernetes)
- Previous startup experience
- Open source contributions
- Experience with machine learning or AI integrations

What We Offer:
- Competitive salary and equity
- Remote-first culture
- Learning and development budget
- Health and wellness benefits`;

export const JDAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [inputMode, setInputMode] = useState<"pdf" | "text">("pdf");
  const { isAnalyzing, analysis, analyzeJD, reset } = useJDAnalysis();

  const handleAnalyze = () => {
    analyzeJD(jobDescription);
  };

  const loadSample = () => {
    setJobDescription(SAMPLE_JD);
    setInputMode("text");
  };

  const handleReset = () => {
    setJobDescription("");
    reset();
  };

  const handlePDFParsed = (text: string) => {
    setJobDescription(text);
    // Auto-analyze after parsing
    analyzeJD(text);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            Job Description Analysis
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            JD <span className="text-gradient">Analyzer</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload a PDF or paste text to extract must-have skills, nice-to-have skills, 
            and role level using AI analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  <h2 className="font-display font-semibold text-foreground">
                    Job Description
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={loadSample}>
                  Load Sample
                </Button>
              </div>

              <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as "pdf" | "text")}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="pdf" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload PDF
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Paste Text
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pdf" className="mt-0">
                  <PDFJDUploader onParsed={handlePDFParsed} />
                </TabsContent>

                <TabsContent value="text" className="mt-0">
                  <Textarea
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[300px] resize-none bg-background/50"
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Actions - Only show for text mode */}
            {inputMode === "text" && (
              <div className="flex gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !jobDescription.trim()}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze JD
                    </>
                  )}
                </Button>
                {(jobDescription || analysis) && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Results Section */}
          <div>
            {analysis ? (
              <JDAnalysisResults analysis={analysis} />
            ) : (
              <div className="glass-card rounded-2xl p-12 h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-medium">No analysis yet</p>
                  <p className="text-sm mt-1">
                    Upload a PDF or paste job description to see AI analysis
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
