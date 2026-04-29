"use client";

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
import { useState } from "react";
import { AddUserModal } from "@/components/AddUserModal";

type User = {
	id: number;
	name: string;
	age: number | null;
	email: string | null;
};

const columns: ColumnDef<User>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "名前",
	},
	{
		accessorKey: "age",
		header: "年齢",
		cell: ({ getValue }) => getValue() ?? "—",
	},
	{
		accessorKey: "email",
		header: "メール",
		cell: ({ getValue }) => getValue() ?? "—",
	},
];

export function UsersTable({ rows }: { rows: User[] }) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

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
					className="border px-3 py-1 rounded text-sm w-64"
				/>
				<AddUserModal />
			</div>

			<table className="w-full text-sm border-collapse">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									className="border px-4 py-2 text-left cursor-pointer select-none"
								>
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
									{header.column.getIsSorted() === "asc"
										? " ↑"
										: header.column.getIsSorted() === "desc"
											? " ↓"
											: " ⇅"}
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
					className="border px-3 py-1 rounded disabled:opacity-40"
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
					className="border px-3 py-1 rounded disabled:opacity-40"
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
					className="border px-2 py-1 rounded"
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
