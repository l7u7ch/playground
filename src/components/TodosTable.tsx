"use client";

import { ToggleButton } from "@heroui/react";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState, useTransition } from "react";
import { updateTodoPriority } from "@/app/actions";
import { AddTodoModal } from "@/components/AddTodoModal";

type Priority = "critical" | "high" | "medium" | "low" | "lowest";

type Todo = {
	id: number;
	title: string;
	completed: boolean;
	createdAt: Date;
	deadline: Date | null;
	priority: Priority;
};

const COLUMN_LABELS: Record<string, string> = {
	id: "ID",
	title: "タイトル",
	completed: "完了",
	createdAt: "作成日時",
	priority: "優先度",
	deadline: "締め切り",
};

const PRIORITY_ORDER: Record<Priority, number> = {
	critical: 0,
	high: 1,
	medium: 2,
	low: 3,
	lowest: 4,
};

const PRIORITY_LABEL: Record<Priority, string> = {
	critical: "Critical",
	high: "High",
	medium: "Medium",
	low: "Low",
	lowest: "Lowest",
};

const PRIORITY_CLASS: Record<Priority, string> = {
	critical: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
	high: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
	medium:
		"bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
	low: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
	lowest: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

function PriorityCell({ id, priority }: { id: number; priority: Priority }) {
	const [isPending, startTransition] = useTransition();
	return (
		<select
			value={priority}
			disabled={isPending}
			onChange={(e) => {
				const next = e.target.value as Priority;
				startTransition(() => {
					updateTodoPriority(id, next);
				});
			}}
			className={`cursor-pointer rounded border-0 px-2 py-0.5 text-xs font-medium disabled:opacity-50 ${PRIORITY_CLASS[priority]}`}
		>
			{(Object.keys(PRIORITY_LABEL) as Priority[]).map((key) => (
				<option key={key} value={key}>
					{PRIORITY_LABEL[key]}
				</option>
			))}
		</select>
	);
}

function formatRelativeTime(date: Date): string {
	const diffMs = date.getTime() - Date.now();
	const sign = diffMs >= 0 ? "+" : "-";
	const abs = Math.abs(diffMs);

	const totalMinutes = Math.floor(abs / 60_000);
	const days = Math.floor(totalMinutes / 1440);
	const hours = Math.floor((totalMinutes % 1440) / 60);
	const minutes = totalMinutes % 60;

	if (days > 0 && hours > 0) return `${sign}${days}日${hours}時間`;
	if (days > 0) return `${sign}${days}日`;
	if (hours > 0 && minutes > 0) return `${sign}${hours}時間${minutes}分`;
	if (hours > 0) return `${sign}${hours}時間`;
	if (minutes > 0) return `${sign}${minutes}分`;
	return "±0分";
}

export function TodosTable({ rows }: { rows: Todo[] }) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [showRelative, setShowRelative] = useState(false);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [showColumnMenu, setShowColumnMenu] = useState(false);

	const columns = useMemo<ColumnDef<Todo>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
			},
			{
				accessorKey: "title",
				header: "タイトル",
			},
			{
				accessorKey: "completed",
				header: "完了",
				cell: ({ getValue }) => (getValue() ? "✓" : "—"),
			},
			{
				accessorKey: "createdAt",
				header: "作成日時",
				cell: ({ getValue }) => (getValue() as Date).toLocaleString("ja-JP"),
			},
			{
				accessorKey: "priority",
				header: "優先度",
				sortingFn: (rowA, rowB) =>
					PRIORITY_ORDER[rowA.original.priority] -
					PRIORITY_ORDER[rowB.original.priority],
				cell: ({ getValue, row }) => (
					<PriorityCell
						id={row.original.id}
						priority={getValue() as Priority}
					/>
				),
			},
			{
				accessorKey: "deadline",
				header: () => (
					<>
						<ToggleButton
							size="sm"
							onClick={(e) => {
								e.stopPropagation();
								setShowRelative((prev) => !prev);
							}}
						>
							{showRelative ? "A" : "B"}
						</ToggleButton>
						締め切り
					</>
				),
				cell: ({ getValue, row }) => {
					const v = getValue() as Date | null;
					if (!v) return "—";
					const isOverdue = v < new Date() && !row.original.completed;
					const text = showRelative
						? formatRelativeTime(v)
						: v.toLocaleString("ja-JP");
					return isOverdue ? (
						<span className="inline-flex items-center gap-1">🔴 {text}</span>
					) : (
						text
					);
				},
			},
		],
		[showRelative],
	);

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
						<tr key={row.id}>
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
	);
}
