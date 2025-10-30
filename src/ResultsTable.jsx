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
import { Clock } from "lucide-react";

const ResultsTable = ({ calculatedProcess, algorithm }) => {
  if (calculatedProcess.length === 0) {
    return (
      <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-600" />
          <h3 className="text-purple-900">Process Timing Details</h3>
        </div>
        <div className="text-center py-12 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Results will appear here after simulation</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-purple-600" />
        <h3 className="text-purple-900">Process Timing Details</h3>
      </div>

      <div className="rounded-lg border border-purple-200 overflow-hidden">
        <Table className="text-center">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-100 to-purple-100 text-center">
              <TableHead className="text-center">Process ID</TableHead>
              {algorithm === "priority-non-pre" && (
                <TableHead className="text-center">Priority</TableHead>
              )}
              <TableHead className="text-center">Arrival Time</TableHead>
              <TableHead className="text-center">Burst Time</TableHead>
              <TableHead className="text-center">Completion Time</TableHead>
              <TableHead className="text-center">Turn Around Time</TableHead>
              <TableHead className="text-center">Waiting Time</TableHead>
              <TableHead className="text-center">Response Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calculatedProcess && calculatedProcess.length > 0 ? (
              calculatedProcess.map((p, idx) => (
                <TableRow key={idx} className="hover:bg-purple-100/50 text-center">
                  <TableCell className="border border-white">{p.pid}</TableCell>
                  {algorithm === "priority-non-pre" && (
                    <TableCell className="border border-white">{p.pr}</TableCell>
                  )}
                  <TableCell className="border border-white">{p.at}</TableCell>
                  <TableCell className="border border-white">{p.bt}</TableCell>
                  <TableCell className="border border-white">
                    {p.ct ?? "-"}
                  </TableCell>
                  <TableCell className="border border-white">
                    {p.tat ?? "-"}
                  </TableCell>
                  <TableCell className="border border-white">
                    {p.wt ?? "-"}
                  </TableCell>
                  <TableCell className="border border-white">
                    {p.rt ?? "-"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No processes yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ResultsTable;
