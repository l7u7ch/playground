import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next/types";

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
					<CssBaseline />
					{children}
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
