import React from "react";
import ResultsTable from "./ResultsTable";
import GanttChart from "./GanttChart";
import ReadyQueue from "./readyQueue";
import Simulation from "./Simulation";
import Summary from "./Summary";

const Results = ({
  calculatedProcess,
  ganttData,
  readyQueue,
  currentTime,
  isSimulating,
}) => {

  return (
    <div className="space-y-6">
      <ResultsTable calculatedProcess={calculatedProcess} />
      <GanttChart gantt={ganttData} currentTime={currentTime} />
      <Summary calculatedProcess={calculatedProcess} />
    </div>
  );
};

export default Results;
