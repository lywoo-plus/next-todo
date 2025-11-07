'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TaskForm from './task-form';

export default function EditTaskFormModal(props: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  function dismiss(value: boolean) {
    setOpen(value);
    if (!value) {
      router.back();
    }
  }

  return (
    <Dialog open={open} onOpenChange={dismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <TaskForm id={props.id} />
      </DialogContent>
    </Dialog>
  );
}
