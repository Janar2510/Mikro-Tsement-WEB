"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, RotateCcw, Download, MousePointer2, Brush, Plus, Minus } from "lucide-react";
import { BrushState } from "./types";

interface ControlsProps {
  opacity: number;
  setOpacity: (val: number) => void;
  brushState: BrushState;
  setBrushState: (state: BrushState) => void;
  showBefore: boolean;
  setShowBefore: (val: boolean) => void;
  onReset: () => void;
  onUndo: () => void;
  canUndo: boolean;
  onSave: () => void;
  hasMask: boolean;
  lang?: string;
}

const T = {
  en: {
    mode: "Mode",
    tap: "Tap to Fill",
    brush: "Brush",
    add: "Add",
    remove: "Erase",
    size: "Size",
    opacity: "Opacity",
    before: "Before",
    undo: "Undo",
    reset: "Clear",
    save: "Save",
  },
  et: {
    mode: "Režiim",
    tap: "Klõpsa täitmiseks",
    brush: "Pintsel",
    add: "Lisa",
    remove: "Kustuta",
    size: "Suurus",
    opacity: "Läbipaistvus",
    before: "Enne",
    undo: "Võta tagasi",
    reset: "Puhasta",
    save: "Salvesta",
  },
};

export function Controls({
  opacity,
  setOpacity,
  brushState,
  setBrushState,
  showBefore,
  setShowBefore,
  onReset,
  onUndo,
  canUndo,
  onSave,
  hasMask,
  lang = "en",
}: ControlsProps) {
  const t = T[lang as keyof typeof T] ?? T.en;
  const [, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key.toLowerCase()) {
        case "b": setBrushState({ ...brushState, mode: "brush" }); break;
        case "t": setBrushState({ ...brushState, mode: "tap" }); break;
        case "[": setBrushState({ ...brushState, size: Math.max(5, brushState.size - 5) }); break;
        case "]": setBrushState({ ...brushState, size: Math.min(80, brushState.size + 5) }); break;
        case "z":
          if ((e.ctrlKey || e.metaKey) && canUndo) { e.preventDefault(); onUndo(); }
          break;
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [brushState, setBrushState, canUndo, onUndo]);

  return (
    <div className="space-y-6 pt-6 border-t border-border/30">

      {/* Mode */}
      <div className="space-y-2">
        <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/30">{t.mode}</p>
        <div className="flex gap-0">
          <button
            onClick={() => setBrushState({ ...brushState, mode: "tap" })}
            className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-bold border transition-all duration-200 ${
              brushState.mode === "tap"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground/40 border-border/40 hover:text-foreground/70"
            }`}
          >
            <MousePointer2 className="w-3 h-3" />
            {t.tap}
          </button>
          <button
            onClick={() => setBrushState({ ...brushState, mode: "brush" })}
            className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-bold border border-l-0 transition-all duration-200 ${
              brushState.mode === "brush"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground/40 border-border/40 hover:text-foreground/70"
            }`}
          >
            <Brush className="w-3 h-3" />
            {t.brush}
          </button>
        </div>
      </div>

      {/* Brush controls */}
      {brushState.mode === "brush" && (
        <div className="space-y-3">
          <div className="flex gap-0">
            <button
              onClick={() => setBrushState({ ...brushState, action: "add" })}
              className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-bold border transition-all duration-200 ${
                brushState.action === "add"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground/40 border-border/40 hover:text-foreground/70"
              }`}
            >
              <Plus className="w-3 h-3" />
              {t.add}
            </button>
            <button
              onClick={() => setBrushState({ ...brushState, action: "remove" })}
              className={`flex items-center gap-1.5 px-3 py-2 text-[10px] uppercase tracking-[0.15em] font-bold border border-l-0 transition-all duration-200 ${
                brushState.action === "remove"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground/40 border-border/40 hover:text-foreground/70"
              }`}
            >
              <Minus className="w-3 h-3" />
              {t.remove}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/30 w-14">{t.size}</span>
            <input
              type="range" min="5" max="80"
              value={brushState.size}
              onChange={(e) => setBrushState({ ...brushState, size: parseInt(e.target.value) })}
              className="flex-1 accent-foreground h-0.5"
            />
            <span className="text-[9px] text-foreground/40 w-6 text-right">{brushState.size}</span>
          </div>
        </div>
      )}

      {/* Opacity */}
      <div className="flex items-center gap-3">
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-foreground/30 w-14 shrink-0">{t.opacity}</span>
        <input
          type="range" min="40" max="100"
          value={opacity}
          onChange={(e) => setOpacity(parseInt(e.target.value))}
          className="flex-1 accent-foreground h-0.5"
        />
        <span className="text-[9px] text-foreground/40 w-8 text-right">{opacity}%</span>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onPointerDown={() => setShowBefore(true)}
          onPointerUp={() => setShowBefore(false)}
          onPointerLeave={() => setShowBefore(false)}
          onContextMenu={(e) => e.preventDefault()}
          disabled={!hasMask}
          className={`flex items-center gap-1.5 px-3 py-2 border text-[10px] uppercase tracking-[0.15em] font-bold transition-all select-none ${
            showBefore
              ? "bg-foreground text-background border-foreground"
              : "border-border/40 text-foreground/40 hover:text-foreground/70 disabled:opacity-30 disabled:cursor-not-allowed"
          }`}
        >
          {showBefore ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          {t.before}
        </button>

        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 border border-border/40 text-foreground/40 hover:text-foreground/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title={`${t.undo} (⌘Z)`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onReset}
          disabled={!hasMask}
          className="px-3 py-2 border border-border/40 text-[10px] uppercase tracking-[0.15em] font-bold text-foreground/40 hover:text-foreground/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {t.reset}
        </button>

        <button
          onClick={onSave}
          disabled={!hasMask}
          className="ml-auto p-2 border border-border/40 text-foreground/40 hover:text-foreground/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title={t.save}
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
