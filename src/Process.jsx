import React from "react";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";
import { Button } from "./components/ui/button";
import runFCFS from "./algorithms/fcfs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

const Process = ({
  process,
  setProcess,
  setCalculatedProcess,
  setGanttData,
  algorithm,
}) => {
  const handleCalculate = () => {
    if (algorithm == "fcfs") {
      const { gantt, result } = runFCFS(process);
      setGanttData(gantt);
      setCalculatedProcess(result);
    }
  };
  return (
    <div className="flex gap-1 flex-col bg-red-200">
      <ProcessForm process={process} setProcess={setProcess} />
      <hr className="border border-black w-full" />
      <ProcessTable process={process} setProcess={setProcess} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button onClick={handleCalculate} disabled={!algorithm}>
                Calculate
              </Button>
            </span>
          </TooltipTrigger>
          {!algorithm && (
            <TooltipContent>
              <p>Please select an algorithm first</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Process;
