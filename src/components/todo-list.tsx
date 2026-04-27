"use client";

import { useOptimistic, useTransition } from "react";
import { addTodo, deleteTodo, toggleTodo } from "@/app/actions";
import type { Todo } from "@/types/todo";
import { AddTodoForm } from "./add-todo-form";
import { TodoItem } from "./todo-item";

type Props = {
	initialTodos: Todo[];
};

export function TodoList({ initialTodos }: Props) {
	const [optimisticTodos, updateOptimistic] = useOptimistic(initialTodos);
	const [, startTransition] = useTransition();

	function handleAdd(text: string) {
		const tempTodo: Todo = {
			id: crypto.randomUUID(),
			text,
			is_done: false,
			created_at: new Date().toISOString(),
		};
		startTransition(async () => {
			updateOptimistic((todos) => [...todos, tempTodo]);
			await addTodo(text);
		});
	}

	function handleToggle(id: string, is_done: boolean) {
		startTransition(async () => {
			updateOptimistic((todos) =>
				todos.map((t) => (t.id === id ? { ...t, is_done } : t)),
			);
			await toggleTodo(id, is_done);
		});
	}

	function handleDelete(id: string) {
		startTransition(async () => {
			updateOptimistic((todos) => todos.filter((t) => t.id !== id));
			await deleteTodo(id);
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<AddTodoForm onAdd={handleAdd} />
			<div className="flex flex-col gap-2">
				{optimisticTodos.map((todo) => (
					<TodoItem
						key={todo.id}
						todo={todo}
						onToggle={handleToggle}
						onDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}
