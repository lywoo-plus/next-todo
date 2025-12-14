'use client';

import { useReducer } from 'react';
import { Button } from './ui/button';

const initialState = 0;

const counterReducer = (state: number, action: 'increase' | 'decrease' | 'reset') => {
  switch (action) {
    case 'increase':
      return state + 1;
    case 'decrease':
      return state - 1;
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

const initState = (initialState: number) => {
  if (typeof window !== 'undefined') {
    const count = localStorage.getItem('count') ?? initialState;
    return Number(count);
  }

  return initialState;
};

export default function CounterWithReducer() {
  const [state, dispatch] = useReducer(counterReducer, initialState, initState);

  return (
    <div>
      <p>Count: {state}</p>
      <Button onClick={() => dispatch('increase')}>Increase</Button>
      <Button onClick={() => dispatch('decrease')}>Decrease</Button>
      <Button onClick={() => dispatch('reset')}>Reset</Button>
    </div>
  );
}
