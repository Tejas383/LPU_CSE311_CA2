import React from "react";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";
import { Button } from "./components/ui/button";
import runFCFS from "./algorithms/fcfs";

const Process = ({ process, setProcess, setCalculatedProcess, setGanttData, algorithm }) => {
  const handleCalculate = () => {
    if (algorithm == 'fcfs') {
        const {gantt, result} = runFCFS(process);
        setGanttData(gantt);
        setCalculatedProcess(result);
    }
  };
  return (
    <div className="flex gap-1 flex-col bg-red-200">
      <ProcessForm process={process} setProcess={setProcess} />
      <hr className="border border-black w-full" />
      <ProcessTable process={process} setProcess={setProcess} />
      <Button onClick={handleCalculate}>Calculate</Button>
    </div>
  );
};

export default Process;
