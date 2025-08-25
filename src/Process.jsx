import React from 'react'
import ProcessForm from './ProcessForm'
import ProcessTable from './ProcessTable'
import { Button } from './components/ui/button'

const Process = ({process, setProcess, setCalculatedProcess}) => {
    const handleCalculate = () => {
        setCalculatedProcess([...process]);
    }
  return (
    <div>
      <ProcessForm  process={process} setProcess={setProcess} />
      <hr className='border border-black w-full' />
      <ProcessTable  process={process} setProcess={setProcess} />
      <Button onClick={handleCalculate}>Calculate</Button>
    </div>
  )
}

export default Process
