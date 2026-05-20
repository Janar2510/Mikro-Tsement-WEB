export interface Finish {
  id: string;
  name: string;
  rgb: [number, number, number];
  hex: string;
  description: string;
  popular: boolean;
}

export type BrushMode = "tap" | "brush";
export type BrushAction = "add" | "remove";

export interface BrushState {
  mode: BrushMode;
  action: BrushAction;
  size: number;
}
