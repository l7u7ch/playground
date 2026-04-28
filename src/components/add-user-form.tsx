"use client";

import { Button, Input, Label } from "@heroui/react";
import { useTransition } from "react";

interface Props {
	onAdd: (formData: FormData) => Promise<void>;
}

export function AddUserForm({ onAdd }: Props) {
	const [isPending, startTransition] = useTransition();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const fd = new FormData(form);
		form.reset();
		startTransition(async () => {
			await onAdd(fd);
		});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-wrap items-end gap-3 mb-6 p-4 rounded-lg border border-default-200 bg-default-50"
		>
			<div className="flex flex-col gap-1">
				<Label htmlFor="name" className="text-sm font-medium">
					名前 <span className="text-danger">*</span>
				</Label>
				<Input
					id="name"
					name="name"
					type="text"
					placeholder="田中 太郎"
					required
					disabled={isPending}
					className="w-44"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="age" className="text-sm font-medium">
					年齢
				</Label>
				<Input
					id="age"
					name="age"
					type="number"
					placeholder="30"
					min={0}
					max={150}
					disabled={isPending}
					className="w-24"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="email" className="text-sm font-medium">
					メール
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="tanaka@example.com"
					disabled={isPending}
					className="w-56"
				/>
			</div>
			<Button
				type="submit"
				variant="primary"
				isPending={isPending}
				isDisabled={isPending}
			>
				追加
			</Button>
		</form>
	);
}
