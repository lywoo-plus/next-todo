'use client';

import { useRef, useState } from 'react';

export default function StopWatch() {
  const [timer, setTimer] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  }

  function stop() {
    timerRef.current && clearInterval(timerRef.current);
  }

  return (
    <div>
      <p>{timer}</p>
      <button onClick={start}>Start</button>-<button onClick={stop}>Stop</button>
    </div>
  );
}
