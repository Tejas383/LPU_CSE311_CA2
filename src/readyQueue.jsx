import React from "react";

const ReadyQueue = ({ readyQueue }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-500/50 w-full h-full">
      <h2 className="text-xl underline">Ready Queue</h2>
      <div className="flex flex-col gap-2 m-3">
        {readyQueue && readyQueue.length > 0 ? (
          readyQueue.map((rq, idx) => (
            <div key={idx} className="flex flex-row gap-2">
              <span className="font-bold">t={rq.time}:</span>
              <span>[ {rq.queue.join(", ") || "empty"} ]</span>
            </div>
          ))
        ) : (
          <div>No ready queue data</div>
        )}
      </div>
    </div>
  );
};

export default ReadyQueue;
