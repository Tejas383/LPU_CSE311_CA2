import React from "react";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";
import AlgorithmSelector from "./AlgorithmSelector";
import { Button } from "./components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import runFCFS from "./algorithms/fcfs";
import runSJF from "./algorithms/sjf";
import runPriorityNP from "./algorithms/priorityNP";
import runRR from "./algorithms/rr";

const Process = ({
  process,
  setProcess,
  setCalculatedProcess,
  setGanttData,
  setReadyQueue,
  setAlgorithm,
  algorithm,
  quantum,
  setQuantum,
}) => {
  const handleCalculate = () => {
    if (algorithm == "fcfs") {
      const { gantt, result, readyQueue } = runFCFS(process);
      setGanttData(gantt);
      setCalculatedProcess(result);
      setReadyQueue(readyQueue);
    }
    if (algorithm == "sjf") {
      const { gantt, result, readyQueue } = runSJF(process);
      setGanttData(gantt);
      setCalculatedProcess(result);
      setReadyQueue(readyQueue);
    }
    if (algorithm == "priority-non-pre") {
      const { gantt, result, readyQueue } = runPriorityNP(process);
      setGanttData(gantt);
      setCalculatedProcess(result);
      setReadyQueue(readyQueue);
    }
    if (algorithm == "rr") {
      const { gantt, result, readyQueue } = runRR(process, quantum);
      setGanttData(gantt);
      setCalculatedProcess(result);
      setReadyQueue(readyQueue);
    }
  };
  return (
    <div className="flex gap-1 flex-col bg-yellow-200">
          <AlgorithmSelector
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
          />
      <ProcessForm
        process={process}
        setProcess={setProcess}
        algorithm={algorithm}
        quantum={quantum}
        setQuantum={setQuantum}
      />
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
