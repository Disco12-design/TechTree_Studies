import { Suspense } from "react";
import AppShell from "./components/AppShell";
import { ToasterProvider } from "./providers/ToasterProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <ToasterProvider />

        <Suspense fallback={null}>
          <AppShell>{children}</AppShell>
        </Suspense>
      </body>
    </html>
  );
}