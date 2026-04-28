"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { users } from "@/schema";

export type User = {
	id: number;
	name: string;
	age: number | null;
	email: string | null;
};

type ActionResult<T = void> =
	| { success: true; data: T }
	| { success: false; error: string };

export async function createUser(
	formData: FormData,
): Promise<ActionResult<User>> {
	const name = formData.get("name");
	if (!name || typeof name !== "string" || name.trim() === "") {
		return { success: false, error: "名前は必須です" };
	}

	const ageRaw = formData.get("age");
	const age =
		ageRaw && typeof ageRaw === "string" && ageRaw.trim() !== ""
			? Number.parseInt(ageRaw, 10)
			: null;

	const emailRaw = formData.get("email");
	const email =
		emailRaw && typeof emailRaw === "string" && emailRaw.trim() !== ""
			? emailRaw.trim()
			: null;

	try {
		const [user] = await db
			.insert(users)
			.values({ name: name.trim(), age, email })
			.returning();
		revalidatePath("/");
		return { success: true, data: user };
	} catch {
		return { success: false, error: "ユーザーの作成に失敗しました" };
	}
}

export async function updateUser(
	id: number,
	data: { name: string; age: number | null; email: string | null },
): Promise<ActionResult<User>> {
	if (!data.name.trim()) {
		return { success: false, error: "名前は必須です" };
	}

	try {
		const [user] = await db
			.update(users)
			.set({ name: data.name.trim(), age: data.age, email: data.email })
			.where(eq(users.id, id))
			.returning();
		revalidatePath("/");
		return { success: true, data: user };
	} catch {
		return { success: false, error: "ユーザーの更新に失敗しました" };
	}
}

export async function deleteUser(id: number): Promise<ActionResult> {
	try {
		await db.delete(users).where(eq(users.id, id));
		revalidatePath("/");
		return { success: true, data: undefined };
	} catch {
		return { success: false, error: "ユーザーの削除に失敗しました" };
	}
}
