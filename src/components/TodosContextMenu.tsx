interface TodosContextMenuProps {
  x: number;
  y: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function TodosContextMenu({
  x,
  y,
  onEdit,
  onDelete,
}: TodosContextMenuProps) {
  return (
    <div
      role="menu"
      className="fixed z-50 rounded border bg-white py-1 shadow-lg dark:bg-gray-900"
      style={{ top: y, left: x }}
    >
      <button
        type="button"
        role="menuitem"
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={onEdit}
      >
        編集
      </button>
      <button
        type="button"
        role="menuitem"
        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        onClick={onDelete}
      >
        削除
      </button>
    </div>
  );
}
