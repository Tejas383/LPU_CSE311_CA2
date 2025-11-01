import React, { useState, useEffect, useRef } from "react";
import { Card } from "./components/ui/card";
import { Clock } from "lucide-react";

const Timer = ({ isRunning, setIsRunning, totalTime, onTick, reset }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // handle reset externally
  useEffect(() => {
    if (reset) {
      clearTimer();
      setTime(0);
      onTick?.(0);
    }
  }, [reset, onTick]);

  // handle start/pause
  useEffect(() => {
    if (isRunning) {
      clearTimer();
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const next = prev + 1;
          onTick?.(next);

          if (totalTime && next >= totalTime) {
            clearTimer();
            setIsRunning(false);
          }

          return next;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [isRunning, totalTime, onTick, setIsRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl border-0 w-full flex flex-col items-center justify-center rounded-2xl transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm shadow-inner">
          <Clock className="w-6 h-6 text-white/90" />
        </div>
        <div className="text-left">
          <p className="text-xs uppercase tracking-wide text-white/70">
            Simulation Time
          </p>
          <span className="text-4xl font-bold font-mono tracking-tight">
            {formatTime(time)}
          </span>
          <span className="text-sm opacity-80 ml-1">s</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full mt-4 h-2 bg-white/15 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isRunning ? "bg-white/70 animate-pulse" : "bg-white/40"
          }`}
          style={{
            width:
              totalTime && totalTime > 0
                ? `${Math.min((time / totalTime) * 100, 100)}%`
                : "0%",
          }}
        />
      </div>

      {/* Status indicator */}
      <div className="mt-3 text-xs uppercase tracking-wider text-white/60">
        {isRunning ? "Running..." : reset ? "Reset" : "Paused"}
      </div>
    </Card>
  );
};

export default Timer;
