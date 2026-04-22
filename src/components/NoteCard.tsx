"use client";

import { useState, Dispatch } from "react";
import { Box, Card, CardContent, CardActionArea, IconButton, Typography, Popper, ClickAwayListener } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import { NOTE_COLORS } from "../theme";
import type { Note } from "../types/note";
import ColorPicker from "./ColorPicker";

type Action =
  | { type: "UPDATE"; id: string; patch: Partial<Note> }
  | { type: "DELETE"; id: string }
  | { type: "PIN"; id: string };

interface Props {
  note: Note;
  onEdit: (id: string) => void;
  dispatch: Dispatch<Action>;
}

export default function NoteCard({ note, onEdit, dispatch }: Props) {
  const [colorAnchor, setColorAnchor] = useState<HTMLElement | null>(null);

  function handleCardClick() {
    onEdit(note.id);
  }

  function handlePin(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({ type: "PIN", id: note.id });
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({ type: "DELETE", id: note.id });
  }

  function handleColorClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setColorAnchor(colorAnchor ? null : e.currentTarget);
  }

  function handleColorChange(color: Note["color"]) {
    dispatch({ type: "UPDATE", id: note.id, patch: { color } });
    setColorAnchor(null);
  }

  return (
    <Card
      sx={{
        bgcolor: NOTE_COLORS[note.color],
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.12)",
        borderRadius: 2,
        position: "relative",
        "&:hover .note-actions": { opacity: 1 },
        "&:hover": { borderColor: "rgba(255,255,255,0.3)" },
        transition: "border-color 0.2s",
      }}
    >
      <CardActionArea onClick={handleCardClick} sx={{ alignItems: "flex-start" }}>
        <CardContent sx={{ pb: "40px !important" }}>
          {note.title && (
            <Typography variant="subtitle2" gutterBottom sx={{ wordBreak: "break-word", fontWeight: "bold" }}>
              {note.title}
            </Typography>
          )}
          {note.body && (
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {note.body}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      {/* Action bar */}
      <Box
        className="note-actions"
        sx={{
          opacity: 0,
          transition: "opacity 0.2s",
          position: "absolute",
          bottom: 4,
          left: 4,
          right: 4,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton size="small" onClick={handlePin} title={note.pinned ? "ピン留めを外す" : "ピン留め"}>
          {note.pinned ? <PushPinIcon fontSize="small" /> : <PushPinOutlinedIcon fontSize="small" />}
        </IconButton>
        <IconButton size="small" onClick={handleColorClick} title="背景色を変更">
          <PaletteOutlinedIcon fontSize="small" />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <IconButton size="small" onClick={handleDelete} title="削除">
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>

      <Popper open={Boolean(colorAnchor)} anchorEl={colorAnchor} placement="bottom-start" style={{ zIndex: 1300 }}>
        <ClickAwayListener onClickAway={() => setColorAnchor(null)}>
          <Box
            sx={{
              bgcolor: "grey.900",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 0.5,
              mt: 0.5,
            }}
          >
            <ColorPicker value={note.color} onChange={handleColorChange} />
          </Box>
        </ClickAwayListener>
      </Popper>
    </Card>
  );
}
