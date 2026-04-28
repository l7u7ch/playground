import { getDb } from "@/lib/db";
import { users } from "@/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
	const rows = await getDb().select().from(users);

	return (
		<main className="container mx-auto max-w-4xl p-6">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>名前</th>
						<th>年齢</th>
						<th>メール</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((user) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.age ?? "—"}</td>
							<td>{user.email ?? "—"}</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
}
