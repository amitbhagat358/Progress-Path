import { Metadata } from 'next';
import './globals.css';
import { HighlightsProvider } from '@/app/context/HighlightsContext';
import { AcademicDataProvider } from '@/app/context/AcademicDataContext';
import { CodingDataProvider } from './context/CodingDataContext';
import { PersonalDataProvider } from './context/PersonalDataContext';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { LearningsProvider } from './context/LearningsContext';
import { DiaryContextProvider } from './context/DiaryContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';
import { UserContextProvider } from './context/userContext';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export const metadata: Metadata = {
  title: 'Progress Path',
  description: 'Manage Tasks and store memories for each day',
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
                          <Toaster position="top-center" />
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
