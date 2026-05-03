"use client";

import { useTransition } from "react";
import { updateTodoStatus } from "@/inbox/actions";

export type Status = "todo" | "doing" | "done";

const STATUS_LABEL: Record<Status, string> = {
	todo: "ToDo",
	doing: "Doing",
	done: "Done",
};

export const STATUS_CLASS: Record<Status, string> = {
	todo: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
	doing: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
	done: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
};

export function StatusCell({ id, status }: { id: number; status: Status }) {
	const [isPending, startTransition] = useTransition();
	return (
		<select
			value={status}
			disabled={isPending}
			onChange={(e) => {
				const next = e.target.value as Status;
				startTransition(() => {
					updateTodoStatus(id, next);
				});
			}}
			className={`cursor-pointer rounded border-0 px-2 py-0.5 text-xs font-medium disabled:opacity-50 ${STATUS_CLASS[status]}`}
		>
			{(Object.keys(STATUS_LABEL) as Status[]).map((key) => (
				<option key={key} value={key}>
					{STATUS_LABEL[key]}
				</option>
			))}
		</select>
	);
}
