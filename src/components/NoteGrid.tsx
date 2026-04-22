"use client";

import { Dispatch } from "react";
import { Box, Typography } from "@mui/material";
import type { Note } from "../types/note";
import NoteCard from "./NoteCard";
import EmptyState from "./EmptyState";

type Action =
  | { type: "UPDATE"; id: string; patch: Partial<Note> }
  | { type: "DELETE"; id: string }
  | { type: "PIN"; id: string };

interface Props {
  notes: Note[];
  dispatch: Dispatch<Action>;
  onEdit: (id: string) => void;
}

function MasonryGrid({ notes, dispatch, onEdit }: Props) {
  return (
    <Box
      sx={{
        columnCount: { xs: 2, sm: 3, md: 4 },
        columnGap: "16px",
      }}
    >
      {notes.map((note) => (
        <Box key={note.id} sx={{ breakInside: "avoid", mb: 2 }}>
          <NoteCard note={note} dispatch={dispatch} onEdit={onEdit} />
        </Box>
      ))}
    </Box>
  );
}

export default function NoteGrid({ notes, dispatch, onEdit }: Props) {
  const pinned = notes.filter((n) => n.pinned);
  const unpinned = notes.filter((n) => !n.pinned);

  if (pinned.length === 0 && unpinned.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
      {pinned.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, mb: 1, display: "block" }}>
            固定済み
          </Typography>
          <MasonryGrid notes={pinned} dispatch={dispatch} onEdit={onEdit} />
        </Box>
      )}
      {unpinned.length > 0 && (
        <Box>
          {pinned.length > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: 1, mb: 1, display: "block" }}>
              その他
            </Typography>
          )}
          <MasonryGrid notes={unpinned} dispatch={dispatch} onEdit={onEdit} />
        </Box>
      )}
    </Box>
  );
}
