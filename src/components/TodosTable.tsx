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
import { deleteTodo } from "@/app/actions";
import { AddTodoModal } from "@/components/AddTodoModal";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { EditTodoModal } from "@/components/EditTodoModal";
import { COLUMN_LABELS, type Todo, useColumns } from "@/components/useColumns";

type ContextMenuState = { x: number; y: number; todoId: number };

export function TodosTable({ rows }: { rows: Todo[] }) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [showRelative, setShowRelative] = useState(false);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [showColumnMenu, setShowColumnMenu] = useState(false);
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
				<div className="flex items-center gap-4">
					<input
						type="text"
						value={globalFilter}
						onChange={(e) => setGlobalFilter(e.target.value)}
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
				<div
					role="menu"
					className="fixed z-50 rounded border bg-white py-1 shadow-lg dark:bg-gray-900"
					style={{ top: contextMenu.y, left: contextMenu.x }}
				>
					<button
						type="button"
						role="menuitem"
						className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
						onClick={() => {
							const todo =
								rows.find((r) => r.id === contextMenu.todoId) ?? null;
							setEditingTodo(todo);
							setContextMenu(null);
						}}
					>
						編集
					</button>
					<button
						type="button"
						role="menuitem"
						className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
						onClick={() => {
							setPendingDeleteId(contextMenu.todoId);
							setContextMenu(null);
							setIsConfirmOpen(true);
						}}
					>
						削除
					</button>
				</div>
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
