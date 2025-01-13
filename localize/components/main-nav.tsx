/* eslint-disable @typescript-eslint/no-unused-vars */
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
import axios from 'axios';
import UserDropdown from './user-dropdown';
import MobileMenu from './mobile-menu';

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
  const [filter, setFilter] = useState('');
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events?txt_busca=${filter}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    if (filter) {
      fetchEvents();
    }
  }, [filter]);

  const handleLogout = async () => {
    await clearLoginCookies();
    setUser(null);
    router.push('/entrar');
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    router.push(`/eventos?txt_busca=${newFilter}`);
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
            width={200}
            height={40}
            style={{ width: 'auto', height: 'auto' }}
            priority
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
          <EventFilter
            className="w-full max-w-4xl"
            filter={filter}
            setFilter={handleFilterChange}
          />
        </div>

        <div className="hidden lg:flex w-[400px] max-w-4xl justify-center mx-auto py-4">
          <EventFilter filter={filter} setFilter={handleFilterChange} />
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
            <UserDropdown
              user={user}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              handleLogout={handleLogout}
            />
          ) : (
            <Button variant={'localize'}>
              <Link href="/entrar">Login</Link>
            </Button>
          )}
        </div>
      </nav>

      <MobileMenu
        isOpen={isOpen}
        routes={routes}
        user={user}
        closeModal={closeModal}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default MainNav;
