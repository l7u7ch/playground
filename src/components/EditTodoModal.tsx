"use client";
import {
	Button,
	FieldError,
	Form,
	Input,
	Label,
	Modal,
	TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import type { Todo } from "@/components/useColumns";
import { updateTodo } from "@/inbox/actions";

interface EditTodoModalProps {
	todo: Todo;
	isOpen: boolean;
	onClose: () => void;
}

export function EditTodoModal({ todo, isOpen, onClose }: EditTodoModalProps) {
	const router = useRouter();
	const deadlineDefault = todo.deadline
		? new Date(todo.deadline).toISOString().slice(0, 16)
		: "";

	return (
		<Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog>
						{({ close }) => (
							<>
								<Modal.Header>
									<Modal.Heading>ToDo を編集</Modal.Heading>
								</Modal.Header>
								<Modal.Body>
									<Form
										id="edit-todo-form"
										className="space-y-4"
										onSubmit={async (e) => {
											e.preventDefault();
											await updateTodo(todo.id, new FormData(e.currentTarget));
											router.refresh();
											close();
											onClose();
										}}
									>
										<TextField isRequired fullWidth defaultValue={todo.title}>
											<Label>タイトル</Label>
											<Input name="title" placeholder="買い物に行く" />
											<FieldError />
										</TextField>
										<TextField fullWidth defaultValue={deadlineDefault}>
											<Label>締め切り</Label>
											<Input name="deadline" type="datetime-local" />
											<FieldError />
										</TextField>
										<div className="flex w-full flex-col gap-1">
											<label
												htmlFor="edit-priority-select"
												className="text-sm font-medium"
											>
												優先度
											</label>
											<select
												id="edit-priority-select"
												name="priority"
												defaultValue={todo.priority}
												className="w-full rounded border px-3 py-2 text-sm"
											>
												<option value="critical">Critical</option>
												<option value="high">High</option>
												<option value="medium">Medium</option>
												<option value="low">Low</option>
												<option value="lowest">Lowest</option>
											</select>
										</div>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button
										slot="close"
										onPress={() => {
											close();
											onClose();
										}}
									>
										キャンセル
									</Button>
									<Button type="submit" form="edit-todo-form" variant="primary">
										保存
									</Button>
								</Modal.Footer>
							</>
						)}
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
}
