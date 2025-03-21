import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Alder-App",
  description: "The fastest way to build AEC apps.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            {/* Top Nav Stays Centered */}
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-xl">
                <div className="flex gap-5 items-center font-bold">
                  <Link href={"/"}>Alder-App</Link>
                </div>
                <ThemeSwitcher />
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>

            {/* Full Screen Dashboard Layout */}
            <div className="flex flex-1 w-full">
              {children}
            </div>

            {/* Footer */}
            <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
              <p>
                Copyright 2025 | Powered by{" "}
                <a
                  href="https://alder.systems"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Alder PLLC
                </a>
              </p>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
