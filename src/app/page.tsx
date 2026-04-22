"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNotes } from "../hooks/useNotes";
import AppHeader from "../components/AppHeader";
import NoteCreator from "../components/NoteCreator";
import NoteGrid from "../components/NoteGrid";
import NoteDialog from "../components/NoteDialog";

export default function Home() {
  const { filteredNotes, dispatch, search, setSearch } = useNotes();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editingNote = editingId ? filteredNotes.find((n) => n.id === editingId) ?? null : null;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppHeader search={search} setSearch={setSearch} />
      <NoteCreator dispatch={dispatch} />
      {mounted && (
        <NoteGrid
          notes={filteredNotes}
          dispatch={dispatch}
          onEdit={setEditingId}
        />
      )}
      {editingNote && (
        <NoteDialog
          note={editingNote}
          dispatch={dispatch}
          onClose={() => setEditingId(null)}
        />
      )}
    </Box>
  );
}
