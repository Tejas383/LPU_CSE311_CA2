import { useState } from "react";
import "./App.css";
import Results from "./Results";
import Process from "./Process";
import { GanttChart } from "lucide-react";
import ComparativeAnalysis from "./ComparativeAnalysis";

function App() {
  const [process, setProcess] = useState([]);
  const [calculatedProcess, setCalculatedProcess] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [readyQueue, setReadyQueue] = useState([]);
  const [algorithm, setAlgorithm] = useState(null);
  const [quantum, setQuantum] = useState(2);

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-300 via-purple-100 to-pink-300">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 justify-center">
            {/* <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            </div> */}
            <h1 className="bg-gradient-to-r text-4xl font-bold from-blue-600 to-purple-400 bg-clip-text text-transparent">
              CPU SCHEDULING SIMULATOR
            </h1>
          </div>
        </div>
      </header>
      <div className=" flex gap-2 ">
        <div className="w-[30%] flex flex-col gap-1">
          <Process
            process={process}
            setProcess={setProcess}
            setCalculatedProcess={setCalculatedProcess}
            setGanttData={setGanttData}
            setReadyQueue={setReadyQueue}
            setAlgorithm={setAlgorithm}
            algorithm={algorithm}
            quantum={quantum}
            setQuantum={setQuantum}
          />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 gap-1">
          <hr className="border border-black w-full" />
          <Results
            process={calculatedProcess}
            ganttData={ganttData}
            readyQueue={readyQueue}
          />
        </div>
      </div>
      <div className="bg-green-200 h-full w-full">
        <ComparativeAnalysis process={process} quantum={quantum} />
      </div>
    </div>
  );
}

export default App;
