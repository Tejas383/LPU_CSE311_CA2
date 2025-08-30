export default function runPriorityNP(processes) {
  let sorted = [...processes].sort((a, b) => {
    if (a.at == b.at) return a.pr - b.pr;
    return a.at - b.at;
  });

  let time = 0;
  let gantt = [];
  let result = [];
  let readyQueue = [];
  let remaining = [...sorted];

  // lower number, higher priority
  // 1 > 2 > 3 ...

  while (remaining.length > 0 || readyQueue.length > 0) {
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i].at <= time) {
        readyQueue.push(remaining[i]);
        remaining.splice(i, 1);
        i--;
      }
    }

    if (readyQueue.length == 0) {
      time = remaining[0].at;
      continue;
    }

    // sort the readyQueue based on priority
    readyQueue.sort((a, b) => {
      return a.pr - b.pr;
    });
    // and select the first element
    // i.e. the element with highest priority
    const current = readyQueue.shift();

    let start = time;
    let end = start + current.bt;

    gantt.push({ pid: current.pid, start, end });

    let tat = end - current.at;
    let wt = tat - current.bt;
    let rt = wt;

    result.push({
      ...current,
      ct: end,
      tat,
      wt,
      rt,
    });

    time = end;
  }

  return { gantt, result, readyQueue };
}
