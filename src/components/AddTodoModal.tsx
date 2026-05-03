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
import { addTodo } from "@/inbox/actions";

export function AddTodoModal() {
	const router = useRouter();

	return (
		<Modal>
			<Modal.Trigger>
				<Button variant="primary">ToDo を追加</Button>
			</Modal.Trigger>
			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog>
						{({ close }) => (
							<>
								<Modal.Header>
									<Modal.Heading>ToDo を追加</Modal.Heading>
								</Modal.Header>
								<Modal.Body>
									<Form
										id="add-todo-form"
										className="space-y-4"
										onSubmit={async (e) => {
											e.preventDefault();
											await addTodo(new FormData(e.currentTarget));
											router.refresh();
											close();
										}}
									>
										<TextField isRequired fullWidth>
											<Label>タイトル</Label>
											<Input name="title" placeholder="買い物に行く" />
											<FieldError />
										</TextField>
										<TextField fullWidth>
											<Label>締め切り</Label>
											<Input name="deadline" type="datetime-local" />
											<FieldError />
										</TextField>
										<div className="flex w-full flex-col gap-1">
											<label
												htmlFor="priority-select"
												className="text-sm font-medium"
											>
												優先度
											</label>
											<select
												id="priority-select"
												name="priority"
												defaultValue="medium"
												className="w-full rounded border px-3 py-2 text-sm"
											>
												<option value="critical">Critical</option>
												<option value="high">High</option>
												<option value="medium">Medium</option>
												<option value="low">Low</option>
												<option value="lowest">Lowest</option>
											</select>
										</div>
										<div className="flex w-full flex-col gap-1">
											<label
												htmlFor="estimate-select"
												className="text-sm font-medium"
											>
												見積
											</label>
											<select
												id="estimate-select"
												name="estimate"
												defaultValue=""
												className="w-full rounded border px-3 py-2 text-sm"
											>
												<option value="">未設定</option>
												<option value="xs">XS</option>
												<option value="s">S</option>
												<option value="m">M</option>
												<option value="l">L</option>
												<option value="xl">XL</option>
											</select>
										</div>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button slot="close">キャンセル</Button>
									<Button type="submit" form="add-todo-form" variant="primary">
										追加
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
