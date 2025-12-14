'use client';

import dynamic from 'next/dynamic';

const CounterWithReducer = dynamic(() => import('@/components/CounterWithReducer'), {
  ssr: false,
});

export default function Page() {
  return (
    <div suppressHydrationWarning>
      {/* <SignInForm /> */}

      {/* <ShoppingCartWithReducer /> */}
      <CounterWithReducer />
    </div>
  );
}
