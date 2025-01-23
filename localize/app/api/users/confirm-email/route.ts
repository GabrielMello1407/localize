import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prismadb from '@/lib/prismadb';

export async function PATCH(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { error: 'Token não fornecido.' },
      { status: 400 },
    );
  }

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
