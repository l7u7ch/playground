import { createTheme } from "@mui/material/styles";
import type { NoteColor } from "./types/note";

export const NOTE_COLORS: Record<NoteColor, string> = {
  default: "#2d2d2d",
  red: "#5c2b29",
  orange: "#614a19",
  yellow: "#635d19",
  green: "#345920",
  teal: "#16504b",
  blue: "#1e3a5f",
  purple: "#42275e",
  pink: "#5c2d4e",
  brown: "#442e1c",
};

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default theme;
