"use client";

import { Box, Button, Divider, InputBase, Paper } from "@mui/material";
import { type Dispatch, useEffect, useRef, useState } from "react";
import { NOTE_COLORS } from "../theme";
import type { Note, NoteColor } from "../types/note";
import ColorPicker from "./ColorPicker";

type Action = { type: "ADD"; note: Note };

interface Props {
	dispatch: Dispatch<Action>;
}

export default function NoteCreator({ dispatch }: Props) {
	const [expanded, setExpanded] = useState(false);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [color, setColor] = useState<NoteColor>("default");
	const containerRef = useRef<HTMLDivElement>(null);

	function handleClose() {
		if (title.trim() || body.trim()) {
			const note: Note = {
				id: crypto.randomUUID(),
				title: title.trim(),
				body: body.trim(),
				color,
				pinned: false,
				createdAt: Date.now(),
				updatedAt: Date.now(),
			};
			dispatch({ type: "ADD", note });
		}
		setTitle("");
		setBody("");
		setColor("default");
		setExpanded(false);
	}

	useEffect(() => {
		if (!expanded) return;
		function handleMouseDown(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				handleClose();
			}
		}
		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	});

	return (
		<Box sx={{ display: "flex", justifyContent: "center", px: 2, py: 3 }}>
			<Paper
				ref={containerRef}
				elevation={3}
				sx={{
					width: "clamp(300px, 50%, 600px)",
					bgcolor: NOTE_COLORS[color],
					border: "1px solid",
					borderColor: "rgba(255,255,255,0.2)",
					borderRadius: 2,
				}}
			>
				{!expanded ? (
					<Box
						sx={{ px: 2, py: 1.5, cursor: "text" }}
						onClick={() => setExpanded(true)}
					>
						<InputBase
							fullWidth
							placeholder="メモを入力..."
							readOnly
							sx={{ pointerEvents: "none", color: "text.secondary" }}
						/>
					</Box>
				) : (
					<>
						<Box sx={{ px: 2, pt: 1.5 }}>
							<InputBase
								fullWidth
								placeholder="タイトル"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								inputProps={{ style: { fontWeight: "bold" } }}
								autoFocus
							/>
						</Box>
						<Box sx={{ px: 2, pb: 1 }}>
							<InputBase
								fullWidth
								multiline
								minRows={2}
								placeholder="メモを入力..."
								value={body}
								onChange={(e) => setBody(e.target.value)}
								sx={{ fontSize: "0.875rem" }}
							/>
						</Box>
						<Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
						<Box sx={{ display: "flex", alignItems: "center", px: 1, py: 0.5 }}>
							<ColorPicker value={color} onChange={setColor} />
							<Box sx={{ flex: 1 }} />
							<Button
								size="small"
								onClick={handleClose}
								sx={{ textTransform: "none" }}
							>
								閉じる
							</Button>
						</Box>
					</>
				)}
			</Paper>
		</Box>
	);
}
