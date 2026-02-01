import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
  Briefcase,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PDFJDUploaderProps {
  onParsed?: (text: string) => void;
}

export const PDFJDUploader = ({ onParsed }: PDFJDUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedText, setParsedText] = useState<string | null>(null);
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
    setParsedText(null);

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
        text: string;
      }>("parse-jd-pdf", {
        body: { base64Content: base64, fileName: file.name },
      });

      if (error || !data?.success) {
        throw new Error(error?.message || "Failed to parse job description");
      }

      setParsedText(data.text);
      toast.success("Job description extracted successfully!");

      if (onParsed) {
        onParsed(data.text);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to parse PDF";
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
    setParsedText(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (parsedText) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{fileName}</h3>
              <p className="text-xs text-muted-foreground">Extracted successfully</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <XCircle className="w-4 h-4 mr-2" />
            Upload New
          </Button>
        </div>

        {/* Preview */}
        <div className="glass-card rounded-xl p-4 max-h-[300px] overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Extracted Content</span>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {parsedText.slice(0, 1000)}
            {parsedText.length > 1000 && "..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer",
        isDragging
          ? "border-accent bg-accent/5"
          : "border-border hover:border-accent/50 hover:bg-secondary/50",
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
          <Loader2 className="w-12 h-12 text-accent mx-auto animate-spin" />
          <div>
            <p className="font-medium text-foreground">Extracting Text...</p>
            <p className="text-sm text-muted-foreground">
              Processing {fileName}
            </p>
          </div>
          <Progress value={66} className="max-w-xs mx-auto" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-accent" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              Drop your JD PDF here
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
