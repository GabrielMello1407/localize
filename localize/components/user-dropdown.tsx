import Link from 'next/link';
import { Button } from './ui/button';

interface UserDropdownProps {
  user: { name: string };
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const UserDropdown = ({
  user,
  dropdownOpen,
  setDropdownOpen,
  handleLogout,
}: UserDropdownProps) => {
  return (
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
  );
};

export default UserDropdown;
