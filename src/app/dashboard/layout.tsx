import { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for the application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full h-screen">
          <div className="text-2xl font-bold  p-5 border border-b-[#e5e7eb]">
            Progress Path
          </div>
          <div className="w-full ">{children}</div>
        </div>
      </body>
    </html>
  );
}
