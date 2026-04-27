"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

export default function Home() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [input, setInput] = useState("");

	const addTodo = () => {
		const text = input.trim();
		if (!text) return;
		setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
		setInput("");
	};

	const toggleTodo = (id: number) => {
		setTodos((prev) =>
			prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
		);
	};

	const deleteTodo = (id: number) => {
		setTodos((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<div className="flex min-h-svh items-center justify-center">
			<div className="w-full max-w-md space-y-4 p-6">
				<h1 className="text-2xl font-bold">ToDoリスト</h1>

				<div className="flex gap-2">
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && addTodo()}
						placeholder="新しいタスクを入力..."
					/>
					<Button onClick={addTodo}>追加</Button>
				</div>

				<ul className="space-y-2">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className="flex items-center gap-3 rounded-md border px-3 py-2"
						>
							<Checkbox
								checked={todo.completed}
								onCheckedChange={() => toggleTodo(todo.id)}
							/>
							<span
								className={`flex-1 ${todo.completed ? "text-muted-foreground line-through" : ""}`}
							>
								{todo.text}
							</span>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => deleteTodo(todo.id)}
							>
								<Trash2 className="size-4" />
							</Button>
						</li>
					))}
				</ul>

				{todos.length === 0 && (
					<p className="text-muted-foreground text-center text-sm">
						タスクはありません
					</p>
				)}
			</div>
		</div>
	);
}
