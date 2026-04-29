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
			<body>{children}</body>
		</html>
	);
}
