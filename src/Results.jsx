import React from "react";
import ResultsTable from "./ResultsTable";
import GanttChart from "./GanttChart";
import ReadyQueue from "./readyQueue";
import Simulation from "./Simulation";

const Results = ({ calculatedProcess, ganttData, readyQueue }) => {
  const n = calculatedProcess.length;
  const averageTAT = n
    ? (calculatedProcess.reduce((sum, p) => sum + (p.tat ?? 0), 0) / n).toFixed(2)
    : 0;
  const averageWT = n
    ? (calculatedProcess.reduce((sum, p) => sum + (p.wt ?? 0), 0) / n).toFixed(2)
    : 0;
  const averageRT = n
    ? (calculatedProcess.reduce((sum, p) => sum + (p.rt ?? 0), 0) / n).toFixed(2)
    : 0;

  return (
    <div className="flex flex-col items-center justify-center bg-red-500/50 w-full h-full gap-2">
      <h2 className="font-bold text-2xl underline p-2">Results</h2>
      <ResultsTable calculatedProcess={calculatedProcess} />
      <GanttChart gantt={ganttData} />
      <ReadyQueue readyQueue={readyQueue} />
      <Simulation />

      <div className="flex flex-col items-start w-full px-5 gap-1 ml-8">
        <div className="flex flex-row gap-2">
          <span className="font-bold ">Average Turn Around Time: </span>
          <span> {averageTAT}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="font-bold ">Average Waiting Time: </span>
          <span> {averageWT}</span>
        </div>
        <div className="flex flex-row gap-2">
          <span className="font-bold ">Average Response Time: </span>
          <span> {averageRT}</span>
        </div>
      </div>
    </div>
  );
};

export default Results;
