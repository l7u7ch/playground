"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EditTodoModal } from "@/components/EditTodoModal";
import { TodosContextMenu } from "@/components/TodosContextMenu";
import { TodosToolbar } from "@/components/TodosToolbar";
import { type Todo, useColumns } from "@/components/useColumns";
import { deleteTodo } from "@/inbox/actions";

type ContextMenuState = { x: number; y: number; todoId: number };

export function TodosView({ rows }: { rows: Todo[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showRelative, setShowRelative] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, startDeleteTransition] = useTransition();

  useEffect(() => {
    const close = () => setContextMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const onToggleRelative = useCallback(
    () => setShowRelative((prev) => !prev),
    [],
  );
  const columns = useColumns(showRelative, onToggleRelative);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="space-y-4">
        <TodosToolbar
          globalFilter={globalFilter}
          onFilterChange={setGlobalFilter}
          table={table}
        />

        <table className="w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border px-4 py-2 text-left select-none"
                  >
                    <div className="flex items-center justify-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <span>
                        {header.column.getIsSorted() === "asc"
                          ? "↑"
                          : header.column.getIsSorted() === "desc"
                            ? "↓"
                            : "⇅"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenu({
                    x: e.clientX,
                    y: e.clientY,
                    todoId: row.original.id,
                  });
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {contextMenu && (
        <TodosContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onEdit={() => {
            const todo = rows.find((r) => r.id === contextMenu.todoId) ?? null;
            setEditingTodo(todo);
            setContextMenu(null);
          }}
          onDelete={() => {
            setPendingDeleteId(contextMenu.todoId);
            setContextMenu(null);
            setIsConfirmOpen(true);
          }}
        />
      )}

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          isOpen={editingTodo !== null}
          onClose={() => setEditingTodo(null)}
        />
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        isDeleting={isDeleting}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          if (pendingDeleteId === null) return;
          startDeleteTransition(async () => {
            await deleteTodo(pendingDeleteId);
            setIsConfirmOpen(false);
          });
        }}
      />
    </>
  );
}
