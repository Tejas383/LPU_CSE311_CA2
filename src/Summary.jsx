import React from 'react'
import { Card } from './components/ui/card'
import { TrendingUp, Clock, Timer } from 'lucide-react';

const Summary = ({ calculatedProcess }) => {

  const n = calculatedProcess.length;
  const averageTAT = n
    ? (calculatedProcess.reduce((sum, p) => sum + (p.tat ?? 0), 0) / n).toFixed(
        2
      )
    : 0;
  const averageWT = n
    ? (calculatedProcess.reduce((sum, p) => sum + (p.wt ?? 0), 0) / n).toFixed(
        2
      )
    : 0;
  const averageRT = n
    ? (calculatedProcess.reduce((sum, p) => sum + (p.rt ?? 0), 0) / n).toFixed(
        2
      )
    : 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl border-0">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5" />
        <h3>Performance Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            <p className="text-sm opacity-90">Avg Waiting Time</p>
          </div>
          <p className="text-2xl">{averageWT}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-4 h-4" />
            <p className="text-sm opacity-90">Avg Turnaround Time</p>
          </div>
          <p className="text-2xl">{averageTAT}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <p className="text-sm opacity-90">Average Response Time</p>
          </div>
          <p className="text-2xl">{averageRT}</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg text-sm">
        <p className="opacity-90">
          <strong>Lower is better:</strong> Waiting time indicates how long processes wait before
          execution. Turnaround time shows total time from arrival to completion.
        </p>
      </div>
    </Card>
  )
}

export default Summary
