"use client";

import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputBase } from "@mui/material";

interface Props {
	value: string;
	onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				bgcolor: "rgba(255,255,255,0.08)",
				borderRadius: 3,
				px: 2,
				py: 0.5,
				flex: 1,
				maxWidth: 720,
				"&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
				"&:focus-within": { bgcolor: "rgba(255,255,255,0.14)" },
				transition: "background-color 0.2s",
			}}
		>
			<SearchIcon sx={{ color: "text.secondary", mr: 1, flexShrink: 0 }} />
			<InputBase
				fullWidth
				placeholder="メモを検索"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				sx={{ fontSize: "0.9rem" }}
			/>
			{value && (
				<IconButton size="small" onClick={() => onChange("")} edge="end">
					<CloseIcon fontSize="small" />
				</IconButton>
			)}
		</Box>
	);
}
