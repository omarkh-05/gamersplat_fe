"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { I18nProvider } from "@/hooks/useI18n";
import { RoleProvider } from "@/hooks/useRole";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollReset } from "@/components/ScrollReset";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const showFooter = !pathname.startsWith("/login");

  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        <I18nProvider>
          <RoleProvider>
            <ScrollReset />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              {showFooter && <Footer />}
            </div>
            <Toaster />
          </RoleProvider>
        </I18nProvider>
      </body>
    </html>
  );
}