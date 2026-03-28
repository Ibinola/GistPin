import type { ReactNode } from 'react';
import Providers from '@/app/providers';

export const metadata = {
  title: 'GistPin Analytics',
  description: 'Analytics dashboard with cached chart data.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, background: '#f8fafc' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
