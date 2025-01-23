import type { Metadata } from 'next';
import './globals.css';
import { ModalProvider } from '@/providers/ModalProvider';
import { EventFilterProvider } from '@/providers/EventFilterProvider';
import Navbar from '@/components/navbar/navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';

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
      <body className="flex flex-col min-h-screen">
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
            <main className="flex-grow">{children}</main>
            <Footer />
          </EventFilterProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
