import { useState } from 'react'
import './App.css'
import AlgorithmSelector from './AlgorithmSelector';
import ProcessForm from './ProcessForm';
import Results from './Results';
import ProcessTable from './ProcessTable';

function App() {
  const [process, setProcess] = useState([]);

  return (
    <div className="App">
      <h1 className='text-6xl font-bold p-8'>CPU SCHEDULING SIMULATOR</h1>
      <div className=' flex gap-2 '>
        <div className='w-[30%] flex flex-col gap-1'>
          <ProcessForm  process={process} setProcess={setProcess} />
          <hr className='border border-black w-full' />
          <ProcessTable  process={process} />
        </div>
        <div className='flex flex-col items-center justify-center flex-1 gap-1'>
          <AlgorithmSelector  />
          <hr className='border border-black w-full' />
          <Results process={process} />
        </div>
      </div>
    </div>
  )
}

export default App
