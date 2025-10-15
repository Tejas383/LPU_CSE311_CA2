export default function runSJF(processes) {
  let sorted = [...processes].sort((a, b) => {
    if (a.at === b.at) return a.pid - b.pid;
    return a.at - b.at;
  });

  let time = 0;
  let gantt = [];
  let result = [];
  let readyQueue = [];
  let remaining = [...sorted];

  while (remaining.length > 0 || readyQueue.length > 0) {
    for (let i = 0; i < remaining.length; i++) {
      if (remaining[i].at <= time) {
        readyQueue.push(remaining[i]);
        remaining.splice(i, 1);
        i--;
      }
    }

    if (readyQueue.length == 0) {
      gantt.push({
        pid: "",
        start: time,
        end: remaining[0].at,
      });
      time = remaining[0].at;
      continue;
    }

    // sort the readyQueue based on bt
    readyQueue.sort((a, b) => {
      if (a.bt === b.bt) return a.at - b.at;
      return a.bt - b.bt;
    });
    // and select the first element
    // i.e. the element with smallest burst time in the readyQueue
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
