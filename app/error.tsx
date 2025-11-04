'use client';

import { Button } from '@/components/ui/button';
import { BugIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  function reload() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <div className="2xl:container mx-auto p-4 text-center h-full">
      <h2 className="text-2xl">Something went wrong!</h2>

      <p className="flex text-xl flex-col gap-2 items-center p-4">
        <BugIcon />
        <p className="text-red-500">{error.message}</p>
      </p>

      <Button onClick={reload} className="border">
        Try again
      </Button>
    </div>
  );
}
