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

  readyQueue.push(remaining[0]);

  while (remaining.some((p) => p.remainingBT > 0)) {
    if (readyQueue.length == 0) {
      let next = remaining.find((p) => {
        p.remainingBT > 0 && p.at > time;
      });
      time = next.at;
      readyQueue.push(next);
      continue;
    }

    let current = readyQueue.shift();
    if (!current.firstResponse) current.firstResponse = time;

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
        p != current
      )
        readyQueue.push(p);
    }

    if (current.remainingBT > 0) {
      readyQueue.push(current);
    } else {
      current.ct = time;
      current.tat = current.ct - current.at;
      current.wt = current.tat - current.bt;
      current.rt = current.firstResponse - current.at;
      result.push(current);
    }
  }
  return { gantt, result, readyQueue };
}
