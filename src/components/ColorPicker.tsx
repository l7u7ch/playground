"use client";

import CheckIcon from "@mui/icons-material/Check";
import { Box, Tooltip } from "@mui/material";
import { NOTE_COLORS } from "../theme";
import type { NoteColor } from "../types/note";

const COLOR_LABELS: Record<NoteColor, string> = {
	default: "デフォルト",
	red: "赤",
	orange: "オレンジ",
	yellow: "黄",
	green: "緑",
	teal: "ティール",
	blue: "青",
	purple: "紫",
	pink: "ピンク",
	brown: "茶",
};

interface Props {
	value: NoteColor;
	onChange: (color: NoteColor) => void;
}

export default function ColorPicker({ value, onChange }: Props) {
	return (
		<Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", p: 0.5 }}>
			{(Object.keys(NOTE_COLORS) as NoteColor[]).map((color) => (
				<Tooltip key={color} title={COLOR_LABELS[color]} placement="top">
					<Box
						onClick={() => onChange(color)}
						sx={{
							width: 24,
							height: 24,
							borderRadius: "50%",
							bgcolor: NOTE_COLORS[color],
							border: "2px solid",
							borderColor: value === color ? "white" : "transparent",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							"&:hover": { borderColor: "grey.400" },
							transition: "border-color 0.15s",
						}}
					>
						{value === color && (
							<CheckIcon sx={{ fontSize: 14, color: "white" }} />
						)}
					</Box>
				</Tooltip>
			))}
		</Box>
	);
}
