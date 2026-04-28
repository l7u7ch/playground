import "@/app/globals.css";
import type { Metadata } from "next/types";

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
			<body className="min-h-screen bg-background text-foreground antialiased">
				{children}
			</body>
		</html>
	);
}
