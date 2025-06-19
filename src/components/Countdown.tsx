"use client";

import * as React from "react";

const targetDate = new Date("2025-08-01T00:00:00");

export default function Countdown() {
  const [timeLeft, setTimeLeft] = React.useState(getTimeLeft());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); // Only render countdown after mount

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const now = new Date();
    const total = targetDate.getTime() - now.getTime();

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  }

  // ⛔ Prevent rendering until client-side mount
  if (!mounted) return null;

  return (
    <>
      <h2 className="mb-4">Countdown to Examinations</h2>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.days } as React.CSSProperties}>
              {timeLeft.days}
            </span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": timeLeft.hours } as React.CSSProperties}>
              {timeLeft.hours}
            </span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span
              style={{ "--value": timeLeft.minutes } as React.CSSProperties}
            >
              {timeLeft.minutes}
            </span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span
              style={{ "--value": timeLeft.seconds } as React.CSSProperties}
            >
              {timeLeft.seconds}
            </span>
          </span>
          sec
        </div>
      </div>
    </>
  );
}
