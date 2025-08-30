import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const AlgorithmSelector = ({algorithm, setAlgorithm}) => {
  return (
    <div className='flex flex-col items-center justify-center bg-red-500/50 w-full p-5'>
      <h2 className='font-bold text-2xl underline p-2'>Algorithm</h2>
      <p>Select the algorithm: </p>
      <Select onValueChange={setAlgorithm} className=''>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select the algorithm" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Algorithms</SelectLabel>
            <SelectItem value="fcfs">First Come First Serve</SelectItem>
            <SelectItem value="sjf">Shortest Job First</SelectItem>
            <SelectItem value="priority-non-pre">Non-Preemptive Priority Scheduling</SelectItem>
            <SelectItem value="rr">Round Robin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default AlgorithmSelector