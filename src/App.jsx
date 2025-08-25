import { useState } from 'react'
import './App.css'
import AlgorithmSelector from './AlgorithmSelector';
import Results from './Results';
import Process from './Process';

function App() {
  const [process, setProcess] = useState([]);
  const [calculatedProcess, setCalculatedProcess] = useState([]);
  const [algorithm, setAlgorithm] = useState(null);

  return (
    <div className="App">
      <h1 className='text-6xl font-bold pb-8'>CPU SCHEDULING SIMULATOR</h1>
      <div className=' flex gap-2 '>
        <div className='w-[30%] flex flex-col gap-1'>
          <Process 
            process={process} 
            setProcess={setProcess} 
            setCalculatedProcess={setCalculatedProcess} 
          />
        </div>
        <div className='flex flex-col items-center justify-center flex-1 gap-1'>
          <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
          <hr className='border border-black w-full' />
          <Results process={calculatedProcess} setProcess={setCalculatedProcess} />
        </div>
      </div>
    </div>
  )
}

export default App
