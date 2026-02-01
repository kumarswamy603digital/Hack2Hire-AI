import { useTimer } from "@/hooks/useTimer";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewTimerProps {
  expectedSeconds: number;
  onTimeUp: () => void;
  isActive: boolean;
  onElapsedChange?: (elapsed: number) => void;
}

export const InterviewTimer = ({ 
  expectedSeconds, 
  onTimeUp, 
  isActive,
  onElapsedChange 
}: InterviewTimerProps) => {
  const timer = useTimer({ expectedSeconds, onTimeUp });

  // Start/stop based on isActive
  if (isActive && !timer.isRunning) {
    timer.start();
  }

  // Report elapsed time
  if (onElapsedChange) {
    onElapsedChange(timer.elapsedSeconds);
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {timer.isOvertime ? (
            <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
          ) : (
            <Clock className="w-5 h-5 text-primary" />
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {timer.isOvertime ? "Overtime!" : "Time Remaining"}
          </span>
        </div>
        <div className={cn(
          "font-mono font-bold text-2xl",
          timer.isOvertime ? "text-destructive" : "text-foreground"
        )}>
          {timer.isOvertime 
            ? `+${timer.formattedElapsed.replace(/^0:/, "")}`
            : timer.formattedRemaining
          }
        </div>
      </div>
      
      <Progress 
        value={timer.progress} 
        className={cn(
          "h-2",
          timer.isOvertime && "[&>div]:bg-destructive"
        )}
      />
      
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Elapsed: {timer.formattedElapsed}</span>
        <span>Expected: {Math.floor(expectedSeconds / 60)}:{(expectedSeconds % 60).toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
};
