import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import AuthSessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArkLab AI Agents Catalog",
  description: "Explore a categorized list of AI agents by ArkLab.",
  keywords: ["AI", "agents", "artificial intelligence", "catalog", "ArkLab"],
  authors: [{ name: "ArkLab" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
