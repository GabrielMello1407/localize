import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const secretKey = 'secret_key';

// New user creation
export async function POST(req: Request) {
  const { action, name, email, password } = await req.json();

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

    //Check if the email is already registered
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

    // Return response with token
    return NextResponse.json(
      { message: 'Login realizado com sucesso!', token },
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
export async function GET() {
  const users = await prismadb.user.findMany({
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json(users);
}
