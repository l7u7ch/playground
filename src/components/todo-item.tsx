import { Button } from "@heroui/react/button";
import { Card, CardContent } from "@heroui/react/card";
import {
	Checkbox,
	CheckboxContent,
	CheckboxControl,
	CheckboxIndicator,
} from "@heroui/react/checkbox";
import type { Todo } from "@/types/todo";

type Props = {
	todo: Todo;
	onToggle: (id: string, is_done: boolean) => void;
	onDelete: (id: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete }: Props) {
	return (
		<Card>
			<CardContent className="flex flex-row items-center justify-between px-4 py-3">
				<Checkbox
					isSelected={todo.is_done}
					onChange={(isSelected) => onToggle(todo.id, isSelected)}
				>
					<CheckboxControl>
						<CheckboxIndicator />
					</CheckboxControl>
					<CheckboxContent>
						<span className={todo.is_done ? "line-through opacity-50" : ""}>
							{todo.text}
						</span>
					</CheckboxContent>
				</Checkbox>
				<Button
					variant="ghost"
					isIconOnly
					size="sm"
					onPress={() => onDelete(todo.id)}
					aria-label="削除"
				>
					✕
				</Button>
			</CardContent>
		</Card>
	);
}
