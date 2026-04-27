import "@/app/globals.css";
import type { Metadata } from "next/types";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
	title: "MyApp",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja" className="dark">
			<body className="bg-background text-foreground">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
