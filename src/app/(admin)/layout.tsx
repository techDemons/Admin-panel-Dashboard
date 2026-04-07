"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pl-16 sm:pl-1 pr-6 sm:pt-0">
        <div className="mt-1 sm:ml-8 pr-16 ml-1 py-6 sm:px-10 lg:px-8 lg:py-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
