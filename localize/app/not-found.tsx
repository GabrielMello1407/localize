'use client';
import { Frown } from 'lucide-react';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold">404 - Página não encontrada</h1>
      <p className="text-2xl mt-4">
        Desculpe, mas a página que você procura não está disponível.
      </p>
      <div className="mt-6">
        <Frown color="#f78835" size={80} />
      </div>
    </div>
  );
};

export default NotFound;
