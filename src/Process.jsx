import React from "react";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";
import AlgorithmSelector from "./AlgorithmSelector";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
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
import { Play } from "lucide-react";

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
  setIsRunning,
  setReset,
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

    setReset(true);
    setIsRunning(true);

    setTimeout(() => {
      setReset(false);
      setIsRunning(true);
    }, 200);
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
      <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
      <ProcessForm
        process={process}
        setProcess={setProcess}
        algorithm={algorithm}
        quantum={quantum}
        setQuantum={setQuantum}
      />
      <ProcessTable process={process} setProcess={setProcess} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                onClick={handleCalculate}
                disabled={!algorithm}
                className="text-white flex-1 bg-gradient-to-r bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Play className="w-4 h-4 mr-2" />
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
    </Card>
  );
};

export default Process;
