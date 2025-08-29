import React from "react";

const GanttChart = ({ gantt }) => {
  return (
    <div className=" flex flex-col items-center justify-center bg-red-500/50 w-full h-full ">
      <h2 className=" text-xl underline ">Gantt Chart</h2>

      <div className="h-10 w-full flex flex-row items-center justify-center mt-3">
        {gantt && gantt.length > 0 ? (
          gantt.map((p, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center border border-black bg-green-200"
              style={{
                width: `${(p.end - p.start) * 40}px`,
                height: "40px",
              }}
            >
              {p.pid}
            </div>
          ))
        ) : (
          <div>No processes yet</div>
        )}
      </div>

      {gantt && gantt.length > 0 && (
        <div className="flex  text-xs ">
          {gantt.map((p, idx) => (
            <div
              key={idx}
              style={{
                width: `${(p.end - p.start) * 40}px`,
              }}
              className="text-left"
            >
              <span>{p.start}</span>
            </div>
          ))}
          <span>{gantt[gantt.length - 1].end}</span>
        </div>
      )}
    </div>
  );
};

export default GanttChart;
