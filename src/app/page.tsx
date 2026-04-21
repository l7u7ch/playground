"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { generateStrings, PatternType } from "../lib/cvGenerator";

export default function Home() {
  const [length, setLength] = useState<number>(8);
  const [pattern, setPattern] = useState<PatternType>("cv");
  const [count, setCount] = useState<number>(5);
  const [results, setResults] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function handleGenerate() {
    setResults(generateStrings(pattern, length, count));
    setCopiedIndex(null);
  }

  function handleCopy(text: string, index: number) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 560, width: "100%", p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          CV Pattern Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          子音（C）と母音（V）のパターンで発音しやすいランダム文字列を生成します。
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          パターン
        </Typography>
        <ToggleButtonGroup
          value={pattern}
          exclusive
          onChange={(_, val) => val && setPattern(val)}
          size="small"
          sx={{ mb: 3, flexWrap: "wrap", gap: 0.5 }}
        >
          {(["cv", "vc", "cvc", "vcv", "cvcc", "ccvc"] as PatternType[]).map((p) => (
            <ToggleButton key={p} value={p} sx={{ fontFamily: "monospace", fontWeight: "bold" }}>
              {p.toUpperCase()}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          文字数: {length}
        </Typography>
        <Slider
          min={2}
          max={24}
          step={1}
          value={length}
          onChange={(_, val) => setLength(val as number)}
          marks
          sx={{ mb: 3 }}
        />

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          生成数: {count}
        </Typography>
        <Slider min={1} max={20} step={1} value={count} onChange={(_, val) => setCount(val as number)} sx={{ mb: 3 }} />

        <Button variant="contained" size="large" fullWidth onClick={handleGenerate}>
          Generate
        </Button>

        {results.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {results.map((r, i) => (
                <Paper
                  key={i}
                  variant="outlined"
                  sx={{
                    px: 2,
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontFamily="monospace" fontSize={16} letterSpacing={1}>
                    {r}
                  </Typography>
                  <IconButton size="small" onClick={() => handleCopy(r, i)}>
                    {copiedIndex === i ? (
                      <CheckIcon fontSize="small" color="success" />
                    ) : (
                      <ContentCopyIcon fontSize="small" />
                    )}
                  </IconButton>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
