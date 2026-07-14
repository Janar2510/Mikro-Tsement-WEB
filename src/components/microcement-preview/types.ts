export interface Finish {
  id: string;
  name: string;
  collection: string;
  rgb: [number, number, number];
  hex: string;
  swatchImage?: string;
  description: string;
  popular: boolean;
}

export interface ColorCollection {
  id: string;
  name: string;
  tagline: string;
  colors: Finish[];
}

export type BrushMode = "tap" | "brush";
export type BrushAction = "add" | "remove";

export interface BrushState {
  mode: BrushMode;
  action: BrushAction;
  size: number;
}
