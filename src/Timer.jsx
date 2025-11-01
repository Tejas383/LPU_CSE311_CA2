import React, { useState, useEffect, useRef } from "react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
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

  // const handleStart = () => setIsRunning(true);
  // const handlePause = () => setIsRunning(false);
  // reset handled via external `reset` prop (and Start/Pause is controlled elsewhere)

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl border-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs opacity-80">Simulation Time</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-mono tabular-nums tracking-tight">
                {formatTime(time)}
              </span>
              <span className="text-sm opacity-80">s</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
            {/* start/pause controls are handled elsewhere; reset button removed per UI update */}
        </div>
      </div>

      {isRunning && (
        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60 rounded-full animate-pulse"
            style={{ width: "100%" }}
          />
        </div>
      )}
    </Card>
  );
};

export default Timer;
