"use server";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { users } from "@/schema";

export async function addUser(formData: FormData) {
	const name = formData.get("name") as string;
	const ageRaw = formData.get("age");
	const email = (formData.get("email") as string) || null;

	await getDb()
		.insert(users)
		.values({
			name,
			age: ageRaw ? Number(ageRaw) : null,
			email,
		});

	revalidatePath("/");
}
