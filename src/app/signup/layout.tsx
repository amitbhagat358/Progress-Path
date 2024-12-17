import { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Sign up | Progress Path',
  description: 'Sign up page for Progress Path',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full ">{children}</div>;
}
