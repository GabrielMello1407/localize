/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import LoginFields from './LoginFields';
import ContactFields from './ContactFields';
import AddressFields from './AddressFields';
import TermsField from './TermsField';
import { signupUser } from '@/services/userService';
import { fetchCepData } from '@/services/cepService';
import { signupSchema } from '@/schemas/userSchema';

export default function RegistrationForm() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      cpf: '',
      whatsapp: '',
      address: '',
      state: '',
      city: '',
      houseNumber: 0,
      cep: '',
      birthDate: '',
      termsAccepted: false,
      neighborhood: '',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    setError('');
    setSuccess('');
    try {
      const response = await signupUser({ action: 'signup', ...data });
      console.log('Resposta da API:', response);

      if (response.status === 201) {
        setSuccess('Um link de confirmação foi enviado para o seu email.');
        toast.success('Um link de confirmação foi enviado para o seu email.');
        router.push('/entrar');
      } else {
        setError(response.data.error || 'Erro ao cadastrar usuário.');
      }
    } catch (err: any) {
      console.error('Erro ao enviar dados:', err);
      setError(err.response?.data?.error || 'Erro ao cadastrar usuário.');
    }
  };

  const handleCepSearch = async () => {
    const cepValue = form.getValues('cep');
    if (cepValue) {
      try {
        const data = await fetchCepData(cepValue);
        form.setValue('state', data.uf);
        form.setValue('city', data.localidade);
        form.setValue('address', data.logradouro);
        form.setValue('neighborhood', data.bairro);
        setError('');
      } catch (error) {
        setError('CEP inválido.');
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log('Erros no formulário:', errors);
        })}
        className="w-full max-w-4xl bg-white p-8 rounded shadow grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <LoginFields />
        <ContactFields />
        <AddressFields handleCepSearch={handleCepSearch} />
        <TermsField />
        <div className="col-span-3">
          <Button type="submit" variant={'localizeTwo'} className="w-full">
            Cadastrar
          </Button>
        </div>
        {error && <div className="text-red-500 mt-4 col-span-3">{error}</div>}
        {success && (
          <div className="text-green-500 mt-4 col-span-3">{success}</div>
        )}
      </form>
    </FormProvider>
  );
}
