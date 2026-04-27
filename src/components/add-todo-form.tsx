"use client";

import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { useRef } from "react";

type Props = {
	onAdd: (text: string) => void;
};

export function AddTodoForm({ onAdd }: Props) {
	const ref = useRef<HTMLInputElement>(null);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const text = ref.current?.value.trim();
		if (!text) return;
		onAdd(text);
		if (ref.current) ref.current.value = "";
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2">
			<Input ref={ref} placeholder="タスクを入力..." className="flex-1" />
			<Button type="submit" variant="primary">
				追加
			</Button>
		</form>
	);
}
