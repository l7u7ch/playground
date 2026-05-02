"use client";

import { Button } from "@heroui/react";

interface ConfirmDialogProps {
	isOpen: boolean;
	isDeleting: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

export function ConfirmDialog({
	isOpen,
	isDeleting,
	onCancel,
	onConfirm,
}: ConfirmDialogProps) {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
			<div className="w-80 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900">
				<h2 className="mb-2 text-base font-semibold">削除の確認</h2>
				<p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
					本当に削除しますか？
				</p>
				<div className="flex justify-end gap-2">
					<button
						type="button"
						className="rounded border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
						onClick={onCancel}
					>
						キャンセル
					</button>
					<Button variant="danger" isDisabled={isDeleting} onPress={onConfirm}>
						{isDeleting ? "削除中..." : "削除"}
					</Button>
				</div>
			</div>
		</div>
	);
}
