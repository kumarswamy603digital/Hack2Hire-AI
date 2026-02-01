import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/* Web Speech API types (vendor-prefixed in some browsers)             */
/* ------------------------------------------------------------------ */
type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer T }
  ? T
  : any;

interface UseVoiceInterviewOptions {
  onTranscription?: (text: string) => void;
}

// Check if browser supports the Web Speech API
const getBrowserSpeechRecognition = (): SpeechRecognitionType | null => {
  if (typeof window === "undefined") return null;
  return (
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition ||
    null
  );
};

export function useVoiceInterview(options: UseVoiceInterviewOptions = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const browserRecognitionRef = useRef<any>(null);
  const browserTranscriptRef = useRef<string>("");

  const speakText = useCallback(async (text: string): Promise<void> => {
    if (!text) return;

    setIsSpeaking(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `TTS failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      return new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setIsSpeaking(false);
          resolve();
        };

        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          setIsSpeaking(false);
          reject(new Error("Audio playback failed"));
        };

        audio.play().catch(reject);
      });
    } catch (error) {
      setIsSpeaking(false);
      console.error("TTS error:", error);
      throw error;
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
    }
  }, []);

  /* ------------------------------------------------------------------ */
  /* Browser-based STT fallback using Web Speech API                    */
  /* ------------------------------------------------------------------ */
  const transcribeWithBrowser = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      const SpeechRecognitionCtor = getBrowserSpeechRecognition();
      if (!SpeechRecognitionCtor) {
        reject(new Error("Browser speech recognition not supported"));
        return;
      }

      const recognition = new SpeechRecognitionCtor();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = true;

      browserTranscriptRef.current = "";

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + " ";
          }
        }
        browserTranscriptRef.current = transcript.trim();
      };

      recognition.onerror = (event: any) => {
        console.error("Browser speech recognition error:", event.error);
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      recognition.onend = () => {
        resolve(browserTranscriptRef.current);
      };

      browserRecognitionRef.current = recognition;
      recognition.start();
    });
  }, []);

  const stopBrowserRecognition = useCallback((): string => {
    if (browserRecognitionRef.current) {
      browserRecognitionRef.current.stop();
      browserRecognitionRef.current = null;
    }
    return browserTranscriptRef.current;
  }, []);

  /* ------------------------------------------------------------------ */
  /* Main recording flow – tries ElevenLabs STT, then falls back        */
  /* ------------------------------------------------------------------ */
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "audio/mp4",
      });

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);

      // Also start browser recognition in parallel for fallback
      transcribeWithBrowser().catch(() => {
        /* ignore – fallback may not be supported */
      });
    } catch (error) {
      console.error("Failed to start recording:", error);
      toast.error("Failed to access microphone. Please check permissions.");
      throw error;
    }
  }, [transcribeWithBrowser]);

  const stopRecording = useCallback(async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (
        !mediaRecorderRef.current ||
        mediaRecorderRef.current.state === "inactive"
      ) {
        reject(new Error("No recording in progress"));
        return;
      }

      mediaRecorderRef.current.onstop = async () => {
        setIsRecording(false);
        setIsProcessing(true);

        // Collect fallback transcript before continuing
        const fallbackTranscript = stopBrowserRecognition();

        try {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: mediaRecorderRef.current?.mimeType || "audio/webm",
          });

          // Stop all tracks
          mediaRecorderRef.current?.stream
            .getTracks()
            .forEach((track) => track.stop());

          // Send to ElevenLabs STT
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");

          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-stt`,
            {
              method: "POST",
              headers: {
                apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              },
              body: formData,
            }
          );

          const data = await response.json();

          // Check for ElevenLabs failure
          if (!response.ok || !data.success || !data.text) {
            console.warn(
              "ElevenLabs STT failed, using browser fallback:",
              data.error
            );
            if (fallbackTranscript) {
              options.onTranscription?.(fallbackTranscript);
              resolve(fallbackTranscript);
              return;
            }
            throw new Error(data.error || "Transcription failed");
          }

          options.onTranscription?.(data.text);
          resolve(data.text);
        } catch (error) {
          console.error("STT error:", error);
          // Last attempt: use fallback if available
          if (fallbackTranscript) {
            console.log("Using browser fallback transcript");
            options.onTranscription?.(fallbackTranscript);
            resolve(fallbackTranscript);
          } else {
            reject(error);
          }
        } finally {
          setIsProcessing(false);
        }
      };

      mediaRecorderRef.current.stop();
    });
  }, [options, stopBrowserRecognition]);

  const cancelRecording = useCallback(() => {
    stopBrowserRecognition();
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [stopBrowserRecognition]);

  return {
    isRecording,
    isSpeaking,
    isProcessing,
    speakText,
    stopSpeaking,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
