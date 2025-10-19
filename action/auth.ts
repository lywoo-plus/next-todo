'use server';

import { headers } from "next/headers";
import z from "zod";
import { auth } from "../lib/auth";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.email().min(1),
  password: z.string().min(1),
})

export async function signUp(_initialState: any,formData: FormData) {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      token: null,
      user: null,
      error: z.treeifyError(validatedFields.error),
    };
  }

  const result = await auth.api.signUpEmail({
    body: {
      ...validatedFields.data,
      callbackURL: '/',
    }
  })

  return {
    ...result,
  };
}

export async function signIn(_initialState: any,formData: FormData) {
  try {
    const validatedFields = formSchema.omit({name: true}).safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      token: null,
      user: null,
      error: z.treeifyError(validatedFields.error),
    };
  }

  const result = await auth.api.signInEmail({
    body: {
      ...validatedFields.data,
    },
    headers: await headers()
  })


  return {
    ...result,
  };
  } catch (error) {
    console.error(error);

    return {
      message: (error as Error).message
    }
  }
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
}

export async function updateUser(userId: string, formData: FormData) {
  console.log('🪲🪲🪲🪲🪲');
  console.log(userId);
  console.log('🪲🪲🪲🪲🪲');
}