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
import { addUser } from "@/app/actions";

export function AddUserModal() {
	const router = useRouter();

	return (
		<Modal>
			<Modal.Trigger>
				<Button variant="primary">ユーザーを追加</Button>
			</Modal.Trigger>
			<Modal.Backdrop>
				<Modal.Container>
					<Modal.Dialog>
						{({ close }) => (
							<>
								<Modal.Header>
									<Modal.Heading>ユーザーを追加</Modal.Heading>
								</Modal.Header>
								<Modal.Body>
									<Form
										id="add-user-form"
										className="space-y-4"
										onSubmit={async (e) => {
											e.preventDefault();
											await addUser(new FormData(e.currentTarget));
											router.refresh();
											close();
										}}
									>
										<TextField isRequired fullWidth>
											<Label>名前</Label>
											<Input name="name" placeholder="山田太郎" />
											<FieldError />
										</TextField>
										<TextField fullWidth>
											<Label>年齢</Label>
											<Input name="age" type="number" placeholder="30" />
										</TextField>
										<TextField fullWidth>
											<Label>メール</Label>
											<Input
												name="email"
												type="email"
												placeholder="example@email.com"
											/>
											<FieldError />
										</TextField>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button slot="close">キャンセル</Button>
									<Button type="submit" form="add-user-form" variant="primary">
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
