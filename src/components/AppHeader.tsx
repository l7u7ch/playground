"use client";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SearchBar from "./SearchBar";

interface Props {
  search: string;
  setSearch: (v: string) => void;
}

export default function AppHeader({ search, setSearch }: Props) {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "background.default", borderBottom: "1px solid", borderColor: "divider" }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 120 }}>
          <LightbulbOutlinedIcon sx={{ color: "warning.main" }} />
          <Typography variant="h6" sx={{ letterSpacing: -0.5, fontWeight: "bold" }}>
            Keep
          </Typography>
        </Box>
        <SearchBar value={search} onChange={setSearch} />
        <Box sx={{ minWidth: 120 }} />
      </Toolbar>
    </AppBar>
  );
}
