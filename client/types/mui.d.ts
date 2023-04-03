import { Palette, PaletteColor } from '@mui/material/styles';

declare module "@mui/material/styles" {
  interface PaletteColor {
    [key: number]: string;
  }
  // Setting up the Tertiary palette color, as there is only Primary and Secondary defined
  interface Palette {
    neutral: PaletteColor;
  }
}
