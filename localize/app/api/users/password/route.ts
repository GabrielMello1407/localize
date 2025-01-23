import { NextResponse } from 'next/server';
import { verifyToken } from '../route';
import { updatePasswordSchema } from '@/schemas/userSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';

export async function PATCH(req: Request) {
  const tokenVerification = await verifyToken(req);
  if (tokenVerification.status !== 200 || !tokenVerification.decoded) {
    console.log('Token verification failed:', tokenVerification.error);
    return NextResponse.json(
      { error: tokenVerification.error },
      { status: tokenVerification.status },
    );
  }

  const userId = (tokenVerification.decoded as jwt.JwtPayload).userId;
  const body = await req.json();
  console.log('Request body:', body);
  const result = updatePasswordSchema.safeParse(body);

  if (!result.success) {
    console.log('Password schema validation failed:', result.error.errors);
    return NextResponse.json(
      { error: 'Dados inválidos.', details: result.error.errors },
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

  const isPasswordValid = await bcrypt.compare(
    result.data.currentPassword,
    user.password,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'Senha atual incorreta.' },
      { status: 401 },
    );
  }

  const hashedPassword = await bcrypt.hash(result.data.newPassword, 10);

  const updatedUser = await prismadb.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  console.log('Password updated successfully for user:', userId);

  return NextResponse.json(
    { message: 'Senha atualizada com sucesso!', user: updatedUser },
    { status: 200 },
  );
}
