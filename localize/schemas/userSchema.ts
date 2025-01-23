import { z } from 'zod';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { differenceInYears } from 'date-fns';

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  confirmEmail: z.string().email({ message: 'Email inválido.' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres.' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número.',
    ),
  confirmPassword: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres.' }),
  cpf: z.string().refine((cpf) => cpfValidator.isValid(cpf), 'CPF inválido.'),
  whatsapp: z.string(),
  address: z.string(),
  state: z.string(),
  city: z.string(),
  houseNumber: z
    .number()
    .int({ message: 'Número da casa deve ser um número inteiro.' }),
  cep: z.string(),
  birthDate: z.string().refine((date) => {
    const birthDate = new Date(date);
    return differenceInYears(new Date(), birthDate) >= 18;
  }, 'Você deve ter pelo menos 18 anos para criar uma conta.'),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos de uso.'),
  neighborhood: z.string(),
  isEmailConfirmed: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido.' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter pelo menos 8 caracteres.' }),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .regex(/[A-Z]/, 'A senha deve ter pelo menos uma letra maiúscula.')
      .regex(/[a-z]/, 'A senha deve ter pelo menos uma letra minúscula.')
      .regex(/[0-9]/, 'A senha deve ter pelo menos um número.'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmNewPassword'],
  });

export const updateEmailSchema = z.object({
  currentEmail: z.string().email(),
  newEmail: z.string().email(),
  confirmNewEmail: z.string().email(),
  password: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  whatsapp: z.string().optional(),
  cpf: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  houseNumber: z.number().optional(),
  cep: z.string().optional(),
  birthDate: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  photoUrl: z.string().optional(),
});

export const deleteUserSchema = z.object({
  password: z.string({ message: 'Senha inválida.' }),
  confirmDeletion: z.boolean({ message: 'Confirmação de exclusão inválida.' }),
});
