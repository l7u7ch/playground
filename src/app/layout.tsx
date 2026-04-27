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
			<body>{children}</body>
		</html>
	);
}
