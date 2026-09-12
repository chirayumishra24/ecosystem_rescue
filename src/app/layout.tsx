import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/lib/gameStore";

export const metadata: Metadata = {
  title: "Ecosystem Rescue — Investigate. Solve. Restore.",
  description: "An interactive educational two-team web competition teaching students about microorganisms, food chains, food webs, and decomposition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased selection:bg-emerald-500 selection:text-white">
        <GameProvider>{children}</GameProvider>
      </body>
    </html>
  );
}
