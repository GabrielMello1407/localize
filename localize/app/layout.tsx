import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Localize',
  description: 'Seu evento há dois cliques!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
