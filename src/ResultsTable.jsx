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
        <Table className="text-center w-full table-auto">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-100 to-purple-100 text-center">
                <TableHead className="text-center border border-gray-200">Process ID</TableHead>
                {algorithm === "priority-non-pre" && (
                  <TableHead className="text-center border border-gray-200">Priority</TableHead>
                )}
                <TableHead className="text-center border border-gray-200">Arrival Time</TableHead>
                <TableHead className="text-center border border-gray-200">Burst Time</TableHead>
                <TableHead className="text-center border border-gray-200">Completion Time</TableHead>
                <TableHead className="text-center border border-gray-200">Turn Around Time</TableHead>
                <TableHead className="text-center border border-gray-200">Waiting Time</TableHead>
                <TableHead className="text-center border border-gray-200">Response Time</TableHead>
              </TableRow>
            </TableHeader>
          <TableBody className="bg-white">
            {calculatedProcess && calculatedProcess.length > 0 ? (
              calculatedProcess.map((p, idx) => (
                <TableRow key={idx} className="hover:bg-purple-100/50 text-center">
                  <TableCell className="border border-gray-200">{p.pid}</TableCell>
                  {algorithm === "priority-non-pre" && (
                    <TableCell className="border border-gray-200">{p.pr}</TableCell>
                  )}
                  <TableCell className="border border-gray-200">{p.at}</TableCell>
                  <TableCell className="border border-gray-200">{p.bt}</TableCell>
                  <TableCell className="border border-gray-200">
                    {p.ct ?? "-"}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {p.tat ?? "-"}
                  </TableCell>
                  <TableCell className="border border-gray-200">
                    {p.wt ?? "-"}
                  </TableCell>
                  <TableCell className="border border-gray-200">
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
