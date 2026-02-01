import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AssessmentStageProps {
  number: number;
  title: string;
  description: string;
  status: "pending" | "active" | "complete";
  isLast?: boolean;
}

export const AssessmentStage = ({
  number,
  title,
  description,
  status,
  isLast = false,
}: AssessmentStageProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "stage-indicator",
            status === "active" && "stage-indicator-active",
            status === "complete" && "stage-indicator-complete",
            status === "pending" && "stage-indicator-pending"
          )}
        >
          {status === "complete" ? (
            <Check className="w-5 h-5" />
          ) : (
            <span>{number}</span>
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "w-0.5 h-16 mt-2 transition-colors duration-300",
              status === "complete" ? "bg-success" : "bg-border"
            )}
          />
        )}
      </div>
      <div className="pt-2">
        <h3
          className={cn(
            "font-display font-semibold text-lg transition-colors",
            status === "active" && "text-primary",
            status === "complete" && "text-success",
            status === "pending" && "text-muted-foreground"
          )}
        >
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
};
