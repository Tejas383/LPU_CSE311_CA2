import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AlgorithmSelector = ({ setAlgorithm }) => {
  return (
    <div className="">
      <h2 className="mb-4 text-purple-900">Select Scheduling Algorithm</h2>
      <Select onValueChange={setAlgorithm} className="">
        <SelectTrigger className="w-full bg-white border-purple-200 focus:ring-purple-500">
          <SelectValue placeholder="Select algorithm" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="fcfs">First Come First Serve</SelectItem>
            <SelectItem value="sjf">Shortest Job First</SelectItem>
            <SelectItem value="priority-non-pre">
              Non-Preemptive Priority Scheduling
            </SelectItem>
            <SelectItem value="rr">Round Robin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AlgorithmSelector;
