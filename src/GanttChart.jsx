import React from "react";

/**
 * Props:
 *  - gantt: Array of { pid: string|number, start: number, end: number }
 *  - currentTime: number (seconds / time units)
 *  - pxPerUnit: optional number (pixels per time unit), default 40
 */
const GanttChart = ({ gantt = [], currentTime = 0, pxPerUnit = 40 }) => {
  if (!Array.isArray(gantt) || gantt.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-red-500/20 w-full h-full p-4">
        <h2 className="text-xl underline">Gantt Chart</h2>
        <div className="mt-4">No processes yet</div>
      </div>
    );
  }

  // sort by start time to render left -> right
  const sorted = [...gantt].sort((a, b) => a.start - b.start);

  const minStart = Math.min(...sorted.map((p) => p.start));
  const maxEnd = Math.max(...sorted.map((p) => p.end));
  const totalWidth = (maxEnd - minStart) * pxPerUnit;

  // helper to clamp a number
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  return (
    <div className="flex flex-col items-start justify-start bg-red-500/20 w-full p-4 rounded-md">
      <h2 className="text-xl underline mb-3">Gantt Chart</h2>

      <div
        className="relative w-full border border-gray-300 bg-white/60"
        style={{ height: 64, minWidth: "100%", overflow: "hidden" }}
      >
        {/* Track (background) */}
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: `${totalWidth}px` }}
        />

        {/* Bars */}
        {sorted.map((p, idx) => {
          const duration = p.end - p.start;
          if (duration <= 0) return null;

          // how much of this process is visible according to currentTime (in time units)
          const visibleTime = clamp(currentTime - p.start, 0, duration);
          const visibleWidth = visibleTime * pxPerUnit;
          const fullWidth = duration * pxPerUnit;

          // left offset relative to minStart
          const leftOffset = (p.start - minStart) * pxPerUnit;

          return (
            <div
              key={`${p.pid}-${idx}`}
              className="absolute top-6 h-10 flex items-center justify-start"
              style={{
                left: leftOffset,
                width: fullWidth,
              }}
            >
              {/* background (full) - light outline */}
              <div
                className="h-full border border-black/10 rounded-l-md"
                style={{
                  width: fullWidth,
                  backgroundColor: "#d1fae5", // green-200 equivalent
                }}
              >
                {/* visible (growing) part */}
                <div
                  className="h-full flex items-center justify-center whitespace-nowrap overflow-hidden transition-all duration-300"
                  style={{
                    width: visibleWidth,
                    backgroundColor: "#34d399", // green-400-ish
                    color: "black",
                    borderRadius: visibleWidth === fullWidth ? 8 : "6px 0 0 6px",
                  }}
                >
                  {visibleWidth > 8 ? <span className="px-1">{p.pid}</span> : null}
                </div>
              </div>
            </div>
          );
        })}

        {/* time ticks below bars */}
        <div className="absolute left-0 bottom-0 flex items-center" style={{ height: 20 }}>
          {Array.from({ length: maxEnd - minStart + 1 }).map((_, i) => {
            const t = minStart + i;
            return (
              <div
                key={`tick-${t}`}
                className="flex flex-col items-center"
                style={{ width: pxPerUnit, minWidth: pxPerUnit, textAlign: "center" }}
              >
                <div style={{ height: 6, borderLeft: "1px solid rgba(0,0,0,0.2)" }} />
                <div className="text-xs mt-0.5">{t}</div>
              </div>
            );
          })}
        </div>

        {/* current time indicator (vertical line) */}
        {currentTime >= minStart && currentTime <= maxEnd && (
          <div
            className="absolute top-0"
            style={{
              left: (currentTime - minStart) * pxPerUnit - 1, // minus 1 for center of 2px line
              height: "100%",
              width: 2,
              background: "rgba(0,0,0,0.6)",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GanttChart;
