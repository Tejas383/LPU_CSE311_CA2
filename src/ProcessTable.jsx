import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "./components/ui/card";

const ProcessTable = ({ process, setProcess, algorithm }) => {
  const handleDeleteEvent = (idx) => {
    const updated = [...process];
    updated.splice(idx, 1);
    setProcess(updated);
  };

  const [openRow, setOpenRow] = useState(null);

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-purple-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-purple-900">Process Table</h3>
      </div>
      {process.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No processes added yet. Add a process to get started.
        </div>
      ) : (
        <div className="rounded-lg border border-purple-200 overflow-hidden">
        <Table className="w-full table-auto">
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-blue-100 to-purple-100 ">
              <TableHead className="border border-gray-200 text-center">
                Process ID
              </TableHead>
              {algorithm === "priority-non-pre" && (
                <TableHead className="border border-gray-200 text-center">
                Priority
              </TableHead>
              )}
              <TableHead className="border border-gray-200 text-center">
                Arrival Time
              </TableHead>
              <TableHead className="border border-gray-200 text-center">
                Burst Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {process.map((p, idx) => (
              <DropdownMenu
                key={idx}
                open={openRow === idx}
                onOpenChange={(isOpen) => setOpenRow(isOpen ? idx : null)}
              >
                <DropdownMenuTrigger asChild>
                  <TableRow
                    className="cursor-pointer hover:bg-purple-100/50 text-center"
                    onClick={() => setOpenRow(idx)}
                  >
                    <TableCell className="border border-gray-200">
                      {p.pid}
                    </TableCell>
                    {algorithm === "priority-non-pre" && (
                      <TableCell className="border border-gray-200">
                      {p.pr}
                    </TableCell>
                    )}
                    <TableCell className="border border-gray-200">
                      {p.at}
                    </TableCell>
                    <TableCell className="border border-gray-200">
                      {p.bt}
                    </TableCell>
                  </TableRow>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-md">
                  <DropdownMenuItem onClick={() => handleDeleteEvent(idx)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </TableBody>
        </Table>
        </div>
      )}
    </Card>
  );
};

export default ProcessTable;
