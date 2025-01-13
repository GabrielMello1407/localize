import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  routes: { href: string; label: string; active: boolean }[];
  user: { name: string } | null;
  closeModal: () => void;
  handleLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  routes,
  user,
  closeModal,
  handleLogout,
}: MobileMenuProps) => {
  return (
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
  );
};

export default MobileMenu;
