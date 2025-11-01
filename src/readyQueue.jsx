import React, { useMemo } from "react";
import { Card } from "./components/ui/card";

// ReadyQueue component shows the currently ready processes (arrived, not finished,
// and not currently running) along with their remaining burst time. It derives
// state from the gantt timeline and the list of processes (which contains original bt).
const ReadyQueue = ({ gantt = [], processes = [], currentTime = 0 }) => {
  const queue = useMemo(() => {
    // build map: pid -> total original bt
    const btMap = {};
    processes.forEach((p) => {
      const v = Number(p.bt);
      btMap[p.pid] = Number.isNaN(v) ? 0 : v;
    });

    // compute executed time for each pid up to currentTime
    const executed = {};
    for (const seg of gantt) {
      if (!seg.pid) continue;
      const pid = seg.pid;
      const segStart = seg.start;
      const segEnd = seg.end;
      // overlap with [0, currentTime)
      const overlapStart = Math.max(segStart, 0);
      const overlapEnd = Math.min(segEnd, currentTime);
      const dur = Math.max(0, overlapEnd - overlapStart);
      executed[pid] = (executed[pid] || 0) + dur;
    }

    // find currently running pid (if any)
    const runningSeg = gantt.find((s) => s.pid && s.start <= currentTime && currentTime < s.end);
    const runningPid = runningSeg ? runningSeg.pid : null;

    const rows = [];
    for (const p of processes) {
      const pid = p.pid;
  const a = Number(p.at);
  const arrival = Number.isNaN(a) ? 0 : a;
  const t = btMap[pid];
  const total = typeof t === "number" ? t : Number(p.bt) || 0;
      if (arrival > currentTime) continue; // not arrived yet
      const exec = executed[pid] || 0;
      const remaining = Math.max(0, total - exec);
      if (remaining <= 0) continue; // finished
      // exclude currently running process from ready queue (it's executing)
      if (pid === runningPid) continue;
      rows.push({ pid, remaining });
    }

    // sort by remaining burst time then pid
    rows.sort((a, b) => {
      if (a.remaining === b.remaining) return String(a.pid).localeCompare(String(b.pid));
      return a.remaining - b.remaining;
    });

    return rows;
  }, [gantt, processes, currentTime]);

  return (
    <Card className="p-4 bg-white/95 shadow-sm border border-gray-200 w-56">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">Ready Queue</h4>
      {queue.length === 0 ? (
        <div className="text-sm text-gray-500">Empty</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs text-gray-600 pb-2">PID</th>
              <th className="text-right text-xs text-gray-600 pb-2">Rem BT</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((r) => (
              <tr key={r.pid} className="border-t border-gray-100">
                <td className="py-2 text-gray-800">{r.pid}</td>
                <td className="py-2 text-right font-mono">{r.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};

export default ReadyQueue;
