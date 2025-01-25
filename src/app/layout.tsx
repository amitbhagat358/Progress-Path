import { Metadata } from "next";
import "./globals.css";
import { HighlightsProvider } from "@/app/context/HighlightsContext";
import { AcademicDataProvider } from "@/app/context/AcademicDataContext";
import { CodingDataProvider } from "./context/CodingDataContext";
import { PersonalDataProvider } from "./context/PersonalDataContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LearningsProvider } from "./context/LearningsContext";
import { DiaryContextProvider } from "./context/DiaryContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { UserContextProvider } from "./context/userContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export const metadata: Metadata = {
  title: "Progress Path",
  description: "Manage Tasks and store memories for each day",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserContextProvider>
        <AcademicDataProvider>
          <CodingDataProvider>
            <PersonalDataProvider>
              <HighlightsProvider>
                <LearningsProvider>
                  <DiaryContextProvider>
                    <body>
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
                                description:
                                  "group-[.toast]:text-muted-foreground",
                                actionButton:
                                  "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                                cancelButton:
                                  "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                                error:
                                  "bg-red-100 text-red-500 border border-red-400",
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
                    </body>
                  </DiaryContextProvider>
                </LearningsProvider>
              </HighlightsProvider>
            </PersonalDataProvider>
          </CodingDataProvider>
        </AcademicDataProvider>
      </UserContextProvider>
    </html>
  );
}
