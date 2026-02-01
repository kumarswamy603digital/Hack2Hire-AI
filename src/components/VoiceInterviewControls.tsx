import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVoiceInterview } from "@/hooks/useVoiceInterview";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Loader2, 
  MessageSquare,
  Sparkles,
  StopCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VoiceInterviewControlsProps {
  question: string;
  onTranscription: (text: string) => void;
  disabled?: boolean;
  autoSpeak?: boolean;
}

export const VoiceInterviewControls = ({
  question,
  onTranscription,
  disabled = false,
  autoSpeak = true
}: VoiceInterviewControlsProps) => {
  const [hasSpokenQuestion, setHasSpokenQuestion] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");

  const {
    isRecording,
    isSpeaking,
    isProcessing,
    speakText,
    stopSpeaking,
    startRecording,
    stopRecording,
    cancelRecording
  } = useVoiceInterview({
    onTranscription: (text) => {
      setTranscribedText(text);
      onTranscription(text);
    }
  });

  // Auto-speak the question when it changes
  useEffect(() => {
    if (autoSpeak && question && !hasSpokenQuestion && !disabled) {
      setHasSpokenQuestion(true);
      speakText(question).catch((err) => {
        console.error("Failed to speak question:", err);
        toast.error("Voice synthesis unavailable. Reading question silently.");
      });
    }
  }, [question, autoSpeak, hasSpokenQuestion, disabled, speakText]);

  // Reset when question changes
  useEffect(() => {
    setHasSpokenQuestion(false);
    setTranscribedText("");
  }, [question]);

  const handleRecordToggle = async () => {
    if (isRecording) {
      try {
        await stopRecording();
        toast.success("Response recorded!");
      } catch (error) {
        toast.error("Failed to process recording");
      }
    } else {
      try {
        if (isSpeaking) {
          stopSpeaking();
        }
        await startRecording();
      } catch (error) {
        // Error already handled in hook
      }
    }
  };

  const handleReplayQuestion = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(question).catch((err) => {
        toast.error("Failed to play question");
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Voice Status Indicators */}
      <div className="flex items-center justify-center gap-4">
        {isSpeaking && (
          <Badge variant="secondary" className="animate-pulse gap-2">
            <Volume2 className="w-3 h-3" />
            AI Speaking...
          </Badge>
        )}
        {isRecording && (
          <Badge variant="destructive" className="animate-pulse gap-2">
            <Mic className="w-3 h-3" />
            Recording...
          </Badge>
        )}
        {isProcessing && (
          <Badge variant="outline" className="gap-2">
            <Loader2 className="w-3 h-3 animate-spin" />
            Processing...
          </Badge>
        )}
      </div>

      {/* Voice Control Buttons */}
      <div className="flex items-center justify-center gap-3">
        {/* Replay Question Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={handleReplayQuestion}
          disabled={disabled || isProcessing}
          className="gap-2"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-5 h-5" />
              Stop
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              Hear Question
            </>
          )}
        </Button>

        {/* Record Button */}
        <Button
          variant={isRecording ? "destructive" : "default"}
          size="lg"
          onClick={handleRecordToggle}
          disabled={disabled || isSpeaking || isProcessing}
          className={cn(
            "gap-2 min-w-[160px]",
            isRecording && "animate-pulse"
          )}
        >
          {isRecording ? (
            <>
              <StopCircle className="w-5 h-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Speaking
            </>
          )}
        </Button>
      </div>

      {/* Transcribed Text Preview */}
      {transcribedText && (
        <div className="glass-card rounded-xl p-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Your Response:</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {transcribedText}
          </p>
        </div>
      )}

      {/* Voice Mode Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          <Sparkles className="w-3 h-3 inline mr-1" />
          Voice mode powered by ElevenLabs AI
        </p>
      </div>
    </div>
  );
};

export default VoiceInterviewControls;
