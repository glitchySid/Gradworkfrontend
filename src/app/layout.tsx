import type { Metadata } from "next";
import "./globals.css";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";

export const metadata: Metadata = {
  title: "GradWork - Freelance Platform",
  description: "Connect with opportunities that match your skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TanstackQueryProvider>
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
