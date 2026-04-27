"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	return (
		<RouterProvider navigate={router.push}>
			<ThemeProvider attribute="class" defaultTheme="dark">
				{children}
			</ThemeProvider>
		</RouterProvider>
	);
}
