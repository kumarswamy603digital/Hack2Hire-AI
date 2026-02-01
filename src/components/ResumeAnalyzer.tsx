import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";
import { AnalysisResults } from "./AnalysisResults";
import { PDFResumeUploader } from "./PDFResumeUploader";
import { ParsedResume } from "@/types/parsedResume";
import { FileText, Loader2, RotateCcw, Sparkles, Briefcase, Upload, Type } from "lucide-react";

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
  const [inputMode, setInputMode] = useState<"pdf" | "text">("pdf");
  const { isAnalyzing, analysis, analyzeResume, reset } = useResumeAnalysis();

  const handleAnalyze = () => {
    analyzeResume(resumeText, jobDescription || undefined);
  };

  const loadSample = () => {
    setResumeText(SAMPLE_RESUME);
    setInputMode("text");
  };

  const handleReset = () => {
    setResumeText("");
    setJobDescription("");
    reset();
  };

  const handlePDFParsed = (parsed: ParsedResume, rawText: string) => {
    // Convert parsed resume to text format for analysis
    let text = "";
    
    if (parsed.contact.name) text += `${parsed.contact.name}\n`;
    if (parsed.contact.email) text += `${parsed.contact.email}\n`;
    if (parsed.contact.phone) text += `${parsed.contact.phone}\n`;
    if (parsed.contact.location) text += `${parsed.contact.location}\n`;
    
    text += `\nSUMMARY\n${parsed.summary}\n`;
    
    text += `\nSKILLS\n`;
    text += [...parsed.skills.technical, ...parsed.skills.tools, ...parsed.skills.soft].join(", ");
    
    text += `\n\nEXPERIENCE\n`;
    parsed.experience.forEach(exp => {
      text += `${exp.title} | ${exp.company} (${exp.dates})\n`;
      exp.achievements.forEach(a => text += `- ${a}\n`);
      text += "\n";
    });
    
    text += `EDUCATION\n`;
    parsed.education.forEach(edu => {
      text += `${edu.degree}, ${edu.institution}, ${edu.dates}\n`;
    });

    setResumeText(rawText || text);
    
    // Auto-analyze after parsing
    analyzeResume(rawText || text, jobDescription || undefined);
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
            Upload a PDF or paste text to extract skills, experience, and role relevance 
            using advanced AI analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Resume Input with Tabs */}
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
                  <PDFResumeUploader onParsed={handlePDFParsed} />
                </TabsContent>

                <TabsContent value="text" className="mt-0">
                  <Textarea
                    placeholder="Paste resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[300px] resize-none bg-background/50"
                  />
                </TabsContent>
              </Tabs>
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

            {/* Actions - Only show for text mode */}
            {inputMode === "text" && (
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
            )}
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
                    Upload a PDF or paste resume text to see AI analysis
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
