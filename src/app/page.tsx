import { UsersTable } from "@/components/UsersTable";
import { getDb } from "@/lib/db";
import { users } from "@/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
	const rows = await getDb().select().from(users);

	return (
		<main className="container mx-auto max-w-4xl p-6">
			<UsersTable rows={rows} />
		</main>
	);
}
