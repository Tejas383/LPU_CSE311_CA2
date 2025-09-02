import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import runFCFS from "./algorithms/fcfs";
import runSJF from "./algorithms/sjf";
import runPriorityNP from "./algorithms/priorityNP";
import runRR from "./algorithms/rr";

const ComparativeAnalysis = ({ process, quantum }) => {
  const copy = [...process];

  const fcfs = runFCFS(copy);
  const sjf = runSJF(copy);
  const priorityNP = runPriorityNP(copy);
  const rr = runRR(copy);

  const calculateAverages = (processList) => {
    const n = processList.length;
    const averageTAT = n
      ? processList.reduce((sum, p) => sum + (p.tat ?? 0), 0) / n
      : 0;
    const averageWT = n
      ? processList.reduce((sum, p) => sum + (p.wt ?? 0), 0) / n
      : 0;
    const averageRT = n
      ? processList.reduce((sum, p) => sum + (p.rt ?? 0), 0) / n
      : 0;

    return {
      tat: averageTAT.toFixed(2),
      wt: averageWT.toFixed(2),
      rt: averageRT.toFixed(2),
    };
  };

  const data = [
    { name: "First Come First Serve", ...calculateAverages(fcfs) },
    { name: "Shortest Job First", ...calculateAverages(sjf) },
    { name: "Priority Non-Preemptive", ...calculateAverages(priorityNP) },
    { name: `Round Robin (Q=${quantum})`, ...calculateAverages(rr) },
  ];

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl underline p-2">Comparative Analysis</h2>
      <Table className="">
        <TableHeader>
          <TableRow className="">
            <TableHead className="border border-black text-center">
              Algorithm
            </TableHead>
            <TableHead className="border border-black text-center">
              Average Turn Around Time
            </TableHead>
            <TableHead className="border border-black text-center">
              Average Wait Time
            </TableHead>
            <TableHead className="border border-black text-center">
              Average Response Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((p, idx) => (
              <TableRow key={idx}>
                <TableCell className="border border-black">{p.name}</TableCell>
                <TableCell className="border border-black">{p.tat}</TableCell>
                <TableCell className="border border-black">{p.wt}</TableCell>
                <TableCell className="border border-black">{p.rt}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center colspan-7 flex items-center justify-center">
              <TableCell colSpan={7} className="text-center">
                No processes yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparativeAnalysis;
