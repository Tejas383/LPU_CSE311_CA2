import React from 'react'
import ResultsTable from './ResultsTable'
import GanttChart from './GanttChart'

const Results = ({process, ganttData}) => {
  return (
    <div className='flex flex-col items-center justify-center bg-red-500/50 w-full h-full gap-2'>
      <h2 className='font-bold text-2xl underline p-2'>Results</h2>
      <ResultsTable process={process} />
      <GanttChart gantt={ganttData} />
    </div>
  )
}

export default Results
