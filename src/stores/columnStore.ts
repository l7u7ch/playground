import type { VisibilityState } from "@tanstack/react-table";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ColumnStore = {
  columnVisibility: VisibilityState;
  setColumnVisibility: (
    updater: VisibilityState | ((prev: VisibilityState) => VisibilityState),
  ) => void;
};

export const useColumnStore = create<ColumnStore>()(
  persist(
    (set, get) => ({
      columnVisibility: {},
      setColumnVisibility: (updater) =>
        set({
          columnVisibility:
            typeof updater === "function"
              ? updater(get().columnVisibility)
              : updater,
        }),
    }),
    { name: "todo-column-visibility" },
  ),
);
