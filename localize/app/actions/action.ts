'use server';
import { cookies } from 'next/headers';

interface User {
  id: string;
  name: string;
  email: string;
}

export async function setLoginCookies(user: User, token: string) {
  const cookieStore = await cookies();
  await cookieStore.set('user', JSON.stringify(user));
  await cookieStore.set('token', token);
}

export async function clearLoginCookies() {
  const cookieStore = await cookies();
  await cookieStore.delete('user');
  await cookieStore.delete('token');
}

export async function getLoginCookies() {
  const cookieStore = await cookies();
  const userCookie = await cookieStore.get('user');
  const tokenCookie = await cookieStore.get('token');
  const user = userCookie ? JSON.parse(userCookie.value) : null;
  const token = tokenCookie ? tokenCookie.value : null;
  return { user, token };
}
