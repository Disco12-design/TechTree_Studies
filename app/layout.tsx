import { Suspense } from "react";
import Sidebar from "./components/Sidebar";
import { ToasterProvider } from "./providers/ToasterProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-dvh overflow-hidden">
        <ToasterProvider />

        <Suspense
          fallback={
            <>
              {/* Mobile: top bar placeholder */}
              <div className="fixed inset-x-0 top-0 z-30 h-20 border-b border-brand-300 bg-brand-200 md:hidden" />
              {/* Desktop: sidebar placeholder */}
              <div className="hidden h-dvh w-72 shrink-0 bg-brand-200 md:block" />
            </>
          }
        >
          <Sidebar />
        </Suspense>

        {/* pt-20 clears the mobile top bar (h-20); removed on desktop */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-gray-50 pt-20 md:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}