import { useState, useEffect } from "react";
import "./App.css";
import Results from "./Results";
import Process from "./Process";
import Timer from "./Timer";

function App() {
  const [process, setProcess] = useState([]);
  const [calculatedProcess, setCalculatedProcess] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [readyQueue, setReadyQueue] = useState([]);
  const [algorithm, setAlgorithm] = useState(null);
  const [quantum, setQuantum] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (ganttData.length > 0) {
      const maxEnd = Math.max(...ganttData.map((p) => p.end));
      setTotalTime(maxEnd);
    }
  }, [ganttData]);

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-300 via-purple-100 to-pink-300">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3 justify-center">
            <h1 className="bg-gradient-to-r text-4xl font-bold from-blue-600 to-purple-400 bg-clip-text text-transparent">
              CPU SCHEDULING SIMULATOR
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
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
              setIsRunning={setIsRunning}
              setReset={setReset}
              isRunning={isRunning}
            />
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-1">
            <Timer
              isRunning={isRunning}
              onTick={setCurrentTime}
              totalTime={totalTime}
              setIsRunning={setIsRunning}
              reset={reset}
            />

            <Results
              calculatedProcess={calculatedProcess}
              ganttData={ganttData}
              readyQueue={readyQueue}
              currentTime={currentTime}
              reset={reset}
            />
          </div>
        </div>

        <div className="h-full w-full">
          <ComparativeAnalysis process={process} quantum={quantum} />
        </div>
      </main>

      <footer className="mt-16 py-6 text-center text-gray-600 border-t border-purple-100 bg-white/50">
        <p>Developed by Tejasvita | © 2025</p>
      </footer>
    </div>
  );
}

export default App;
