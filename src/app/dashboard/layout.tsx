import { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for the application',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full ">{children}</div>;
}
