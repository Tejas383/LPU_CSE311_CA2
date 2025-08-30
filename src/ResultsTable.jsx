import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ResultsTable = ({ process, setProcess }) => {
  return (
    <div className=" flex flex-col items-center justify-center bg-red-500/50 w-full h-full ">
      <Table className="">
        <TableHeader>
          <TableRow className="">
            <TableHead className="border border-white text-center">
              Process ID
            </TableHead>
            <TableHead className="border border-white text-center">
              Priority
            </TableHead>
            <TableHead className="border border-white text-center">
              Arrival Time
            </TableHead>
            <TableHead className="border border-white text-center">
              Burst Time
            </TableHead>
            <TableHead className="border border-white text-center">
              Completion Time
            </TableHead>
            <TableHead className="border border-white text-center">
              Turn Around Time
            </TableHead>
            <TableHead className="border border-white text-center">
              Waiting Time
            </TableHead>
            <TableHead className="border border-white text-center">
              Response Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {process && process.length > 0 ? (
            process.map((p, idx) => (
              <TableRow key={idx}>
                <TableCell className="border border-white">{p.pid}</TableCell>
                <TableCell className="border border-white">{p.pr}</TableCell>
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
  );
};

export default ResultsTable;
