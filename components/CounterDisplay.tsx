'use client';

import { useCounter } from '../context/CounterContext';

export default function CounterDisplay() {
  const { counter } = useCounter();

  return <h1 className="text-blue-500 text-2xl">Counter:{counter}</h1>;
}
