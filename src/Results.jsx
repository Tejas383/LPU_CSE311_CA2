import React from "react";
import ResultsTable from "./ResultsTable";
import GanttChart from "./GanttChart";

const Results = ({
  calculatedProcess,
  ganttData,
  currentTime,
}) => {
  return (
    <div className="space-y-6 w-full">
      <ResultsTable calculatedProcess={calculatedProcess} />
      <GanttChart gantt={ganttData} currentTime={currentTime} />
    </div>
  );
};

export default Results;
