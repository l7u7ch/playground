export type NoteColor =
  | "default"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "purple"
  | "pink"
  | "brown";

export interface Note {
  id: string;
  title: string;
  body: string;
  color: NoteColor;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
}
