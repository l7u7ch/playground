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
import { addTodo } from "@/app/actions";

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
