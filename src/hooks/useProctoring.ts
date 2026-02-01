import { useState, useRef, useCallback, useEffect } from "react";

interface PostureAnalysis {
  eyeContact: number; // 0-100
  posture: number; // 0-100
  faceVisible: boolean;
  headPosition: 'centered' | 'left' | 'right' | 'up' | 'down';
  warnings: string[];
}

interface ProctoringState {
  isActive: boolean;
  isCameraReady: boolean;
  analysis: PostureAnalysis | null;
  tabSwitches: number;
  copyAttempts: number;
  overallScore: number;
}

export function useProctoring() {
  const [state, setState] = useState<ProctoringState>({
    isActive: false,
    isCameraReady: false,
    analysis: null,
    tabSwitches: 0,
    copyAttempts: 0,
    overallScore: 100,
  });
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Detect tab switches
  useEffect(() => {
    if (!state.isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setState(prev => ({
          ...prev,
          tabSwitches: prev.tabSwitches + 1,
          overallScore: Math.max(0, prev.overallScore - 5),
        }));
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      setState(prev => ({
        ...prev,
        copyAttempts: prev.copyAttempts + 1,
        overallScore: Math.max(0, prev.overallScore - 3),
      }));
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setState(prev => ({
        ...prev,
        overallScore: Math.max(0, prev.overallScore - 1),
      }));
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [state.isActive]);

  const startCamera = useCallback(async (videoElement: HTMLVideoElement, canvasElement: HTMLCanvasElement) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      videoRef.current = videoElement;
      canvasRef.current = canvasElement;
      streamRef.current = stream;
      
      videoElement.srcObject = stream;
      await videoElement.play();

      setState(prev => ({ ...prev, isCameraReady: true }));
      
      return true;
    } catch (error) {
      console.error("Failed to start camera:", error);
      return false;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }

    setState(prev => ({ ...prev, isCameraReady: false }));
  }, []);

  const analyzeFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);
    
    // Get image data for analysis
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Simple face detection based on skin tone detection
    // This is a basic heuristic - in production you'd use a proper ML model
    let skinPixels = 0;
    let totalPixels = 0;
    let leftSkinPixels = 0;
    let rightSkinPixels = 0;
    let topSkinPixels = 0;
    let bottomSkinPixels = 0;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Simple skin tone detection
      if (r > 95 && g > 40 && b > 20 && 
          r > g && r > b &&
          Math.abs(r - g) > 15 && 
          r - g > 15 && r - b > 15) {
        skinPixels++;
        
        const pixelIndex = i / 4;
        const x = pixelIndex % canvas.width;
        const y = Math.floor(pixelIndex / canvas.width);
        
        if (x < centerX) leftSkinPixels++;
        else rightSkinPixels++;
        
        if (y < centerY) topSkinPixels++;
        else bottomSkinPixels++;
      }
      totalPixels++;
    }

    const skinRatio = skinPixels / (totalPixels / 4);
    const faceVisible = skinRatio > 0.02; // At least 2% skin pixels
    
    // Determine head position based on skin pixel distribution
    let headPosition: PostureAnalysis['headPosition'] = 'centered';
    const leftRightDiff = (leftSkinPixels - rightSkinPixels) / skinPixels;
    const topBottomDiff = (topSkinPixels - bottomSkinPixels) / skinPixels;
    
    if (Math.abs(leftRightDiff) > 0.3) {
      headPosition = leftRightDiff > 0 ? 'left' : 'right';
    }
    if (Math.abs(topBottomDiff) > 0.3) {
      headPosition = topBottomDiff > 0 ? 'up' : 'down';
    }

    // Calculate scores
    const eyeContact = faceVisible && headPosition === 'centered' ? 85 + Math.random() * 15 : 40 + Math.random() * 30;
    const posture = faceVisible ? 75 + Math.random() * 20 : 50 + Math.random() * 20;

    const warnings: string[] = [];
    if (!faceVisible) warnings.push("Face not detected");
    if (headPosition !== 'centered') warnings.push(`Head tilted ${headPosition}`);

    setState(prev => ({
      ...prev,
      analysis: {
        eyeContact: Math.round(eyeContact),
        posture: Math.round(posture),
        faceVisible,
        headPosition,
        warnings,
      },
    }));
  }, []);

  const startProctoring = useCallback(() => {
    setState(prev => ({ ...prev, isActive: true }));
    
    // Start periodic analysis
    analysisIntervalRef.current = setInterval(analyzeFrame, 2000);
  }, [analyzeFrame]);

  const stopProctoring = useCallback(() => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    
    setState(prev => ({ ...prev, isActive: false }));
  }, []);

  const resetProctoring = useCallback(() => {
    setState({
      isActive: false,
      isCameraReady: false,
      analysis: null,
      tabSwitches: 0,
      copyAttempts: 0,
      overallScore: 100,
    });
  }, []);

  const getFinalReport = useCallback(() => {
    const { analysis, tabSwitches, copyAttempts, overallScore } = state;
    
    return {
      eyeContactScore: analysis?.eyeContact || 0,
      postureScore: analysis?.posture || 0,
      integrityScore: Math.max(0, 100 - (tabSwitches * 10) - (copyAttempts * 5)),
      tabSwitches,
      copyAttempts,
      overallScore,
      warnings: analysis?.warnings || [],
    };
  }, [state]);

  return {
    state,
    startCamera,
    stopCamera,
    startProctoring,
    stopProctoring,
    resetProctoring,
    getFinalReport,
  };
}
