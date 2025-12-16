'use client';

import { createContext, useContext, useState } from 'react';

// Context type
type CounterContextType = {
  counter: number;
  setCounter: (value: number) => void;
};

export const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Context provider
export function CounterProvider({ children }: { children: React.ReactNode }) {
  const [counter, setCounter] = useState(0);

  return (
    <CounterContext
      value={{
        counter,
        setCounter,
      }}
    >
      {children}
    </CounterContext>
  );
}

// Context hook
export function useCounter() {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }

  return context;
}
