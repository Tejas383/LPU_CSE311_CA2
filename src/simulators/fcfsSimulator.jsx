import React, { useEffect, useState } from "react";

const FCFSSimulator = () => {
  const [time, setTime] = useState(0);
  const [processes] = useState([
    { pid: 1, at: 0, bt: 5 },
    { pid: 2, at: 2, bt: 3 },
    { pid: 3, at: 6, bt: 4 },
  ]);
  const [completed, setCompleted] = useState([]);
  const [readyQueue, setReadyQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [running, setRunning] = useState(false);

  // Main timer
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 800);

    return () => clearInterval(interval);
  }, [running]);

  // Step-by-step process logic
  useEffect(() => {
    if (!running) return;

    // Processes that have arrived and not completed
    const arrived = processes.filter(
      (p) => p.at <= time && !completed.some((c) => c.pid === p.pid)
    );

    // If CPU idle, pick next process (FCFS)
    if (!current && arrived.length > 0) {
      const next = arrived[0]; // FCFS: first arrived
      setCurrent({ ...next, remaining: next.bt, startTime: time });
      setReadyQueue(arrived.slice(1).map((p) => p.pid));
    }

    // If process is running
    if (current) {
      const newRemaining = current.remaining - 1;

      if (newRemaining <= 0) {
        // Process finishes
        const endTime = time + 1;
        setCompleted((prev) => [
          ...prev,
          {
            pid: current.pid,
            at: current.at,
            bt: current.bt,
            ct: endTime,
            tat: endTime - current.at,
            wt: endTime - current.at - current.bt,
          },
        ]);
        setCurrent(null);
      } else {
        setCurrent({ ...current, remaining: newRemaining });
      }
    }
  }, [time, current, completed, processes, running]);

  const startSimulation = () => {
    setRunning(true);
    setTime(0);
    setCompleted([]);
    setReadyQueue([]);
    setCurrent(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>FCFS Scheduling Simulation</h2>
      <button onClick={startSimulation} disabled={running}>
        Start Simulation
      </button>

      <div>Time: {time}</div>
      <div>
        Current Process: {current ? `P${current.pid}` : "Idle"}
      </div>
      <div>
        Ready Queue: [{readyQueue.map((id, i) => (
          <span key={i}>P{id}{i < readyQueue.length - 1 ? ", " : ""}</span>
        ))}]
      </div>

      <h3>Completed Processes</h3>
      <table border="1" cellPadding="6" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>PID</th>
            <th>AT</th>
            <th>BT</th>
            <th>CT</th>
            <th>TAT</th>
            <th>WT</th>
          </tr>
        </thead>
        <tbody>
          {completed.map((p) => (
            <tr key={p.pid}>
              <td>{p.pid}</td>
              <td>{p.at}</td>
              <td>{p.bt}</td>
              <td>{p.ct}</td>
              <td>{p.tat}</td>
              <td>{p.wt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FCFSSimulator;