import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/schema";

function fixConnectionUrl(url: string): string {
	try {
		new URL(url);
		return url;
	} catch {
		// Likely special characters (e.g. @, #) in password — re-encode the password part
		const protoMatch = url.match(/^(postgres(?:ql)?:\/\/)/);
		if (!protoMatch) return url;
		const proto = protoMatch[1];
		const rest = url.slice(proto.length);
		const lastAt = rest.lastIndexOf("@");
		if (lastAt === -1) return url;
		const credentials = rest.slice(0, lastAt);
		const hostPart = rest.slice(lastAt + 1);
		const firstColon = credentials.indexOf(":");
		if (firstColon === -1) return url;
		const user = credentials.slice(0, firstColon);
		const password = credentials.slice(firstColon + 1);
		return `${proto}${user}:${encodeURIComponent(password)}@${hostPart}`;
	}
}

const globalForDb = globalThis as unknown as { conn: postgres.Sql | undefined };

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

const conn =
	globalForDb.conn ??
	postgres(fixConnectionUrl(process.env.DATABASE_URL), {
		max: 10,
		idle_timeout: 20,
		connect_timeout: 30,
	});

if (process.env.NODE_ENV !== "production") {
	globalForDb.conn = conn;
}

export const db = drizzle(conn, { schema });
