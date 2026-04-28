"use client";

import { Button, Input, Label, Modal } from "@heroui/react";
import { useTransition } from "react";
import type { User } from "@/app/actions";

interface Props {
	user: User | null;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSave: (
		id: number,
		data: { name: string; age: number | null; email: string | null },
	) => Promise<void>;
}

export function EditUserModal({ user, isOpen, onOpenChange, onSave }: Props) {
	const [isPending, startTransition] = useTransition();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!user) return;
		const fd = new FormData(e.currentTarget);
		const name = String(fd.get("name") ?? "");
		const ageRaw = String(fd.get("age") ?? "");
		const emailRaw = String(fd.get("email") ?? "");
		const age = ageRaw.trim() !== "" ? Number.parseInt(ageRaw, 10) : null;
		const email = emailRaw.trim() !== "" ? emailRaw.trim() : null;

		startTransition(async () => {
			await onSave(user.id, { name, age, email });
			onOpenChange(false);
		});
	}

	return (
		<Modal>
			<Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
				<Modal.Container>
					<Modal.Dialog>
						<Modal.CloseTrigger />
						<Modal.Header>
							<Modal.Heading>ユーザーを編集</Modal.Heading>
						</Modal.Header>
						<Modal.Body>
							<form
								id="edit-user-form"
								key={user?.id}
								onSubmit={handleSubmit}
								className="flex flex-col gap-4"
							>
								<div className="flex flex-col gap-1">
									<Label htmlFor="edit-name" className="text-sm font-medium">
										名前 <span className="text-danger">*</span>
									</Label>
									<Input
										id="edit-name"
										name="name"
										type="text"
										defaultValue={user?.name ?? ""}
										required
										disabled={isPending}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<Label htmlFor="edit-age" className="text-sm font-medium">
										年齢
									</Label>
									<Input
										id="edit-age"
										name="age"
										type="number"
										defaultValue={user?.age?.toString() ?? ""}
										min={0}
										max={150}
										disabled={isPending}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<Label htmlFor="edit-email" className="text-sm font-medium">
										メール
									</Label>
									<Input
										id="edit-email"
										name="email"
										type="email"
										defaultValue={user?.email ?? ""}
										disabled={isPending}
									/>
								</div>
							</form>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="ghost"
								onPress={() => onOpenChange(false)}
								isDisabled={isPending}
							>
								キャンセル
							</Button>
							<Button
								type="submit"
								form="edit-user-form"
								variant="primary"
								isPending={isPending}
								isDisabled={isPending}
							>
								保存
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
