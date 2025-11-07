'use client';

import { createTaskAction, getTaskAction, updateTaskAction } from '@/action/task';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { redirect, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { Button } from './ui/button';
import { Field, FieldError, FieldGroup } from './ui/field';
import { Input } from './ui/input';
import { Spinner } from './ui/spinner';

export const taskFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type TaskFormSchemaData = z.infer<typeof taskFormSchema>;

export default function TaskForm(props: { id?: string }) {
  const router = useRouter();

  const form = useForm<TaskFormSchemaData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(data: TaskFormSchemaData) {
    try {
      const shouldCreateTask = !props.id;

      if (shouldCreateTask) {
        await createTaskAction(data);
        toast.success('Task added successfully');
      } else {
        await updateTaskAction(props.id!, data);
        toast.success('Task updated successfully');
        router.back();
      }

      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);

        if (error.message === 'Unauthorized') {
          toast.error(error.message);
          redirect('/sign-in');
        }
      }
    }
  }

  const { loading: isGettingTask } = useRequest(
    async () => {
      if (props.id) {
        const task = await getTaskAction(props.id);
        form.setValue('name', task?.name ?? '', { shouldValidate: true });
      }
    },
    {
      refreshDeps: [props.id],
    }
  );

  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle className="text-2xl">Task</CardTitle>
        <CardDescription>New task can be added here</CardDescription>
      </CardHeader>

      <div
        className={cn(
          'absolute top-0 place-content-center left-0 w-full h-full bg-black/5 backdrop-blur-xs z-10 flex items-center justify-center',
          props.id && isGettingTask ? 'grid' : 'hidden'
        )}
      >
        <Spinner className="size-16 text-green-600" />
      </div>

      <CardContent>
        <form id={props.id ?? 'todo-form'} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Task name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className=" justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="cursor-pointer"
          >
            Reset
          </Button>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            type="submit"
            form={props.id ?? 'todo-form'}
            className="cursor-pointer bg-green-600 hover:bg-green-400"
          >
            {form.formState.isSubmitting ? 'Loading' : props.id ? 'Update' : 'Add'}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
