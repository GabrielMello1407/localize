'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNav = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const routes = [
    {
      href: '/',
      label: 'Página Inicial',
      active: pathname === '/',
    },
    {
      href: '/eventos',
      label: 'Eventos',
      active: pathname === '/eventos',
    },
    {
      href: '/painel-de-controle',
      label: 'Painel de controle',
      active: pathname === '/painel-de-controle',
    },
  ];
  return (
    <nav
      className={cn(
        'flex flex-col lg:flex-row lg:justify-center items-center lg:space-x-12 space-y-4 lg:space-y-0 mb-2',
        className,
      )}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium relative transition-colors',
            route.active
              ? 'text-[#025213] font-bold'
              : 'text-[#14812C] hover:text-[#025213]',
          )}
          style={{ textDecoration: 'none' }}
        >
          {route.label}
          <span
            className="absolute left-1/2 bottom-0 h-[2px] bg-[#025213] transition-all duration-300 ease-in-out transform -translate-x-1/2 origin-center"
            style={{
              width: route.active ? '100%' : '0',
            }}
          />
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
