"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format, intervalToDuration } from "date-fns";
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
  updatedAt: Date;
  deadline: Date | null;
  priority: Priority;
  estimate: Estimate;
};

export const COLUMN_LABELS: Record<string, string> = {
  id: "ID",
  title: "タイトル",
  status: "ステータス",
  createdAt: "作成日時",
  updatedAt: "更新日時",
  priority: "優先度",
  deadline: "締め切り",
  estimate: "見積",
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const sign = date >= now ? "+" : "-";
  const [start, end] = date >= now ? [now, date] : [date, now];
  const { days = 0, hours = 0, minutes = 0 } = intervalToDuration({
    start,
    end,
  });

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
      { accessorKey: "title", header: "タイトル" },
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
      {
        accessorKey: "createdAt",
        header: "作成日時",
        cell: ({ getValue }) => format(getValue() as Date, "yyyy-MM-dd HH:mm"),
      },
      {
        accessorKey: "updatedAt",
        header: "更新日時",
        cell: ({ getValue }) => format(getValue() as Date, "yyyy-MM-dd HH:mm"),
      },
    ],
    [showRelative],
  );
}
