"use client"

import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
   error,
   reset
}: {
   error: Error,
   reset: () => void
}) {
  const router = useRouter()
  
  function reload() {
    startTransition(()=> {
      router.refresh()
      reset()
    })
  }

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reload} className="border">
         Try again
      </button>
    </div>
  );
}