"use client";

import { ToggleButton } from "@heroui/react";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { AddTodoModal } from "@/components/AddTodoModal";

type Todo = {
	id: number;
	title: string;
	completed: boolean;
	createdAt: Date;
	deadline: Date | null;
};

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
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [showRelative, setShowRelative] = useState(false);

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
		state: { sorting, globalFilter, pagination },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
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

			<div className="flex items-center gap-4 text-sm">
				<button
					type="button"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="rounded border px-3 py-1 disabled:opacity-40"
				>
					前へ
				</button>
				<span>
					{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
				</span>
				<button
					type="button"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="rounded border px-3 py-1 disabled:opacity-40"
				>
					次へ
				</button>
				<select
					value={pagination.pageSize}
					onChange={(e) =>
						setPagination((prev) => ({
							...prev,
							pageIndex: 0,
							pageSize: Number(e.target.value),
						}))
					}
					className="rounded border px-2 py-1"
				>
					{[10, 20, 50].map((size) => (
						<option key={size} value={size}>
							{size} 件
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
