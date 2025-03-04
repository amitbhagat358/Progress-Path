import { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import SessionProvider from "@/components/SessionProvider";

// export const metadata: Metadata = {
//   title: "Progress Path",
//   description: "Manage Tasks and store memories for each day",
// };

import type { Viewport } from "next";

const APP_NAME = "Progress Path";
const APP_DEFAULT_TITLE = "Progress Path";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Personal Tracking App";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0, 0%, 100%)" }, // Light mode
    { media: "(prefers-color-scheme: dark)", color: "hsl(0, 0%, 9%)" }, // Dark mode
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppSidebar />
              {children}
              <Toaster
                position="top-center"
                className="toaster group"
                toastOptions={{
                  classNames: {
                    toast:
                      "group toast group-[.toaster]:bg-background group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton:
                      "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                      "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                    error: "bg-red-100 text-red-500 border border-red-400",
                    success:
                      "bg-green-100 text-primary border border-green-400",
                    warning:
                      "bg-yellow-100 text-yellow-500 border border-yellow-400",
                    info: "bg-blue-100 text-blue-500 border border-blue-400",
                  },
                }}
              />
              <SpeedInsights />
            </ThemeProvider>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
