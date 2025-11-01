import React, { useEffect, useState } from "react";
import GanttChart from "./GanttChart";
import { Button } from "./components/ui/button";

function Simulation({ processes }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentTime((t) => {
          const next = t + 1;
          const maxEnd = Math.max(...processes.map((p) => p.end));
          if (next > maxEnd) {
            clearInterval(timer);
            setIsRunning(false);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, processes]);

  // only show blocks that have started
  const visibleProcesses = processes.map((p) => ({
    ...p,
    visible: p.start < currentTime,
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => setIsRunning((r) => !r)}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setCurrentTime(0);
            setIsRunning(false);
          }}
        >
          Reset
        </Button>
      </div>

      <div className="text-gray-700 font-medium">
        Current Time: {currentTime}
      </div>

      <GanttChart gantt={visibleProcesses} />
    </div>
  );
}

export default Simulation;
