"use client";

import { useState, useCallback } from "react";
import { Upload, Camera, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrushState } from "./types";
import { FINISHES } from "./finishes";
import { CanvasStage } from "./CanvasStage";
import { Controls } from "./Controls";
import { FinishPicker } from "./FinishPicker";

interface MicrocementPreviewProps {
  lang?: string;
}

const T = {
  en: {
    uploadTitle: "See it in your space",
    uploadDesc: "Upload a photo of your room, tap any wall to instantly preview Luxury Concrete® finishes.",
    takePhoto: "Take Photo",
    choosePhoto: "Upload Photo",
    dragDrop: "or drag and drop",
    tapHint: "Tap any wall to apply colour",
    changePhoto: "Choose a different photo",
    errorImage: "Please select an image file.",
    errorSize: "Image must be smaller than 8MB.",
  },
  et: {
    uploadTitle: "Näe seda oma ruumis",
    uploadDesc: "Lae üles foto oma ruumist, klõpsa seinale ja vaata kohe Luxury Concrete® toone.",
    takePhoto: "Tee foto",
    choosePhoto: "Lae foto üles",
    dragDrop: "või lohista siia",
    tapHint: "Klõpsa seinale värvi kandmiseks",
    changePhoto: "Vali teine foto",
    errorImage: "Palun vali pildifail.",
    errorSize: "Pilt peab olema väiksem kui 8MB.",
  },
};

export default function MicrocementPreview({ lang = "en" }: MicrocementPreviewProps) {
  const t = T[lang as keyof typeof T] ?? T.en;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedFinishId, setSelectedFinishId] = useState<string>(FINISHES[0].id);
  const [opacity, setOpacity] = useState<number>(88);
  const [brushState, setBrushState] = useState<BrushState>({ mode: "tap", action: "add", size: 24 });
  const [maskStack, setMaskStack] = useState<Uint8Array[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBefore, setShowBefore] = useState(false);

  const selectedFinish = FINISHES.find((f) => f.id === selectedFinishId) || FINISHES[0];
  const currentMask = maskStack.length > 0 ? maskStack[maskStack.length - 1] : null;

  const pushMask = useCallback((newMask: Uint8Array, merge?: boolean) => {
    setMaskStack((prev) => {
      let finalMask = newMask;
      if (merge && prev.length > 0) {
        const existing = prev[prev.length - 1];
        finalMask = new Uint8Array(existing.length);
        for (let i = 0; i < existing.length; i++) finalMask[i] = existing[i] || newMask[i] ? 1 : 0;
      }
      const next = [...prev, finalMask];
      return next.length > 20 ? next.slice(-20) : next;
    });
  }, []);

  const handleUndo = useCallback(() => {
    setMaskStack((prev) => (prev.length <= 1 ? [] : prev.slice(0, -1)));
  }, []);

  const handleReset = useCallback(() => setMaskStack([]), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError(t.errorImage); return; }
    if (file.size > 8 * 1024 * 1024) { setError(t.errorSize); return; }
    setImageFile(file);
    setMaskStack([]);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError(t.errorImage); return; }
    setImageFile(file);
    setMaskStack([]);
    setError(null);
  };

  const handleMaskChange = useCallback((newMask: Uint8Array, merge = false) => {
    setIsLoading(true);
    setTimeout(() => { pushMask(newMask, merge); setIsLoading(false); }, 50);
  }, [pushMask]);

  const handleSave = useCallback(async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    if (navigator.share) {
      try {
        const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
        if (blob) {
          await navigator.share({ title: "Microcement Preview", files: [new File([blob], "microcement-preview.png", { type: "image/png" })] });
          return;
        }
      } catch { /* fallback */ }
    }
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "microcement-preview.png";
    a.click();
  }, []);

  return (
    <div className="w-full">
      {!imageFile ? (
        /* ── Upload state ───────────────────────────────────────────── */
        <div
          className="relative group overflow-hidden rounded-2xl border border-dashed border-foreground/20 bg-foreground/[0.01] hover:bg-foreground/[0.02] transition-colors duration-500 py-32 px-8 flex flex-col items-center justify-center text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* Subtle gradient glow that follows hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 space-y-8 max-w-lg mx-auto"
          >
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-white shadow-sm border border-foreground/5 flex items-center justify-center mb-6">
                <Upload className="w-6 h-6 text-foreground/40 group-hover:text-foreground/80 transition-colors duration-500" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40">— Luxury Concrete®</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter italic leading-[0.95]">
                {t.uploadTitle}
              </h2>
              <p className="font-sans text-sm md:text-base text-foreground/50 leading-relaxed max-w-sm mx-auto">
                {t.uploadDesc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <label
                htmlFor="mc-camera-input"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer hover:bg-foreground/80 hover:scale-105 active:scale-95 transition-all duration-300 rounded-full sm:hidden w-full"
              >
                <input id="mc-camera-input" type="file" accept="image/*" capture="environment" className="sr-only" onChange={handleFileChange} />
                <Camera className="w-4 h-4" />
                {t.takePhoto}
              </label>

              <label
                htmlFor="mc-file-input"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold cursor-pointer hover:bg-foreground/80 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-xl shadow-black/10 rounded-full w-full sm:w-auto"
              >
                <input id="mc-file-input" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                <Upload className="w-4 h-4" />
                {t.choosePhoto}
              </label>
            </div>

            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/20">{t.dragDrop}</p>
          </motion.div>
        </div>
      ) : (
        /* ── Visualizer state ───────────────────────────────────────── */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[1fr_280px] gap-8 items-start"
        >
          {/* Canvas */}
          <div className="space-y-0">
            <div className="relative">
              <CanvasStage
                imageFile={imageFile}
                finish={selectedFinish}
                opacity={opacity}
                mode={brushState.mode}
                brushState={brushState}
                mask={currentMask}
                showBefore={showBefore}
                onMaskChange={handleMaskChange}
                isLoading={isLoading}
              />
              {/* Tap hint overlay on first load */}
              {!currentMask && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-foreground/80 backdrop-blur-sm pointer-events-none">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-background/80 font-bold whitespace-nowrap">{t.tapHint}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-0 lg:sticky lg:top-24">
            <div className="border border-border/50 bg-background p-6 space-y-6">
              <FinishPicker
                selectedFinishId={selectedFinishId}
                onSelect={(finish) => setSelectedFinishId(finish.id)}
                lang={lang}
              />

              <Controls
                opacity={opacity}
                setOpacity={setOpacity}
                brushState={brushState}
                setBrushState={setBrushState}
                showBefore={showBefore}
                setShowBefore={setShowBefore}
                onReset={handleReset}
                onUndo={handleUndo}
                canUndo={maskStack.length > 0}
                onSave={handleSave}
                hasMask={!!currentMask}
                lang={lang}
              />

              <button
                onClick={() => { setImageFile(null); setMaskStack([]); }}
                className="w-full text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/30 hover:text-foreground/60 transition-colors pt-2"
              >
                {t.changePhoto}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-foreground text-background px-5 py-3"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] font-bold">{error}</span>
            <button onClick={() => setError(null)} className="p-1 hover:opacity-60 transition-opacity">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
