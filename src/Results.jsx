import React from "react";
import ResultsTable from "./ResultsTable";
import GanttChart from "./GanttChart";
import Summary from "./Summary";

const Results = ({
  calculatedProcess,
  ganttData,
  currentTime,
}) => {
  return (
    <div className="space-y-6 w-full">
      <ResultsTable calculatedProcess={calculatedProcess} />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <GanttChart gantt={ganttData} currentTime={currentTime} />
        </div>
      </div>

      {/* <Summary calculatedProcess={calculatedProcess} /> */}
    </div>
  );
};

export default Results;
