import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskboard",
  description: "A small full-stack task manager — Next.js + FastAPI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
