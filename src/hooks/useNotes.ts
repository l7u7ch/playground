"use client";

import { useReducer, useEffect, useMemo, useState } from "react";
import type { Note, NoteColor } from "../types/note";

type Action =
  | { type: "ADD"; note: Note }
  | { type: "UPDATE"; id: string; patch: Partial<Note> }
  | { type: "DELETE"; id: string }
  | { type: "PIN"; id: string };

function reducer(state: Note[], action: Action): Note[] {
  switch (action.type) {
    case "ADD":
      return [action.note, ...state];
    case "UPDATE":
      return state.map((n) => (n.id === action.id ? { ...n, ...action.patch, updatedAt: Date.now() } : n));
    case "DELETE":
      return state.filter((n) => n.id !== action.id);
    case "PIN":
      return state.map((n) => (n.id === action.id ? { ...n, pinned: !n.pinned } : n));
    default:
      return state;
  }
}

function init(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("kp_notes") ?? "[]");
  } catch {
    return [];
  }
}

export function useNotes() {
  const [notes, dispatch] = useReducer(reducer, [], init);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("kp_notes", JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.body.toLowerCase().includes(search.toLowerCase())
      ),
    [notes, search]
  );

  function addNote(title: string, body: string, color: NoteColor = "default") {
    const note: Note = {
      id: crypto.randomUUID(),
      title,
      body,
      color,
      pinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    dispatch({ type: "ADD", note });
  }

  return { notes, filteredNotes, dispatch, search, setSearch, addNote };
}
