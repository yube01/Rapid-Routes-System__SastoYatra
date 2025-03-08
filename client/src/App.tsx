import React, { useState } from "react";
import { dijkstra } from "./algorithm";
import { lagankhelToNayaBuspark, mergedGraph, puranoBusparkToChabahil } from "./routes-dataset";



// Assign stops to their respective routes
const routeMappings: { [key: string]: string[] } = {};
const routeNames = ["Route 1", "Route 2", "Route 3"];

const allRoutes = [puranoBusparkToChabahil, lagankhelToNayaBuspark];

allRoutes.forEach((route, index) => {
  Object.keys(route).forEach((stop) => {
    if (!routeMappings[stop]) routeMappings[stop] = [];
    routeMappings[stop].push(routeNames[index]);
  });
});

// Get all unique stops for dropdown
const allStops = Array.from(new Set([...Object.keys(mergedGraph)]));



// Find transfer points where route changes
const findTransferPoints = (path: string[]) => {
  const transfers: string[] = [];
  let previousRoute = routeMappings[path[0]];

  for (let i = 1; i < path.length; i++) {
    const currentRoute = routeMappings[path[i]];

    // If the route changes at this stop, it's a transfer point
    if (currentRoute && previousRoute && currentRoute.join() !== previousRoute.join()) {
      transfers.push(path[i]);
    }

    previousRoute = currentRoute;
  }

  return transfers;
};

const BusRouteFinder: React.FC = () => {
  const [source, setSource] = useState<string>("Bhadrakali");
  const [destination, setDestination] = useState<string>("Naya Bus Park");
  const [route, setRoute] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [transferPoints, setTransferPoints] = useState<string[]>([]);

  const findRoute = () => {
    if (source === destination) {
      alert("Source and destination cannot be the same!");
      return;
    }

    const result = dijkstra(mergedGraph, source, destination);
    console.log(result)
    setRoute(result.path);
    setTotalDistance(result.distance ?? 0);
    setTotalTime(result.time ?? 0);

    // Find all transfer points
    const transfers = findTransferPoints(result.path);
    setTransferPoints(transfers);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Bus Route Finder</h2>

      <div>
        <label>Source: </label>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          {allStops.map((stop) => (
            <option key={stop} value={stop}>
              {stop}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Destination: </label>
        <select value={destination} onChange={(e) => setDestination(e.target.value)}>
          {allStops.map((stop) => (
            <option key={stop} value={stop}>
              {stop}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={findRoute}
        style={{ marginTop: "15px", padding: "10px 15px", cursor: "pointer" }}
      >
        Find Route
      </button>

      {route.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Route:</h3>
          <ul>
            {route.map((stop, index) => (
              <li key={index}>{stop}</li>
            ))}
          </ul>
          <p><strong>Total Distance:</strong> {totalDistance?.toFixed(2)} km</p>
          <p><strong>Total Time:</strong> {totalTime?.toFixed(2)} min</p>

          {transferPoints.length > 0 && (
            <p><strong>Transfers at:</strong> {transferPoints.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BusRouteFinder;
