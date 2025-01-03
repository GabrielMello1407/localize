'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useModal } from '@/providers/ModalProvider';
import EventFilter from './event-filter';
import { clearLoginCookies, getLoginCookies } from '@/app/actions/action';

interface User {
  name: string;
}

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  isLoggedIn: boolean;
  userName: string | null;
}

const MainNav = ({ className, isLoggedIn, userName }: MainNavProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getLoginCookies();
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [isLoggedIn, userName]);

  const handleLogout = async () => {
    await clearLoginCookies();
    setUser(null);
    router.push('/entrar');
  };

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
            width={260}
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
          {user ? (
            <div className="relative">
              <Button
                variant={'localize'}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.name}
              </Button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link
                    href="/minha-conta"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Minha Conta
                  </Link>
                  <Link
                    href="/meus-ingressos"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Meus Ingressos
                  </Link>
                  <Link
                    href="/criar-evento"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Criar Eventos
                  </Link>
                  <Link
                    href="/meus-eventos"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Meus Eventos
                  </Link>
                  <Button
                    variant={'default'}
                    onClick={handleLogout}
                    className="block font-medium w-full text-left px-4 py-2 bg-white text-gray-800 hover:bg-gray-200 border-none"
                  >
                    Sair
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button variant={'localize'}>
              <Link href="/entrar">Login</Link>
            </Button>
          )}
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
          {user && (
            <>
              <Link
                href="/minha-conta"
                className="block text-white hover:text-blue-400 transition-colors duration-300"
                onClick={closeModal}
              >
                Minha Conta
              </Link>
              <Link
                href="/meus-ingressos"
                className="block text-white hover:text-blue-400 transition-colors duration-300"
                onClick={closeModal}
              >
                Meus Ingressos
              </Link>
              <Link
                href="/meus-eventos"
                className="block text-white hover:text-blue-400 transition-colors duration-300"
                onClick={closeModal}
              >
                Meus Eventos
              </Link>
              <Button
                onClick={handleLogout}
                className="block text-white bg-[#F58733] hover:text-blue-400 transition-colors duration-300 w-[100px]"
              >
                Sair
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MainNav;
