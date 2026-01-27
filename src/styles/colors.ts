export type IColors =
  | "BLACK"
  | "WHITE"
  | "BLUE_PRIMARY"
  | "BLUE_SECONDARY"
  | "YELLOW_PRIMARY"
  | "YELLOW_SECONDARY"
  | "GRAY_LIGHT"
  | "GRAY_MEDIUM"
  | "ERROR"
  | "SUCCESS";

export const COLORS: Record<IColors, string> = {
  BLACK: "#000000",
  WHITE: "#FFFFFF",

  // Blue Palette
  BLUE_PRIMARY: "#1A4D8C",
  BLUE_SECONDARY: "#4A7FC0",

  // Yellow Palette
  YELLOW_PRIMARY: "#FFC107",
  YELLOW_SECONDARY: "#FFD54F",

  // Neutrals & Utility
  GRAY_LIGHT: "#F5F5F5",
  GRAY_MEDIUM: "#9E9E9E",
  ERROR: "#D32F2F",
  SUCCESS: "#388E3C",
};
