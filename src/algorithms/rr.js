export default function runRR(processes, quantum) {
  let sorted = [...processes].sort((a, b) => {
    if (a.at == b.at) return a.pid - b.pid;
    return a.at - b.at;
  });

  let time = 0;
  let gantt = [];
  let result = [];
  let readyQueue = [];
  let remaining = sorted.map((p) => ({
    ...p,
    remainingBT: p.bt,
    firstResponse: null,
  }));

  if (remaining.length === 0) return { gantt: [], result: [], readyQueue: [] };

  time = remaining[0].at;
  readyQueue.push(remaining[0]);

  while (remaining.some((p) => p.remainingBT > 0)) {
    if (readyQueue.length == 0) {
      let next = remaining.find((p) => p.remainingBT > 0 && p.at > time);
      if (!next) break;

      // record idle time
      gantt.push({
        pid: "",
        start: time,
        end: next.at,
      });

      time = next.at;
      readyQueue.push(next);
      continue;
    }

    let current = readyQueue.shift();
    if (current.firstResponse === null) current.firstResponse = time;

    let executionTime = Math.min(quantum, current.remainingBT);
    let start = time;
    let end = start + executionTime;
    gantt.push({ pid: current.pid, start, end });

    time = end;
    current.remainingBT -= executionTime;

    for (let p of remaining) {
      if (
        p.remainingBT > 0 &&
        p.at <= time &&
        !readyQueue.includes(p) &&
        p.pid !== current.pid
      ) {
        readyQueue.push(p);
      }
    }

    let target = remaining.find((p) => p.pid === current.pid);


    if (current.remainingBT > 0) {
      readyQueue.push(current);
    } else {
      target.ct = time;
      target.tat = target.ct - target.at;
      target.wt = target.tat - target.bt;
      target.rt = target.firstResponse - target.at;
      result.push(target);
    }
  }
  return { gantt, result, readyQueue };
}
