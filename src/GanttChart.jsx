import React from 'react'

const GanttChart = ({process}) => {
  return (
    <div className=' flex flex-col items-center justify-center bg-red-500/50 w-full h-full '>
      <h2 className=' text-xl underline '>Gantt Chart</h2>
      <div className='h-10 w-full bg-green-200 flex flex-row items-center justify-center m-3'>
        {process && process.length > 0 ? (
            process.map((p, idx) => (
            <div 
                key={idx} 
                className='flex-1 border border-black flex items-center justify-center'
            >
                {p.pid}
            </div>
            ))
        ) : (
            <div>No processes yet</div>
        )}
        </div>
    </div>
  )
}

export default GanttChart
