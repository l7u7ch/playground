"use client";

import { useTransition } from "react";
import { type Estimate, updateTodoEstimate } from "@/inbox/actions";

export type { Estimate };

const ESTIMATE_LABEL: Record<Estimate, string> = {
  xs: "XS",
  s: "S",
  m: "M",
  l: "L",
  xl: "XL",
};

export const ESTIMATE_ORDER: Record<Estimate, number> = {
  xs: 0,
  s: 1,
  m: 2,
  l: 3,
  xl: 4,
};

export const ESTIMATE_CLASS: Record<Estimate, string> = {
  xs: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  s: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  m: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  l: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  xl: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export function EstimateCell({
  id,
  estimate,
}: {
  id: number;
  estimate: Estimate;
}) {
  const [isPending, startTransition] = useTransition();
  const colorClass = ESTIMATE_CLASS[estimate];

  return (
    <select
      value={estimate}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as Estimate;
        startTransition(() => {
          updateTodoEstimate(id, next);
        });
      }}
      className={`cursor-pointer rounded border-0 px-2 py-0.5 text-xs font-medium disabled:opacity-50 ${colorClass}`}
    >
      {(Object.keys(ESTIMATE_LABEL) as Estimate[]).map((key) => (
        <option key={key} value={key}>
          {ESTIMATE_LABEL[key]}
        </option>
      ))}
    </select>
  );
}
