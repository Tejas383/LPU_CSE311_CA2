import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Results = ({process, setProcess}) => {
  return (
    <div className=' flex flex-col items-center justify-center bg-red-500/50 w-full h-full '>
      <h2 className='font-bold text-2xl underline p-2'>Results</h2>
      <Table className=''>
        <TableHeader>
          <TableRow className=''>
            <TableHead className='border border-white text-center'>Process ID</TableHead>
            <TableHead className='border border-white text-center'>Arrival Time</TableHead>
            <TableHead className='border border-white text-center'>Burst Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {process.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell className='border border-white'>{p.pid}</TableCell>
              <TableCell className='border border-white'>{p.at}</TableCell>
              <TableCell className='border border-white'>{p.bt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Results
