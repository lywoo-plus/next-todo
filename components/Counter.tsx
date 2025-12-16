'use client';

import { useCounter } from '../context/CounterContext';

export default function Counter() {
  const { counter, setCounter } = useCounter();

  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
    </div>
  );
}
