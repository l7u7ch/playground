"use client";

import { Button, Table } from "@heroui/react";
import { useOptimistic, useState, useTransition } from "react";
import { createUser, deleteUser, type User, updateUser } from "@/app/actions";
import { AddUserForm } from "@/components/add-user-form";
import { EditUserModal } from "@/components/edit-user-modal";

type OptimisticAction =
	| { type: "add"; user: User }
	| { type: "update"; user: User }
	| { type: "delete"; id: number };

interface Props {
	initialUsers: User[];
}

export function UserTable({ initialUsers }: Props) {
	const [optimisticUsers, addOptimistic] = useOptimistic(
		initialUsers,
		(state: User[], action: OptimisticAction) => {
			switch (action.type) {
				case "add":
					return [...state, action.user];
				case "update":
					return state.map((u) => (u.id === action.user.id ? action.user : u));
				case "delete":
					return state.filter((u) => u.id !== action.id);
			}
		},
	);

	const [, startTransition] = useTransition();
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [deletingId, setDeletingId] = useState<number | null>(null);

	async function handleAdd(formData: FormData) {
		const tempUser: User = {
			id: -Date.now(),
			name: String(formData.get("name") ?? ""),
			age:
				formData.get("age") && String(formData.get("age")).trim() !== ""
					? Number.parseInt(String(formData.get("age")), 10)
					: null,
			email:
				formData.get("email") && String(formData.get("email")).trim() !== ""
					? String(formData.get("email")).trim()
					: null,
		};
		startTransition(async () => {
			addOptimistic({ type: "add", user: tempUser });
			await createUser(formData);
		});
	}

	async function handleEdit(
		id: number,
		data: { name: string; age: number | null; email: string | null },
	) {
		const updated: User = { id, ...data };
		startTransition(async () => {
			addOptimistic({ type: "update", user: updated });
			await updateUser(id, data);
		});
	}

	function handleDeleteClick(id: number) {
		setDeletingId(id);
	}

	function handleDeleteConfirm() {
		if (deletingId === null) return;
		const id = deletingId;
		setDeletingId(null);
		startTransition(async () => {
			addOptimistic({ type: "delete", id });
			await deleteUser(id);
		});
	}

	function handleEditClick(user: User) {
		setEditingUser(user);
		setIsEditOpen(true);
	}

	return (
		<div>
			<AddUserForm onAdd={handleAdd} />

			{optimisticUsers.length === 0 ? (
				<p className="text-default-400 text-center py-8">
					ユーザーがいません。上のフォームから追加してください。
				</p>
			) : (
				<Table>
					<Table.ScrollContainer>
						<Table.Content aria-label="ユーザー一覧">
							<Table.Header>
								<Table.Column>名前</Table.Column>
								<Table.Column>年齢</Table.Column>
								<Table.Column>メール</Table.Column>
								<Table.Column>操作</Table.Column>
							</Table.Header>
							<Table.Body items={optimisticUsers}>
								{(user) => (
									<Table.Row key={user.id}>
										<Table.Cell>{user.name}</Table.Cell>
										<Table.Cell>{user.age ?? "—"}</Table.Cell>
										<Table.Cell>{user.email ?? "—"}</Table.Cell>
										<Table.Cell>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													onPress={() => handleEditClick(user)}
												>
													編集
												</Button>
												<Button
													variant="danger"
													size="sm"
													onPress={() => handleDeleteClick(user.id)}
												>
													削除
												</Button>
											</div>
										</Table.Cell>
									</Table.Row>
								)}
							</Table.Body>
						</Table.Content>
					</Table.ScrollContainer>
				</Table>
			)}

			<EditUserModal
				user={editingUser}
				isOpen={isEditOpen}
				onOpenChange={setIsEditOpen}
				onSave={handleEdit}
			/>

			{deletingId !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
					<div className="bg-content1 rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
						<h2 className="text-lg font-semibold mb-2">ユーザーを削除</h2>
						<p className="text-default-500 mb-6">
							このユーザーを削除しますか？この操作は取り消せません。
						</p>
						<div className="flex justify-end gap-3">
							<Button variant="ghost" onPress={() => setDeletingId(null)}>
								キャンセル
							</Button>
							<Button variant="danger" onPress={handleDeleteConfirm}>
								削除する
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
