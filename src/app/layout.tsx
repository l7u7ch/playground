import type { Metadata } from "next/types";
import "@/app/globals.css";

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
			<body>{children}</body>
		</html>
	);
}
