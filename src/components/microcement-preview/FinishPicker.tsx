"use client";

import { Finish } from "./types";
import { FINISHES } from "./finishes";

interface FinishPickerProps {
  selectedFinishId: string;
  onSelect: (finish: Finish) => void;
  lang?: string;
}

const noiseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch"/></filter><rect width="200" height="200" filter="url(#n)"/></svg>`;
const NOISE_BG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(noiseSvg)}`;

export function FinishPicker({ selectedFinishId, onSelect, lang = "en" }: FinishPickerProps) {
  const label = lang === "et" ? "Vali toon" : "Select Colour";
  const popularLabel = lang === "et" ? "Populaarne" : "Popular";

  return (
    <div className="w-full space-y-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40">{label}</p>
        <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/25">Basebeton Originale</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {FINISHES.map((finish) => {
          const isSelected = finish.id === selectedFinishId;
          return (
            <button
              key={finish.id}
              onClick={() => onSelect(finish)}
              className="group flex flex-col items-center gap-2 focus:outline-none"
              title={finish.description}
            >
              {/* Square swatch with microcement texture */}
              <div
                className={`relative w-full aspect-square overflow-hidden transition-transform duration-300 group-hover:scale-[1.04] ${
                  isSelected
                    ? "ring-1 ring-foreground ring-offset-2 ring-offset-background"
                    : "ring-1 ring-foreground/10"
                }`}
                style={{ backgroundColor: finish.hex }}
              >
                {/* Fractal noise grain */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: `url("${NOISE_BG}")`,
                  backgroundSize: "200px 200px",
                  opacity: 0.12,
                  mixBlendMode: "overlay",
                }} />
                {/* Directional light */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(128deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.03) 40%,rgba(0,0,0,0.05) 65%,rgba(0,0,0,0.18) 100%)",
                }} />
                {/* Edge vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
                }} />
              </div>

              <div className="text-center space-y-0.5 w-full">
                <p className={`text-[9px] font-sans leading-tight transition-colors ${
                  isSelected ? "text-foreground font-bold" : "text-foreground/50"
                }`}>
                  {finish.name}
                </p>
                {finish.popular && (
                  <p className="text-[7px] uppercase tracking-[0.15em] text-foreground/30">{popularLabel}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
