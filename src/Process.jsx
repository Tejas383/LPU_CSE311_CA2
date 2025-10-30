import React from "react";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";
import AlgorithmSelector from "./AlgorithmSelector";
import { Card } from "./components/ui/card";

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
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
        <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
        <ProcessForm
          process={process}
          setProcess={setProcess}
          algorithm={algorithm}
          quantum={quantum}
          setQuantum={setQuantum}
          setCalculatedProcess={setCalculatedProcess}
          setGanttData={setGanttData}
          setReadyQueue={setReadyQueue}
          setIsRunning={setIsRunning}
          setReset={setReset}
        />
      </Card>
      <ProcessTable process={process} setProcess={setProcess} />
    </div>
  );
};

export default Process;
