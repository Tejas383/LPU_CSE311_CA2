import React, { useState, useEffect } from "react";

const Timer = ({ isRunning, onTick, totalTime, setIsRunning, reset }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (reset) setTime(0);
  }, [reset]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          const next = prev + 1;
          if (onTick) onTick(next);
          if (next >= totalTime) {
            clearInterval(interval);
            setIsRunning(false);
          }
          return next;
        });
      }, 1000);
    // } else {
    //     setTime(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, totalTime, onTick, setIsRunning]);

  return (
    <div className="flex items-center justify-center p-2 bg-red-400/60 rounded-md text-white font-bold text-lg shadow-md w-32">
      ⏱️ Time: {time}
    </div>
  );
};

export default Timer;
