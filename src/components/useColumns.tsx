"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import {
  ESTIMATE_ORDER,
  type Estimate,
  EstimateCell,
} from "@/components/EstimateCell";
import {
  PRIORITY_ORDER,
  type Priority,
  PriorityCell,
} from "@/components/PriorityCell";
import { STATUS_ORDER, type Status, StatusCell } from "@/components/StatusCell";

export type Todo = {
  id: number;
  title: string;
  status: Status;
  createdAt: Date;
  deadline: Date | null;
  priority: Priority;
  estimate: Estimate;
};

export const COLUMN_LABELS: Record<string, string> = {
  id: "ID",
  title: "タイトル",
  status: "ステータス",
  createdAt: "作成日時",
  priority: "優先度",
  deadline: "締め切り",
  estimate: "見積",
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

export function useColumns(showRelative: boolean): ColumnDef<Todo>[] {
  return useMemo<ColumnDef<Todo>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "title", header: "タイトル" },
      {
        accessorKey: "status",
        header: "ステータス",
        sortingFn: (rowA, rowB) =>
          STATUS_ORDER[rowA.original.status] -
          STATUS_ORDER[rowB.original.status],
        cell: ({ getValue, row }) => (
          <StatusCell id={row.original.id} status={getValue() as Status} />
        ),
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
        accessorKey: "estimate",
        header: "見積",
        sortingFn: (rowA, rowB) =>
          ESTIMATE_ORDER[rowA.original.estimate] -
          ESTIMATE_ORDER[rowB.original.estimate],
        cell: ({ getValue, row }) => (
          <EstimateCell
            id={row.original.id}
            estimate={getValue() as Estimate}
          />
        ),
      },
      {
        accessorKey: "deadline",
        header: "締め切り",
        cell: ({ getValue, row }) => {
          const v = getValue() as Date | null;
          if (!v) return "—";
          const isOverdue = v < new Date() && row.original.status !== "done";
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
}
