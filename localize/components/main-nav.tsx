'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useModal } from '@/providers/ModalProvider';
import EventFilter from './event-filter';

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const { isOpen, openModal, closeModal } = useModal();

  const routes = [
    {
      href: '/eventos',
      label: 'Eventos',
      active: pathname === '/eventos',
    },
    {
      href: '/entrar-em-contato',
      label: 'Entrar em contato',
      active: pathname === '/entrar-em-contato',
    },
    {
      href: '/criar-evento',
      label: 'Criar Evento',
      active: pathname === '/criar-evento',
    },
  ];

  return (
    <>
      <nav
        className={cn(
          'flex flex-wrap lg:flex-nowrap items-center justify-between bg-gray-900 text-white px-6 py-4 relative',
          className,
        )}
      >
        <Link href={'/'}>
          <Image
            alt="Logo"
            src="/localize-logo.png"
            width={120}
            height={40}
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <Button
          variant={'menu'}
          onClick={isOpen ? closeModal : openModal}
          aria-label="Abrir menu"
        >
          <Menu />
        </Button>
        <div className="lg:hidden w-full bg-gray-900 py-4 flex justify-center mx-auto">
          <EventFilter className="w-full max-w-4xl" />
        </div>

        <div className="hidden lg:flex w-[400px] max-w-4xl justify-center mx-auto py-4">
          <EventFilter />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'relative text-lg font-semibold transition-colors duration-300',
                route.active
                  ? 'text-orange-500'
                  : 'text-white hover:text-blue-400',
              )}
              style={{ textDecoration: 'none' }}
            >
              {route.label}
              <span
                className={cn(
                  'absolute left-0 bottom-[-4px] h-[2px] bg-orange-500 transition-all duration-300',
                  route.active ? 'w-full' : 'w-0',
                )}
              />
            </Link>
          ))}
          <Button variant={'localize'}>Login</Button>
        </div>
      </nav>

      <div
        className={cn(
          'absolute top-[170px] left-0 w-full bg-gray-800 shadow-lg rounded-md overflow-hidden transition-all duration-500 ease-in-out lg:hidden',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        )}
        style={{
          transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
        }}
      >
        <div className="flex flex-col items-start p-4 gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-base font-medium transition-colors duration-300',
                route.active
                  ? 'text-orange-500'
                  : 'text-white hover:text-blue-400',
              )}
              onClick={closeModal}
            >
              {route.label}
            </Link>
          ))}
          <Button variant={'localize'} className="w-full" onClick={closeModal}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainNav;
