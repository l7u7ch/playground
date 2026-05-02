import { TodosTable } from "@/components/TodosTable";
import { getDb } from "@/lib/db";
import { todos } from "@/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
	const rows = await getDb().select().from(todos).orderBy(todos.createdAt);

	return (
		<div className="min-h-screen py-12">
			<div className="mx-auto max-w-3xl shadow-md rounded-sm p-6">
				<TodosTable rows={rows} />
			</div>
		</div>
	);
}
