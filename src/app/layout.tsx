import type { Metadata } from "next";
import "./globals.css";
import { ShellLayout } from "@/components/layout/ShellLayout";

export const metadata: Metadata = {
  title: "Echo OS // Mr. Skyblue",
  description:
    "Personal hub, fiction universe, and lab of Adam (Mr. Skyblue).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ShellLayout>{children}</ShellLayout>
      </body>
    </html>
  );
}
