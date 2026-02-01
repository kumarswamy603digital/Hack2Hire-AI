import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProctoring } from "@/hooks/useProctoring";
import { 
  Camera, 
  CameraOff, 
  Eye, 
  AlertTriangle,
  CheckCircle2,
  Shield,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProctoringOverlayProps {
  enabled: boolean;
  onReady?: () => void;
  minimal?: boolean;
}

export const ProctoringOverlay = ({ 
  enabled, 
  onReady,
  minimal = false 
}: ProctoringOverlayProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const {
    state,
    startCamera,
    stopCamera,
    startProctoring,
    stopProctoring,
  } = useProctoring();

  useEffect(() => {
    if (enabled && videoRef.current && canvasRef.current) {
      startCamera(videoRef.current, canvasRef.current)
        .then((success) => {
          if (success) {
            startProctoring();
            onReady?.();
          } else {
            setCameraError("Failed to access camera");
            toast.error("Camera access denied. Proctoring disabled.");
          }
        });
    }

    return () => {
      if (enabled) {
        stopProctoring();
        stopCamera();
      }
    };
  }, [enabled, startCamera, stopCamera, startProctoring, stopProctoring, onReady]);

  if (!enabled) return null;

  const { analysis, tabSwitches, copyAttempts, overallScore } = state;

  if (minimal) {
    return (
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {/* Mini Camera Feed */}
        <div className="relative w-32 h-24 rounded-lg overflow-hidden border-2 border-border shadow-lg bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Status Indicator */}
          <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
            {state.isCameraReady ? (
              <Badge variant="default" className="text-[10px] py-0 px-1 gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Live
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-[10px] py-0 px-1">
                Off
              </Badge>
            )}
            
            {analysis && !analysis.faceVisible && (
              <Badge variant="destructive" className="text-[10px] py-0 px-1">
                No Face
              </Badge>
            )}
          </div>
        </div>

        {/* Warnings */}
        {tabSwitches > 0 && (
          <Badge variant="destructive" className="text-xs w-full justify-center">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {tabSwitches} tab switch{tabSwitches > 1 ? 'es' : ''}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-start gap-4">
        {/* Camera Feed */}
        <div className="relative w-48 h-36 rounded-lg overflow-hidden border border-border bg-black shrink-0">
          {cameraError ? (
            <div className="w-full h-full flex items-center justify-center bg-destructive/10">
              <CameraOff className="w-8 h-8 text-destructive" />
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform scale-x-[-1]"
              />
              <canvas ref={canvasRef} className="hidden" />
            </>
          )}
          
          {/* Recording indicator */}
          {state.isCameraReady && (
            <div className="absolute top-2 left-2">
              <div className="flex items-center gap-1.5 bg-black/60 rounded-full px-2 py-0.5">
                <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                <span className="text-[10px] text-white font-medium">REC</span>
              </div>
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Proctoring Active
            </h4>
            <Badge 
              variant={overallScore >= 80 ? "default" : overallScore >= 50 ? "secondary" : "destructive"}
            >
              Score: {overallScore}%
            </Badge>
          </div>

          {analysis && (
            <div className="grid grid-cols-2 gap-3">
              {/* Eye Contact */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Eye Contact
                  </span>
                  <span className={cn(
                    "font-medium",
                    analysis.eyeContact >= 70 ? "text-success" : "text-warning"
                  )}>
                    {analysis.eyeContact}%
                  </span>
                </div>
                <Progress value={analysis.eyeContact} className="h-1.5" />
              </div>

              {/* Posture */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    Posture
                  </span>
                  <span className={cn(
                    "font-medium",
                    analysis.posture >= 70 ? "text-success" : "text-warning"
                  )}>
                    {analysis.posture}%
                  </span>
                </div>
                <Progress value={analysis.posture} className="h-1.5" />
              </div>
            </div>
          )}

          {/* Warnings */}
          <div className="flex flex-wrap gap-2">
            {tabSwitches > 0 && (
              <Badge variant="destructive" className="text-xs gap-1">
                <Monitor className="w-3 h-3" />
                {tabSwitches} Tab Switch{tabSwitches > 1 ? 'es' : ''}
              </Badge>
            )}
            {copyAttempts > 0 && (
              <Badge variant="destructive" className="text-xs gap-1">
                <AlertTriangle className="w-3 h-3" />
                {copyAttempts} Copy Attempt{copyAttempts > 1 ? 's' : ''}
              </Badge>
            )}
            {analysis?.faceVisible === false && (
              <Badge variant="secondary" className="text-xs gap-1 bg-warning/10 text-warning border-warning/20">
                <AlertTriangle className="w-3 h-3" />
                Face Not Detected
              </Badge>
            )}
            {analysis?.headPosition !== 'centered' && analysis?.faceVisible && (
              <Badge variant="secondary" className="text-xs gap-1">
                Head: {analysis.headPosition}
              </Badge>
            )}
            {analysis?.faceVisible && analysis?.headPosition === 'centered' && tabSwitches === 0 && (
              <Badge variant="outline" className="text-xs gap-1 border-success text-success">
                <CheckCircle2 className="w-3 h-3" />
                Good
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProctoringOverlay;
