import { Providers } from './providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fairway',
  description: 'Golf activity tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
