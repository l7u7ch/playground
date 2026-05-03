import { TodosView } from "@/components/TodosView";
import { getDb } from "@/inbox/db";
import { todos } from "@/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
	const rows = await getDb().select().from(todos).orderBy(todos.createdAt);

	return (
		<div className="min-h-screen py-12">
			<div className="mx-auto max-w-7xl rounded-sm p-6 shadow-md">
				<TodosView rows={rows} />
			</div>
		</div>
	);
}
