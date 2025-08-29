export default function runSJF(processes) {
    let sorted = [...processes].sort((a, b) => {
        if (a.at === b.at) return a.pid - b.pid;
        return a.at - b.at;
    });

    let time = 0;
    let gantt = [];
    let result = [];

    for (let p of sorted) {
        // logic for sjf
        
    }

    return {gantt, result};
}