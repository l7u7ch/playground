import { Box, Typography } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

export default function EmptyState() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pt: 12,
        gap: 2,
        color: "text.disabled",
      }}
    >
      <LightbulbOutlinedIcon sx={{ fontSize: 96 }} />
      <Typography variant="h6" color="text.disabled">
        メモはありません
      </Typography>
    </Box>
  );
}
