import { TodoList } from "@/components/todo-list";
import { createClient } from "@/lib/supabase-server";

export default async function Home() {
	const supabase = await createClient();
	const { data: todos } = await supabase
		.from("todos")
		.select("*")
		.order("created_at", { ascending: true });

	return (
		<main className="min-h-screen p-8 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">ToDo リスト</h1>
			<TodoList initialTodos={todos ?? []} />
		</main>
	);
}
