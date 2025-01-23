import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 text-gray-700 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <Image
              src={'/localize-logo.png'}
              alt="Localize Logo"
              width={350}
              height={350}
              className="h-auto"
              priority
            />
            <p className="mt-2 text-sm">
              Fazer eventos com pontos de vendas em um app ficou ainda mais
              fácil!
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-2">
            <Link href="/criar-evento" className="hover:underline">
              Criar Evento
            </Link>
            <Link href="/eventos" className="hover:underline">
              Eventos
            </Link>
            <Link href="/contato" className="hover:underline">
              Entrar em Contato
            </Link>
            <Link href="/perguntas-e-respostas" className="hover:underline">
              Perguntas e Respostas
            </Link>
            <Link href="/termos" className="hover:underline">
              Termos de Uso
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-2">
            <Link href="#" className="hover:underline flex gap-2">
              <Facebook />
              Facebook
            </Link>
            <Link href="#" className="hover:underline flex gap-2">
              <Instagram /> Instagram
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 text-center text-sm border-t border-gray-200 pt-4">
          <p>LOCALIZE EVENTOS LTDA | CNPJ: xxx.xxx.xxx/xxxx-xx</p>
          <p>
            Rua Paraná, 454 - Centro - Jacareziho PR - CEP: 86400-000 - Brasil
          </p>
          <p className="mt-2">
            2025 © Localize | Todos os direitos reservados | Desenvolvido por
            Gabriel Mello
          </p>
        </div>
      </div>
    </footer>
  );
}
