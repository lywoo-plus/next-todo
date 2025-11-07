'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import z from 'zod';
import { auth } from '../lib/auth';

const formSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(1),
});

export async function checkSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) {
    redirect('/sign-in');
  }

  return session;
}

export async function signUp(data: z.infer<typeof formSchema>) {
  return auth.api.signUpEmail({
    body: data,
    headers: await headers(),
  });
}

export async function signIn(email: string, password: string) {
  return auth.api.signInEmail({
    body: {
      email,
      password,
    },
    headers: await headers(),
  });
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect('/sign-in');
}

export async function updateUser(userId: string, formData: FormData) {
  console.log('🪲🪲🪲🪲🪲');
  console.log(userId);
  console.log('🪲🪲🪲🪲🪲');
}
