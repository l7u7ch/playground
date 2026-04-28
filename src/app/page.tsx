import { UserTable } from "@/components/user-table";
import { db } from "@/lib/db";
import { users } from "@/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
	const allUsers = await db.select().from(users).orderBy(users.id);

	return (
		<main className="container mx-auto max-w-4xl p-6">
			<h1 className="text-2xl font-bold mb-6">ユーザー管理</h1>
			<UserTable initialUsers={allUsers} />
		</main>
	);
}
