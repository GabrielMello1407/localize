'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RegistrationForm = dynamic(
  () => import('@/components/RegistrationForm/RegistrationForm'),
  {
    ssr: false,
  },
);

export default function Cadastrar() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Cadastrar</h1>
      <RegistrationForm />
      <p className="mt-4">
        Já possui conta?{' '}
        <span className="underline font-bold">
          <Link href="/entrar">Entre aqui!</Link>
        </span>
      </p>
    </div>
  );
}
