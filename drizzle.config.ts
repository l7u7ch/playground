import { defineConfig } from "drizzle-kit";

function parseDbUrl(url: string) {
	const protoEnd = url.indexOf("://") + 3;
	const urlBody = url.slice(protoEnd);
	const lastAt = urlBody.lastIndexOf("@");
	const credentials = urlBody.slice(0, lastAt);
	const hostPart = urlBody.slice(lastAt + 1);
	const firstColon = credentials.indexOf(":");
	const user = credentials.slice(0, firstColon);
	const password = credentials.slice(firstColon + 1);
	const pathStart = hostPart.indexOf("/");
	const hostAndPort =
		pathStart === -1 ? hostPart : hostPart.slice(0, pathStart);
	const dbAndQuery = pathStart === -1 ? "" : hostPart.slice(pathStart + 1);
	const lastColon = hostAndPort.lastIndexOf(":");
	const host = lastColon === -1 ? hostAndPort : hostAndPort.slice(0, lastColon);
	const port =
		lastColon === -1
			? 5432
			: Number.parseInt(hostAndPort.slice(lastColon + 1), 10);
	const database = dbAndQuery.split("?")[0] || "postgres";
	const ssl = /ssl=require|sslmode=require/.test(dbAndQuery);
	return { host, port, user, password, database, ssl };
}

const rawUrl = process.env.DATABASE_URL ?? "";
const db = rawUrl ? parseDbUrl(rawUrl) : null;

export default defineConfig({
	schema: "./src/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: db
		? {
				host: db.host,
				port: db.port,
				user: db.user,
				password: db.password,
				database: db.database,
				ssl: db.ssl,
			}
		: { url: "" },
});
