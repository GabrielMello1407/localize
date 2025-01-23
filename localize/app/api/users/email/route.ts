import { NextResponse } from 'next/server';
import { verifyToken } from '../route';
import jwt from 'jsonwebtoken';
import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt';

import { updateEmailSchema } from '@/schemas/userSchema';

export async function PATCH(req: Request) {
  const tokenVerification = await verifyToken(req);
  if (tokenVerification.status !== 200 || !tokenVerification.decoded) {
    return NextResponse.json(
      { error: tokenVerification.error },
      { status: tokenVerification.status },
    );
  }

  const userId = (tokenVerification.decoded as jwt.JwtPayload).userId;
  const body = await req.json();
  const result = updateEmailSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
      { status: 400 },
    );
  }

  const { currentEmail, newEmail, confirmNewEmail, password } = result.data;

  const user = await prismadb.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: 'Usuário não encontrado.' },
      { status: 404 },
    );
  }

  if (user.email !== currentEmail) {
    return NextResponse.json(
      { error: 'O email atual está incorreto.' },
      { status: 400 },
    );
  }

  if (newEmail !== confirmNewEmail) {
    return NextResponse.json(
      { error: 'Os novos emails não coincidem.' },
      { status: 400 },
    );
  }

  if (currentEmail === newEmail) {
    return NextResponse.json(
      { error: 'O novo email não pode ser o mesmo que o email atual.' },
      { status: 400 },
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'A senha atual está incorreta.' },
      { status: 401 },
    );
  }

  const existingUser = await prismadb.user.findUnique({
    where: { email: newEmail },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: 'O novo email já está em uso.' },
      { status: 400 },
    );
  }

  const updatedUser = await prismadb.user.update({
    where: { id: userId },
    data: { email: newEmail },
  });

  return NextResponse.json(
    { message: 'Email atualizado com sucesso!', user: updatedUser },
    { status: 200 },
  );
}
