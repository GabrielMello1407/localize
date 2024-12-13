import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

// POST: Criar um novo usuário
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Validação simples
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Todos os campos são obrigatórios.' },
      { status: 400 },
    );
  }

  // Criação do usuário
  const usuario = await prismadb.user.create({
    data: { name, email, password }, // Hash a senha com bcrypt antes de salvar!
  });

  return NextResponse.json(usuario, { status: 201 });
}

// GET: Buscar todos os usuários
export async function GET() {
  const users = await prismadb.user.findMany();
  return NextResponse.json(users);
}
