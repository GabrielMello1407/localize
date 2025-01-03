import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/providers/ModalProvider';
import { EventFilterProvider } from '@/providers/EventFilterProvider';
import Navbar from '@/components/navbar';

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
