import type { Metadata } from "next";
import "./globals.css";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "GradWork - Freelance Platform",
  description: "Connect with opportunities that match your skills",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            <TanstackQueryProvider>
              <ClientProviders>
                {children}
              </ClientProviders>
            </TanstackQueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
