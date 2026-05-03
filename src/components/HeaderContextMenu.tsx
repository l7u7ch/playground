interface HeaderContextMenuProps {
  x: number;
  y: number;
  onSortAsc: () => void;
  onSortDesc: () => void;
  onClearSort: () => void;
  isDeadlineColumn?: boolean;
  showRelative?: boolean;
  onToggleRelative?: () => void;
}

export function HeaderContextMenu({
  x,
  y,
  onSortAsc,
  onSortDesc,
  onClearSort,
  isDeadlineColumn,
  showRelative,
  onToggleRelative,
}: HeaderContextMenuProps) {
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
        onClick={onSortAsc}
      >
        ↑ 昇順
      </button>
      <button
        type="button"
        role="menuitem"
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={onSortDesc}
      >
        ↓ 降順
      </button>
      <button
        type="button"
        role="menuitem"
        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={onClearSort}
      >
        ⇅ ソートを解除
      </button>
      {isDeadlineColumn && onToggleRelative && (
        <>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            type="button"
            role="menuitem"
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={onToggleRelative}
          >
            {showRelative ? "絶対表示に切替" : "相対表示に切替"}
          </button>
        </>
      )}
    </div>
  );
}
