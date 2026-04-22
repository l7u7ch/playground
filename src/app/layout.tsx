import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Metadata } from "next/types";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "MyApp",
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
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
