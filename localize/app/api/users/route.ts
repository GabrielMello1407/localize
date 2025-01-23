import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import {
  signupSchema,
  loginSchema,
  updateUserSchema,
  deleteUserSchema,
} from '@/schemas/userSchema';
import { z } from 'zod';

// Middleware for check token JWT
export async function verifyToken(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return { error: 'Token não fornecido.', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return { decoded, status: 200 };
  } catch {
    return { error: 'Token inválido ou expirado.', status: 401 };
  }
}

// New user creation
export async function POST(req: Request) {
  const body = await req.json();
  console.log('Dados recebidos pela API:', body);

  const actionSchema = z.object({
    action: z.enum(['signup', 'login']),
  });

  const actionResult = actionSchema.safeParse(body);

  if (!actionResult.success) {
    return NextResponse.json({ error: 'Ação inválida.' }, { status: 400 });
  }

  const { action } = actionResult.data;

  if (action === 'signup') {
    const result = signupSchema.safeParse(body);

    if (!result.success) {
      console.log('Erro de validação:', result.error.errors);
      return NextResponse.json(
        { error: 'Dados inválidos.', details: result.error.errors },
        { status: 400 },
      );
    }

    const {
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      cpf,
      whatsapp,
      address,
      state,
      city,
      neighborhood,
      houseNumber,
      cep,
      birthDate,
      termsAccepted,
    } = result.data;

    if (email !== confirmEmail) {
      return NextResponse.json(
        { error: 'Os e-mails não coincidem.' },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'As senhas não coincidem.' },
        { status: 400 },
      );
    }

    // Check if the email is already registered
    const existingUserByEmail = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'O e-mail já está cadastrado.' },
        { status: 400 },
      );
    }

    // Check if the CPF is already registered
    const existingUserByCpf = await prismadb.user.findUnique({
      where: { cpf },
    });

    if (existingUserByCpf) {
      return NextResponse.json(
        { error: 'Já existe uma conta vinculada a este CPF.' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        cpf,
        whatsapp,
        address,
        state,
        city,
        neighborhood,
        houseNumber,
        cep,
        birthDate: new Date(birthDate),
        termsAccepted,
        photoUrl: 'public/usuario.png',
      },
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    // Enviar email de confirmação
    const emailResponse = await fetch(
      `${process.env.BASE_URL}/api/users/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject: 'Confirmação de Email',
          message: `<p>Por favor, confirme seu email clicando no link abaixo:</p>
                    <a href="${process.env.BASE_URL}/api/users/confirm-email?token=${token}">Confirmar Email</a>`,
          token,
        }),
      },
    );

    if (!emailResponse.ok) {
      return NextResponse.json(
        { error: 'Erro ao enviar email de confirmação.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: 'Um link de confirmação foi enviado para o seu email.' },
      { status: 201 },
    );
  }

  if (action === 'login') {
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      console.log('Erro de validação:', result.error.errors);
      return NextResponse.json(
        { error: 'Dados inválidos.', details: result.error.errors },
        { status: 400 },
      );
    }

    const { email, password } = result.data;

    // Search user by email
    const user = await prismadb.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos.' },
        { status: 401 },
      );
    }

    // Verificar se o email foi confirmado
    if (!user.isEmailConfirmed) {
      return NextResponse.json(
        { error: 'Por favor, confirme seu email antes de fazer login.' },
        { status: 401 },
      );
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos.' },
        { status: 401 },
      );
    }

    // Generate the JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    );

    // Return response with token and user data
    return NextResponse.json(
      { message: 'Login realizado com sucesso!', token, user },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      error:
        'Ação inválida. Use "signup" para cadastro ou "login" para autenticação.',
    },
    { status: 400 },
  );
}

// Update user data
export async function PUT(req: Request) {
  const tokenVerification = await verifyToken(req);
  if (tokenVerification.status !== 200 || !tokenVerification.decoded) {
    return NextResponse.json(
      { error: tokenVerification.error },
      { status: tokenVerification.status },
    );
  }

  const userId = (tokenVerification.decoded as jwt.JwtPayload).userId;
  const body = await req.json();
  const result = updateUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
      { status: 400 },
    );
  }

  const updatedUser = await prismadb.user.update({
    where: { id: userId },
    data: result.data,
  });

  return NextResponse.json(
    { message: 'Dados atualizados com sucesso!', user: updatedUser },
    { status: 200 },
  );
}

// Delete user account
export async function DELETE(req: Request) {
  const tokenVerification = await verifyToken(req);
  if (tokenVerification.status !== 200 || !tokenVerification.decoded) {
    return NextResponse.json(
      { error: tokenVerification.error },
      { status: tokenVerification.status },
    );
  }

  const userId = (tokenVerification.decoded as jwt.JwtPayload).userId;
  const body = await req.json();
  const result = deleteUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
      { status: 400 },
    );
  }

  const { password, confirmDeletion } = result.data;

  if (!confirmDeletion) {
    return NextResponse.json(
      { error: 'Você deve confirmar a exclusão da conta.' },
      { status: 400 },
    );
  }

  const user = await prismadb.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado.' },
      { status: 404 },
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'A senha está incorreta.' },
      { status: 401 },
    );
  }

  // Verifique se o usuário criou algum evento com ingressos vendidos
  const userEvents = await prismadb.event.findMany({
    where: { creatorId: userId },
    include: {
      tickets: true,
    },
  });

  for (const event of userEvents) {
    if (event.tickets.length > 0) {
      return NextResponse.json(
        {
          error:
            'Você não pode excluir sua conta porque possui eventos com ingressos vendidos.',
        },
        { status: 400 },
      );
    }
  }

  // Apague os ingressos do usuário
  await prismadb.ticket.deleteMany({
    where: { userId },
  });

  // Apague a conta do usuário
  await prismadb.user.delete({
    where: { id: userId },
  });

  return NextResponse.json(
    { message: 'Conta excluída com sucesso!' },
    { status: 200 },
  );
}

// Get user data
export async function GET(req: Request) {
  const tokenVerification = await verifyToken(req);
  if (tokenVerification.status !== 200 || !tokenVerification.decoded) {
    return NextResponse.json(
      { error: tokenVerification.error },
      { status: tokenVerification.status },
    );
  }

  const userId = (tokenVerification.decoded as jwt.JwtPayload).userId;

  const user = await prismadb.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      whatsapp: true,
      cpf: true,
      address: true,
      state: true,
      houseNumber: true,
      cep: true,
      birthDate: true,
      city: true,
      neighborhood: true,
      photoUrl: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado.' },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const { token } = await req.json();

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;
    const email = decoded.email;

    const user = await prismadb.user.update({
      where: { email },
      data: { isEmailConfirmed: true },
    });

    return NextResponse.json(
      { message: 'Email confirmado com sucesso!', user },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Token inválido ou expirado.' },
      { status: 400 },
    );
  }
}
