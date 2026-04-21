import { CssBaseline } from "@mui/material";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Pattern Generator",
  description: "Generate pronounceable random strings using consonant-vowel patterns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
