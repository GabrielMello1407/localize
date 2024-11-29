import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import { ModalProvider } from '@/providers/ModalProvider';
import { EventFilterProvider } from '@/providers/EventFilterProvider';

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
      <body>
        <ModalProvider>
          <EventFilterProvider>
            <Navbar />
            {children}
          </EventFilterProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
