import { useState } from 'react';
import {
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginFields() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="col-span-3">
        <h2 className="text-xl font-bold mb-4">Dados de Login</h2>
      </div>
      <div className="col-span-1">
        <FormField
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite seu CPF"
                  autoComplete="cpf"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Digite seu email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Email:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Confirme seu email"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha:</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    autoComplete="new-password"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-2 hover:bg-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-1">
        <FormField
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha:</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirme sua senha"
                    autoComplete="new-password"
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
