'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQueryParams } from '@/hook/useQueryParams';
import { useEffect, useState } from 'react';
import TaskForm from './task-form';

export default function EditTaskFormDialog() {
  const { getQueryParam, deleteQueryParam } = useQueryParams();

  const id = getQueryParam('id');
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    setShouldOpen(!!id);
  }, [id]);

  return (
    <Dialog
      open={shouldOpen}
      onOpenChange={(value) => {
        if (!value) {
          setShouldOpen(false);
          deleteQueryParam('id');
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="overflow-hidden flex w-full">
          <TaskForm id={id ?? undefined} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
