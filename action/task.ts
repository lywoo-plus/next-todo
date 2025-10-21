'use server';

import { TaskFormSchemaData } from '@/components/todo-form';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function createTask(data: TaskFormSchemaData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  await prisma.task.create({
    data: {
      id: crypto.randomUUID(),
      name: data.name,
      userId: session!.session.userId,
    },
  });
}
