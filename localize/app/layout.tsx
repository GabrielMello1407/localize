import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/providers/ModalProvider';
import { EventFilterProvider } from '@/providers/EventFilterProvider';
import Navbar from '@/components/navbar';
import { Toaster } from 'react-hot-toast';

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
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: 'green',
                color: 'white',
              },
            },
            error: {
              style: {
                background: 'red',
                color: 'white',
              },
            },
          }}
        />
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
