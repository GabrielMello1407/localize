import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const secretKey = 'secret_key';

const userSchema = z.object({
  action: z.enum(['signup', 'login']),
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

// Middleware for check token JWT
async function verifyToken(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return { error: 'Token não fornecido.', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    return { decoded, status: 200 };
  } catch {
    return { error: 'Token inválido ou expirado.', status: 401 };
  }
}

// New user creation
export async function POST(req: Request) {
  const body = await req.json();
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
      { status: 400 },
    );
  }

  const { action, name, email, password } = result.data;

  if (!action) {
    return NextResponse.json(
      { error: 'Ação (action) não especificada.' },
      { status: 400 },
    );
  }

  // User registration (signup)
  if (action === 'signup') {
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios para cadastro.' },
        { status: 400 },
      );
    }

    // Check if the email is already registered
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'O e-mail já está cadastrado.' },
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
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  }

  // Existing user login
  if (action === 'login') {
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios para login.' },
        { status: 400 },
      );
    }

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

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos.' },
        { status: 401 },
      );
    }

    // Generate the JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
      expiresIn: '1h',
    });

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

// Search all users
export async function GET(req: Request) {
  const tokenVerification = await verifyToken(req);
  if (tokenVerification.status !== 200) {
    return NextResponse.json(
      { error: tokenVerification.error },
      { status: tokenVerification.status },
    );
  }

  const users = await prismadb.user.findMany({
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json(users);
}
