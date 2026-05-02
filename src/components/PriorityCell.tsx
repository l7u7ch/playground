"use client";

import { useTransition } from "react";
import { updateTodoPriority } from "@/inbox/actions";

export type Priority = "critical" | "high" | "medium" | "low" | "lowest";

export const PRIORITY_ORDER: Record<Priority, number> = {
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

export const PRIORITY_CLASS: Record<Priority, string> = {
	critical: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
	high: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
	medium:
		"bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
	low: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
	lowest: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export function PriorityCell({
	id,
	priority,
}: {
	id: number;
	priority: Priority;
}) {
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
