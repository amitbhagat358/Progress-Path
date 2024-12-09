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
        <div className="h-screen">
          <div className="text-2xl font-bold mb-5 p-5 bg-[#222831] text-white">
            Progress Path
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
