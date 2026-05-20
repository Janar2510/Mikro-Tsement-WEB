"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrushState, Finish } from "./types";
import { paintLine } from "./brush";
import { applyFinish } from "./apply-finish";
import { smartPrecisionWallSegment, mergeMasks } from "./flood-fill";

interface TapPulse {
  id: number;
  x: number;
  y: number;
}

interface CanvasStageProps {
  imageFile: File;
  finish: Finish;
  opacity: number;
  mode: "tap" | "brush";
  brushState: BrushState;
  mask: Uint8Array | null;
  showBefore: boolean;
  onMaskChange: (newMask: Uint8Array, merge?: boolean) => void;
  isLoading: boolean;
}

export function CanvasStage({
  imageFile,
  finish,
  opacity,
  mode,
  brushState,
  mask,
  showBefore,
  onMaskChange,
  isLoading,
}: CanvasStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalImageDataRef = useRef<ImageData | null>(null);
  const [pulses, setPulses] = useState<TapPulse[]>([]);
  const pulseIdRef = useRef(0);

  // Client-side flood fill state
  const isProcessingRef = useRef(false);

  // Brush state
  const isPaintingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const currentMaskRef = useRef<Uint8Array | null>(null);
  const lastPaintTimeRef = useRef(0);

  // Load image when file changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const img = new Image();
    const url = URL.createObjectURL(imageFile);
    img.src = url;

    img.onload = () => {
      // Calculate scaled dimensions to fit max 720px width
      const maxWidth = 720;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }

      // Handle device pixel ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      ctx.drawImage(img, 0, 0, width, height);
      originalImageDataRef.current = ctx.getImageData(0, 0, width * dpr, height * dpr);

      URL.revokeObjectURL(url);
    };

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // Update canvas when mask, finish, opacity, or showBefore changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !originalImageDataRef.current) return;

    if (mask) {
      currentMaskRef.current = new Uint8Array(mask);
    }

    if (showBefore || !currentMaskRef.current) {
      ctx.putImageData(originalImageDataRef.current, 0, 0);
    } else {
      const newImageData = applyFinish(
        originalImageDataRef.current,
        currentMaskRef.current,
        finish.rgb,
        opacity / 100
      );
      ctx.putImageData(newImageData, 0, 0);
    }
  }, [mask, finish, opacity, showBefore]);

  const getCoordinates = (e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Scale to device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    return { cx: x, cy: y, px: Math.round(x * dpr), py: Math.round(y * dpr), dpr };
  };

  // Client-side flood fill segmentation
  const handleTapFloodFill = useCallback((px: number, py: number) => {
    if (!originalImageDataRef.current || isProcessingRef.current) return;

    isProcessingRef.current = true;

    // Run flood fill in a non-blocking way
    setTimeout(() => {
      try {
        const { width, height } = originalImageDataRef.current!;

        // Ensure coordinates are within bounds
        const x = Math.max(0, Math.min(px, width - 1));
        const y = Math.max(0, Math.min(py, height - 1));

        // Use precision wall segmentation for wall detection
        const newMask = smartPrecisionWallSegment(originalImageDataRef.current!, x, y);

        // If we already have a mask, merge with existing (cumulative)
        if (currentMaskRef.current) {
          const mergedMask = mergeMasks(currentMaskRef.current, newMask);
          currentMaskRef.current = mergedMask;
          onMaskChange(mergedMask, true);
        } else {
          currentMaskRef.current = newMask;
          onMaskChange(newMask, false);
        }

        // Re-render
        if (currentMaskRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (ctx && originalImageDataRef.current) {
            const newImageData = applyFinish(
              originalImageDataRef.current,
              currentMaskRef.current,
              finish.rgb,
              opacity / 100
            );
            ctx.putImageData(newImageData, 0, 0);
          }
        }
      } catch (error) {
        console.error("Flood fill error:", error);
      } finally {
        isProcessingRef.current = false;
      }
    }, 10);
  }, [finish, opacity, onMaskChange]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (showBefore) return;

    const coords = getCoordinates(e);
    if (!coords) return;
    const { cx, cy, px, py } = coords;

    if (mode === "tap") {
      // Show pulse animation
      const id = pulseIdRef.current++;
      setPulses((p) => [...p, { id, x: cx, y: cy }]);
      setTimeout(() => {
        setPulses((p) => p.filter((pulse) => pulse.id !== id));
      }, 500);

      // Run client-side flood fill
      handleTapFloodFill(px, py);

    } else if (mode === "brush") {
      isPaintingRef.current = true;
      lastPosRef.current = { x: px, y: py };
      e.currentTarget.setPointerCapture(e.pointerId);

      // Initialize mask if null
      if (!currentMaskRef.current && originalImageDataRef.current) {
        currentMaskRef.current = new Uint8Array(
          originalImageDataRef.current.width * originalImageDataRef.current.height
        );
      }

      paintAndRender(px, py, px, py);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPaintingRef.current || mode !== "brush" || showBefore) return;

    const coords = getCoordinates(e);
    if (!coords) return;
    const { px, py } = coords;

    const lastPos = lastPosRef.current;
    if (lastPos) {
      // Throttle to roughly 30fps (33ms)
      const now = performance.now();
      if (now - lastPaintTimeRef.current > 33) {
        paintAndRender(lastPos.x, lastPos.y, px, py);
        lastPosRef.current = { x: px, y: py };
        lastPaintTimeRef.current = now;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isPaintingRef.current && mode === "brush") {
      isPaintingRef.current = false;
      lastPosRef.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);

      if (currentMaskRef.current) {
        onMaskChange(new Uint8Array(currentMaskRef.current), true);
      }
    }
  };

  const paintAndRender = (x0: number, y0: number, x1: number, y1: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !originalImageDataRef.current || !currentMaskRef.current) return;

    const value = brushState.action === "add" ? 1 : 0;
    // Scale brush size by device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const radius = (brushState.size / 2) * dpr;

    paintLine(
      currentMaskRef.current,
      x0,
      y0,
      x1,
      y1,
      radius,
      value,
      canvas.width,
      canvas.height
    );

    // Re-apply finish for the entire canvas (can be optimized to dirty rect later)
    const newImageData = applyFinish(
      originalImageDataRef.current,
      currentMaskRef.current,
      finish.rgb,
      opacity / 100
    );
    ctx.putImageData(newImageData, 0, 0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[720px] mx-auto overflow-hidden rounded-lg bg-neutral-100 shadow-md flex items-center justify-center min-h-[300px]"
      style={{ touchAction: mode === "brush" ? "none" : "auto" }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`max-w-full h-auto ${mode === "brush" ? "cursor-crosshair" : "cursor-pointer"}`}
      />

      <AnimatePresence>
        {pulses.map((pulse) => (
          <motion.div
            key={pulse.id}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute rounded-full border-2 border-white bg-white/30 pointer-events-none"
            style={{
              left: pulse.x - 20,
              top: pulse.y - 20,
              width: 40,
              height: 40,
            }}
          />
        ))}
      </AnimatePresence>

      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center z-10 pointer-events-none backdrop-blur-sm transition-all duration-300">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full mb-3"
          />
          <span className="text-white font-medium shadow-sm px-3 py-1 bg-black/40 rounded-full text-sm">
            Processing...
          </span>
        </div>
      )}
    </div>
  );
}