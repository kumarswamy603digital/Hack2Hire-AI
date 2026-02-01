import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ParsedResume } from "@/types/parsedResume";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Sparkles,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PDFResumeUploaderProps {
  onParsed?: (resume: ParsedResume, rawText: string) => void;
}

export const PDFResumeUploader = ({ onParsed }: PDFResumeUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setFileName(file.name);
    setIsLoading(true);
    setParsedResume(null);

    try {
      // Convert to base64
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const { data, error } = await supabase.functions.invoke<{
        success: boolean;
        parsed: ParsedResume;
      }>("parse-resume-pdf", {
        body: { base64Content: base64, fileName: file.name },
      });

      if (error || !data?.success) {
        throw new Error(error?.message || "Failed to parse resume");
      }

      setParsedResume(data.parsed);
      toast.success("Resume parsed successfully!");

      if (onParsed) {
        onParsed(data.parsed, data.parsed.rawText || "");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to parse resume";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleClick = () => fileInputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setParsedResume(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (parsedResume) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{fileName}</h3>
              <p className="text-sm text-muted-foreground">Parsed successfully</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <XCircle className="w-4 h-4 mr-2" />
            Upload New
          </Button>
        </div>

        {/* Contact Info */}
        <div className="glass-card rounded-xl p-5">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Contact Information
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {parsedResume.contact.name && (
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{parsedResume.contact.name}</span>
              </div>
            )}
            {parsedResume.contact.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{parsedResume.contact.email}</span>
              </div>
            )}
            {parsedResume.contact.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{parsedResume.contact.phone}</span>
              </div>
            )}
            {parsedResume.contact.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{parsedResume.contact.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {parsedResume.summary && (
          <div className="glass-card rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Professional Summary
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {parsedResume.summary}
            </p>
          </div>
        )}

        {/* Skills */}
        <div className="glass-card rounded-xl p-5">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            Skills
          </h4>
          <div className="space-y-3">
            {parsedResume.skills.technical.length > 0 && (
              <div>
                <span className="text-xs text-muted-foreground">Technical</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {parsedResume.skills.technical.map((skill, i) => (
                    <Badge key={i} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            {parsedResume.skills.tools.length > 0 && (
              <div>
                <span className="text-xs text-muted-foreground">Tools & Frameworks</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {parsedResume.skills.tools.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
            {parsedResume.skills.soft.length > 0 && (
              <div>
                <span className="text-xs text-muted-foreground">Soft Skills</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {parsedResume.skills.soft.map((skill, i) => (
                    <Badge key={i} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Experience */}
        {parsedResume.experience.length > 0 && (
          <div className="glass-card rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              Work Experience
            </h4>
            <div className="space-y-4">
              {parsedResume.experience.map((exp, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-4">
                  <div className="font-medium text-foreground">{exp.title}</div>
                  <div className="text-sm text-primary">{exp.company}</div>
                  <div className="text-xs text-muted-foreground mb-2">{exp.dates}</div>
                  {exp.achievements.length > 0 && (
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {exp.achievements.slice(0, 3).map((a, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {parsedResume.education.length > 0 && (
          <div className="glass-card rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              Education
            </h4>
            <div className="space-y-3">
              {parsedResume.education.map((edu, i) => (
                <div key={i}>
                  <div className="font-medium text-foreground">{edu.degree}</div>
                  <div className="text-sm text-primary">{edu.institution}</div>
                  <div className="text-xs text-muted-foreground">
                    {edu.dates} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {parsedResume.certifications.length > 0 && (
          <div className="glass-card rounded-xl p-5">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Certifications
            </h4>
            <div className="flex flex-wrap gap-2">
              {parsedResume.certifications.map((cert, i) => (
                <Badge key={i} variant="outline" className="text-warning border-warning/30">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-secondary/50",
        isLoading && "pointer-events-none opacity-60"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleInputChange}
      />

      {isLoading ? (
        <div className="space-y-4">
          <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
          <div>
            <p className="font-medium text-foreground">Parsing Resume...</p>
            <p className="text-sm text-muted-foreground">
              AI is extracting information from {fileName}
            </p>
          </div>
          <Progress value={66} className="max-w-xs mx-auto" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              Drop your PDF resume here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse • Max 10MB
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Select PDF
          </Button>
        </div>
      )}
    </div>
  );
};
