import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/layout/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LenisProvider } from "@/components/layout/LenisProvider";

export const metadata: Metadata = {
  title: "Apurba Bhaumik | Full Stack Developer",
  description: "Computer Science Student & Full Stack Developer focusing on Data Structures & Algorithms, real-time systems, and AI-powered productivity tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`antialiased bg-background text-foreground selection:bg-accent selection:text-background min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider defaultTheme="dark">
          <LenisProvider>
            <CustomCursor />
            <Navbar />
            <main className="flex-grow">{children}</main>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
