import Navbar from '@/components/Navbar';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-4xl font-bold">Welcome to Localize</h1>
        <p className="mt-4">Discover local events near you!</p>
      </main>
    </div>
  );
}
