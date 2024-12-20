import { Metadata } from 'next';
import './globals.css';
import { HighlightsProvider } from '@/app/dashboard/summary/[date]/context/HighlightsContext';
import { AcademicDataProvider } from './dashboard/summary/[date]/context/AcademicDataContext';
import { CodingDataProvider } from './dashboard/summary/[date]/context/CodingDataContext';
import { PersonalDataProvider } from './dashboard/summary/[date]/context/PersonalDataContext';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { LearningsProvider } from './dashboard/summary/[date]/context/LearningsContext';
import { DiaryContextProvider } from './dashboard/summary/[date]/context/DiaryContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';
import { UserContextProvider } from './context/userContext';

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
    <html lang="en">
      <UserContextProvider>
        <AcademicDataProvider>
          <CodingDataProvider>
            <PersonalDataProvider>
              <HighlightsProvider>
                <LearningsProvider>
                  <DiaryContextProvider>
                    <body>
                      {/* <ThemeProvider
                  attribute="class"
                  // defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                > */}
                      {children}
                      <Toaster position="top-center" />
                      <SpeedInsights />
                      {/* </ThemeProvider> */}
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
