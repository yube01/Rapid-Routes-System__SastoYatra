import React, { useState } from "react";
import { combinedGraph, dijkstraWithSwitching } from "./algorithm";
import { lagankhelToNayaBuspark, puranoBusparkToChabahil } from "./routes-dataset";




const App: React.FC = () => {
  const [startStop, setStartStop] = useState<string>("Bhadrakali");
  const [endStop, setEndStop] = useState<string>("Maharajgunj Chowk");
  const [result, setResult] = useState<{ distance: number; path: string[] } | null>(null);

  const handleCalculateDistance = () => {
    const shortestDistance = dijkstraWithSwitching(puranoBusparkToChabahil, lagankhelToNayaBuspark, startStop, endStop);
    setResult(shortestDistance);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Bus Route Distance Finder</h1>
      <div>
        <label>
          Start Stop:
          <select
            value={startStop}
            onChange={(e) => setStartStop(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            {Object.keys(combinedGraph).map((stop) => (
              <option key={stop} value={stop}>
                {stop}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          End Stop:
          <select
            value={endStop}
            onChange={(e) => setEndStop(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            {Object.keys(combinedGraph).map((stop) => (
              <option key={stop} value={stop}>
                {stop}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={handleCalculateDistance}
        style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
      >
        Calculate Distance
      </button>
      {result !== null && (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
          <strong>Shortest Distance:</strong> {result.distance.toFixed(2)} km
          <br />
          <strong>Route:</strong> {result.path.join(" → ")}
        </div>
      )}
    </div>
  );
};

export default App;