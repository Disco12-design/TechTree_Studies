import { ClerkProvider } from "@clerk/nextjs";
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
        <ClerkProvider signInUrl="/auth/signin" signUpUrl="/auth/signup">
          <ToasterProvider />

          <Suspense fallback={null}>
          <AppShell>{children}</AppShell>
          </Suspense>
        </ClerkProvider>
      </body>
    </html>
  );
}