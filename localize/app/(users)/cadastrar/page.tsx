/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setLoginCookies } from '../../actions/action';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter pelo menos 6 caracteres.' }),
});

export default function Cadastrar() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setError('');
    setSuccess('');

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'signup', ...data }),
    });

    const result = await response.json();

    if (response.ok) {
      setSuccess('Usuário cadastrado com sucesso!');
      await setLoginCookies(result.user, result.token);
      router.push('/entrar');
    } else {
      setError(result.error || 'Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Cadastrar</h1>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 rounded shadow"
        >
          <div className="mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      required
                      className="mb-4"
                      placeholder="Digite seu nome completo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      required
                      className="mb-4"
                      placeholder="Digite seu email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      required
                      className="mb-4"
                      placeholder="Digite sua senha"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" variant={'localizeTwo'}>
            Cadastrar
          </Button>
        </form>
        {error && (
          <FormMessage className="text-red-500 mt-4">{error}</FormMessage>
        )}
        {success && (
          <FormMessage className="text-green-500 mt-4">{success}</FormMessage>
        )}
      </FormProvider>
      <p className="mt-4">
        Já possui conta?{' '}
        <span className="underline font-bold">
          <Link href="/entrar">Entre aqui!</Link>
        </span>
      </p>
    </div>
  );
}
