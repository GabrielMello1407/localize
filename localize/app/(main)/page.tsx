'use client';
import EventGroup from '@/components/events/event-group';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Home() {
  const [events, setEvents] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    const message = searchParams.get('message');

    if (token) {
      const confirmEmail = async () => {
        try {
          const response = await axios.patch('/api/users/confirm-email', {
            token,
          });
          toast.success(response.data.message);
          router.push('/');
        } catch (error) {
          toast.error('Erro ao confirmar email.');
        }
      };

      confirmEmail();
    }

    if (message) {
      toast.success(message);
    }
  }, [searchParams, router]);

  return (
    <div className="flex justify-center min-h-screen">
      <main className="justify-center container text-center flex-grow">
        <h1 className="text-4xl font-bold">Bem vindo a Localize</h1>
        <p className="mt-4">Procure eventos para você!</p>
        <EventGroup events={events} />
      </main>
    </div>
  );
}
