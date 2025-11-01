import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import runFCFS from "./algorithms/fcfs";
import runSJF from "./algorithms/sjf";
import runPriorityNP from "./algorithms/priorityNP";
import runRR from "./algorithms/rr";
import { BarChart2, Award } from "lucide-react";

const ComparativeAnalysis = ({ process, quantum }) => {
  const copy = [...process];

  const fcfs = runFCFS(copy).result;
  const sjf = runSJF(copy).result;
  const priorityNP = runPriorityNP(copy).result;
  const rr = runRR(copy, quantum).result;

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

  const bestTAT = Math.min(...data.map((d) => parseFloat(d.tat)));
  const bestWT = Math.min(...data.map((d) => parseFloat(d.wt)));
  const bestRT = Math.min(...data.map((d) => parseFloat(d.rt)));

  const isBest = (val, bestVal) => parseFloat(val) === bestVal;

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
      <div className="flex items-center gap-2 mb-6">
        <BarChart2 className="w-5 h-5 text-purple-600" />
        <h3 className="text-purple-900">Comparative Analysis</h3>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full text-center">
          <TableHeader>
            <TableRow className="border-b-2 border-purple-200">
              <TableHead className="py-3 px-4 text-purple-900 text-center">
                Algorithm
              </TableHead>
              <TableHead className="py-3 px-4 text-purple-900 text-center">
                Average Turn Around Time
              </TableHead>
              <TableHead className="py-3 px-4 text-purple-900 text-center">
                Average Wait Time
              </TableHead>
              <TableHead className="py-3 px-4 text-purple-900 text-center">
                Average Response Time
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {copy && copy.length > 0 ? (
              copy.map((p, idx) => (
                <TableRow
                  key={idx}
                  className={`border-b border-purple-100 hover:bg-purple-50/50 transition-colors ${
                    idx % 2 === 0 ? "bg-gray-50/50" : ""
                  }`}
                >
                  <TableCell className="py-4 px-4 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                      <span className="text-gray-800">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-700">{p.tat}</span>
                      {isBest(p.tat, bestTAT) && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs px-2 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Best
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-700">{p.wt}</span>
                      {isBest(p.wt, bestWT) && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs px-2 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Best
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-700">{p.rt}</span>
                      {isBest(p.rt, bestRT) && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs px-2 flex items-center gap-1">
                          <Award className="w-3 h-3" /> Best
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-gray-500 py-6"
                >
                  No processes yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <p className="mb-1">
                <strong>Performance Insights:</strong> The comparison shows
                which algorithm performs best for each metric with your current
                process set.
              </p>
              <p className="text-xs opacity-75">
                • CPU Utilization measures how efficiently the CPU is used (idle
                time vs busy time)
                <br />• Throughput indicates how many processes complete per
                unit time
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComparativeAnalysis;
