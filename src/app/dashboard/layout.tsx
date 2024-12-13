import { Metadata } from 'next';
import '../globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for the application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full ">{children}</div>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
