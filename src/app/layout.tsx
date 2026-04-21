import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
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
    <html lang="ja">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
