import { Palette, PaletteColor, TypeBackground } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    [key: number]: string;
    medium: string;
  }
  // Setting up the Neutral palette color, as there is only Primary and Secondary defined
  interface Palette {
    neutral: PaletteColor;
    background: {
      alt: string;
    };
  }
  interface TypeBackground {
    alt: string;
  }
}
