import React, { useState } from "react";

interface Graph {
  [key: string]: { [key: string]: number };
}

// Bus route data
const puranoBusparkToChabahil: Graph = {
  Bhadrakali: { "Singha Durbar West Stop": 1.2 },
  "Singha Durbar West Stop": { Maitighar: 0.8 },
  Maitighar: { "Lagankhel Stop": 1.1 },
};

const lagankhelToNayaBuspark: Graph = {
  "Lagankhel Stop": { "Batuk Bhairav": 1.0 },
  "Batuk Bhairav": { "Lalitpur Industrial Estate": 0.8 },
  "Lalitpur Industrial Estate": { Satdobato: 1.2 },
  Satdobato: { "B & B Hospital/KCM Stop": 0.7 },
};

const lagankhelToNayaBusparks: Graph = {
  "B & B Hospital/KCM Stop": { "Narayan Gopal Chok": 1.0 },
  "Narayan Gopal Chok": { "Samakhusi Stop": 1.2 },
  "Samakhusi Stop": { "Gongabu Chok": 1.0 },
  "Gongabu Chok": { "Naya Bus Park": 0.5 },
};

// Merge all bus routes into one graph
const mergedGraph: Graph = {
  ...puranoBusparkToChabahil,
  ...lagankhelToNayaBuspark,
  ...lagankhelToNayaBusparks
};

// Assign stops to their respective routes
const routeMappings: { [key: string]: string[] } = {};
const routeNames = ["Route 1", "Route 2", "Route 3"];

const allRoutes = [puranoBusparkToChabahil, lagankhelToNayaBuspark, lagankhelToNayaBusparks];

allRoutes.forEach((route, index) => {
  Object.keys(route).forEach((stop) => {
    if (!routeMappings[stop]) routeMappings[stop] = [];
    routeMappings[stop].push(routeNames[index]);
  });
});

// Get all unique stops for dropdown
const allStops = Array.from(new Set([...Object.keys(mergedGraph)]));

// Dijkstra's Algorithm for shortest path
const dijkstra = (graph: Graph, start: string, end: string) => {
  const distances: { [key: string]: number } = {};
  const prev: { [key: string]: string | null } = {};
  const pq: [string, number][] = [];

  for (let node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }

  distances[start] = 0;
  pq.push([start, 0]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[1] - b[1]); // Sort by distance
    const [current, currentDist] = pq.shift()!;

    if (current === end) break;

    for (let neighbor in graph[current]) {
      let newDist = currentDist + graph[current][neighbor];

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        prev[neighbor] = current;
        pq.push([neighbor, newDist]);
      }
    }
  }

  let path: string[] = [];
  let step: string | null = end;
  while (step) {
    path.unshift(step);
    step = prev[step];
  }

  return { distance: distances[end], path };
};

// Find transfer points where route changes
const findTransferPoints = (path: string[]) => {
  let transfers: string[] = [];
  let previousRoute = routeMappings[path[0]];

  for (let i = 1; i < path.length; i++) {
    let currentRoute = routeMappings[path[i]];

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
  const [transferPoints, setTransferPoints] = useState<string[]>([]);

  const findRoute = () => {
    if (source === destination) {
      alert("Source and destination cannot be the same!");
      return;
    }

    const result = dijkstra(mergedGraph, source, destination);
    setRoute(result.path);
    setTotalDistance(result.distance);

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
          {transferPoints.length > 0 && (
            <p><strong>Transfers at:</strong> {transferPoints.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BusRouteFinder;
