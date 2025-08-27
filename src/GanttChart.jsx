import React from 'react'

const GanttChart = ({gantt}) => {
  return (
    <div className=' flex flex-col items-center justify-center bg-red-500/50 w-full h-full '>
      <h2 className=' text-xl underline '>Gantt Chart</h2>

      <div className='h-10 w-full flex flex-row items-center justify-center m-3'>
        {gantt && gantt.length > 0 ? (
            gantt.map((p, idx) => (
            <div 
                key={idx} 
                className='flex flex-col items-center justify-center bg-green-200'
                style={{
                    width: `${(p.end - p.start) * 40}px`
                }}
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
