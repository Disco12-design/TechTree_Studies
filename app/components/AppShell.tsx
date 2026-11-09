"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { SidebarProvider } from "../providers/SidebarProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  return (
    <SidebarProvider>
      <div
        className={
          isAuthPage
            ? "min-h-dvh w-full"
            : "flex h-dvh w-full overflow-hidden"
        }
      >
        {!isAuthPage && <Sidebar />}
        <main
          className={`min-w-0 flex-1 overflow-y-auto bg-gray-50 ${
            isAuthPage ? "" : "min-h-0 pt-20 md:pt-0"
          }`}
        >
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
