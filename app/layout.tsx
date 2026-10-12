import type { Metadata } from "next";
import { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className="flex h-screen">
        <Suspense fallback={<div className="w-72 min-h-screen p-6 bg-brand-200" />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </body>
    </html>
  );
}