import { useState } from 'react'
import './App.css'
import AlgorithmSelector from './AlgorithmSelector';
import ProcessForm from './ProcessForm';
import Results from './Results';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1 className='text-6xl font-bold p-8'>CPU SCHEDULING SIMULATOR</h1>
      <div className=' flex gap-2 '>
        <ProcessForm  />
        <div className='flex flex-col items-center justify-center flex-1 gap-1'>
          <AlgorithmSelector  />
          <hr className='border border-black w-full' />
          <Results />
        </div>
      </div>
    </div>
  )
}

export default App
