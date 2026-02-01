import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerProps {
  expectedSeconds: number;
  onTimeUp?: () => void;
}

export function useTimer({ expectedSeconds, onTimeUp }: UseTimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  const start = useCallback(() => {
    setIsRunning(true);
    setElapsedSeconds(0);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return elapsedSeconds;
  }, [elapsedSeconds]);

  const reset = useCallback(() => {
    setElapsedSeconds(0);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 1;
          if (next >= expectedSeconds * 2 && onTimeUpRef.current) {
            // Auto-submit after 2x expected time
            onTimeUpRef.current();
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, expectedSeconds]);

  const isOvertime = elapsedSeconds > expectedSeconds;
  const remainingSeconds = Math.max(0, expectedSeconds - elapsedSeconds);
  const progress = Math.min(100, (elapsedSeconds / expectedSeconds) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return {
    elapsedSeconds,
    remainingSeconds,
    isRunning,
    isOvertime,
    progress,
    formattedElapsed: formatTime(elapsedSeconds),
    formattedRemaining: formatTime(remainingSeconds),
    start,
    stop,
    reset,
  };
}
