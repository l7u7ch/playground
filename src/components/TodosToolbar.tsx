"use client";

import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { AddTodoModal } from "@/components/AddTodoModal";
import { COLUMN_LABELS, type Todo } from "@/components/useColumns";

interface TodosToolbarProps {
  globalFilter: string;
  onFilterChange: (value: string) => void;
  table: Table<Todo>;
}

export function TodosToolbar({
  globalFilter,
  onFilterChange,
  table,
}: TodosToolbarProps) {
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="検索..."
        className="w-64 rounded border px-3 py-1 text-sm"
      />
      <AddTodoModal />
      <div className="relative ml-auto">
        <button
          type="button"
          onClick={() => setShowColumnMenu((prev) => !prev)}
          className="rounded border px-3 py-1 text-sm"
        >
          カラム ▾
        </button>
        {showColumnMenu && (
          <div className="absolute right-0 z-10 mt-1 rounded border bg-white p-2 shadow dark:bg-gray-900">
            {table.getAllColumns().map((column) => (
              <label
                key={column.id}
                className="flex cursor-pointer items-center gap-2 px-2 py-1 text-sm"
              >
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
                {COLUMN_LABELS[column.id] ?? column.id}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
