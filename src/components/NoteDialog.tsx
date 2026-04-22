"use client";

import { useState, Dispatch } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  InputBase,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { NOTE_COLORS } from "../theme";
import type { Note } from "../types/note";
import ColorPicker from "./ColorPicker";

type Action = { type: "UPDATE"; id: string; patch: Partial<Note> };

interface Props {
  note: Note;
  dispatch: Dispatch<Action>;
  onClose: () => void;
}

export default function NoteDialog({ note, dispatch, onClose }: Props) {
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);
  const [color, setColor] = useState(note.color);

  function handleClose() {
    const changed = title !== note.title || body !== note.body || color !== note.color;
    if (changed) {
      dispatch({ type: "UPDATE", id: note.id, patch: { title, body, color } });
    }
    onClose();
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            bgcolor: NOTE_COLORS[color],
            border: "1px solid",
            borderColor: "rgba(255,255,255,0.15)",
            borderRadius: 2,
          },
        },
      }}
    >
      <DialogContent sx={{ pb: 0 }}>
        <InputBase
          fullWidth
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ style: { fontWeight: "bold", fontSize: "1rem" } }}
          sx={{ mb: 1 }}
        />
        <InputBase
          fullWidth
          multiline
          minRows={3}
          placeholder="メモを入力..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          sx={{ fontSize: "0.875rem" }}
        />
      </DialogContent>
      <Divider sx={{ mt: 1, borderColor: "rgba(255,255,255,0.12)" }} />
      <DialogActions sx={{ px: 2, py: 1, justifyContent: "space-between" }}>
        <ColorPicker value={color} onChange={setColor} />
        <Button size="small" onClick={handleClose} sx={{ textTransform: "none" }}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
