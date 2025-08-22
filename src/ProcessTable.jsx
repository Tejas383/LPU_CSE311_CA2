import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
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
} from "@/components/ui/dropdown-menu"

const ProcessTable = ({ process, setProcess }) => {
  // console.log(process);

  const handleDeleteEvent = (idx) => {
    const updated = [...process];
    updated.splice(idx, 1);
    setProcess(updated);
  }

  const [openRow, setOpenRow] = useState(null);

  return (
    <div className=" flex flex-col items-center justify-center bg-red-500/50 py-5 ">
      <Table className="">
        <TableHeader>
          <TableRow className="">
            <TableHead className="border border-white text-center">
              Process ID
            </TableHead>
            <TableHead className="border border-white text-center">
              Arrival Time
            </TableHead>
            <TableHead className="border border-white text-center">
              Burst Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {process.map((p, idx) => (
            <DropdownMenu
              key={idx}
              open={openRow === idx}
              onOpenChange={(isOpen) => setOpenRow(isOpen ? idx : null)}
            >
              <DropdownMenuTrigger asChild>
                <TableRow
                  className="cursor-pointer"
                  onClick={() => setOpenRow(idx)}
                >
                  <TableCell className="border border-white">{p.pid}</TableCell>
                  <TableCell className="border border-white">{p.at}</TableCell>
                  <TableCell className="border border-white">{p.bt}</TableCell>
                </TableRow>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDeleteEvent(idx)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProcessTable;