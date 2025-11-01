import React from "react";
import { BarChart3 } from "lucide-react";
import { Card } from "./components/ui/card";

/**
 * Props:
 *  - gantt: Array of { pid: string|number, start: number, end: number }
 *  - currentTime: number (seconds / time units)
 *  - pxPerUnit: optional number (pixels per time unit), default 40
 */
const GanttChart = ({ gantt = [] }) => {
  if (!Array.isArray(gantt) || gantt.length === 0) {
    return (
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h3 className="text-purple-900">Gantt Chart</h3>
        </div>
        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Click "Simulate" to generate the Gantt chart</p>
        </div>
      </Card>
    );
  }

  // sort by start time to render left -> right
  const sorted = [...gantt].sort((a, b) => a.start - b.start);

  const maxTime = Math.max(...sorted.map((p) => p.end));

  const colors = [
    "from-blue-400 to-blue-500",
    "from-purple-400 to-purple-500",
    "from-pink-400 to-pink-500",
    "from-indigo-400 to-indigo-500",
    "from-violet-400 to-violet-500",
    "from-fuchsia-400 to-fuchsia-500",
    "from-cyan-400 to-cyan-500",
    "from-teal-400 to-teal-500",
  ];

  const processColors = {};
  // assign each pid a distinct color
  // exclude the synthetic "idle" pid from colored assignments
  const uniquePIDs = [...new Set(sorted.map((p) => p.pid).filter((pid) => pid !== "idle"))];
  uniquePIDs.forEach((pid, index) => {
    processColors[pid] = colors[index % colors.length];
  });

  // Merge idle gaps (empty spaces) into timeline
  const timeline = [];
  for (let i = 0; i < sorted.length; i++) {
    const curr = sorted[i];
    const next = sorted[i + 1];
    timeline.push(curr);

    // if next process starts later than current end -> idle gap
    if (next && next.start > curr.end) {
      timeline.push({
        pid: "idle",
        start: curr.end,
        end: next.start,
      });
    }
  }

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-purple-600" />
        <h3 className="text-purple-900">Gantt Chart</h3>
      </div>

      <div className="space-y-4">
        {/* Timeline */}
        <div className="relative">
          <div className="flex items-center h-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg overflow-hidden border border-purple-200">
            {timeline.map((p, index) => {
              const width = ((p.end - p.start) / maxTime) * 100;
              const left = (p.start / maxTime) * 100;

              if (p.pid === "idle") {
                return (
                  <div
                    key={`idle-${index}`}
                    className={`absolute h-full border-r border-gray-300 transition-all duration-700 ease-in-out ${
                      p.visible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        #d1d5db 0,
                        #d1d5db 8px,
                        #e5e7eb 8px,
                        #e5e7eb 16px
                      )`,
                    }}
                  />
                );
              }

              return (
                <div
                  key={`${p.pid}-${index}`}
                  className={`absolute h-full flex items-center justify-center bg-gradient-to-r ${
                    processColors[p.pid]
                  } border-r-2 border-white transition-all duration-700 ease-in-out ${
                    p.visible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                  }}
                >
                  <span className="text-white text-sm px-2 truncate">
                    {p.pid}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Time markers */}
          <div className="relative mt-2 h-6">
            {timeline.map((p, index) => (
              <div key={`marker-${index}`}>
                <div
                  className="absolute text-xs text-gray-600"
                  style={{ left: `${(p.start / maxTime) * 100}%` }}
                >
                  {p.start}
                </div>
                {index === timeline.length - 1 && (
                  <div
                    className="absolute text-xs text-gray-600"
                    style={{ left: `${(p.end / maxTime) * 100}%` }}
                  >
                    {p.end}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 pt-2 items-center">
          {uniquePIDs.map((pid, index) => (
            <div key={`legend-${index}`} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded bg-gradient-to-r ${processColors[pid]}`}
              />
              <span className="text-sm text-gray-700">{pid}</span>
            </div>
          ))}

          {/* Idle legend (striped) */}
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #d1d5db 0, #d1d5db 8px, #e5e7eb 8px, #e5e7eb 16px)`,
              }}
            />
            <span className="text-sm text-gray-700">Idle</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GanttChart;
