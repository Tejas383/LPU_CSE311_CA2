export default function runFCFS(processes) {
    let sorted = [...processes].sort((a, b) => {
        if (a.at === b.at) return a.pid - b.pid;
        return a.at - b.at;
    });

    let time = 0;
    let gantt = [];
    let result = [];

    for (let p of sorted) {
        if (time < p.at)
            time = p.at;

        let startTime = time;
        let completionTime = startTime + p.bt;
        let turnAroundTime = completionTime - p.at;
        let waitingTime = turnAroundTime - p.bt;

        gantt.push({
            pid: p.pid,
            start: startTime,
            end: completionTime
        });

        result.push({
            pid: p.pid,
            at: p.at,
            bt: p.bt,
            ct: completionTime,
            tat: turnAroundTime,
            wt: waitingTime,
            // rt: waitingTime,
        });

        time = completionTime;
    }

    return {gantt, result};
}