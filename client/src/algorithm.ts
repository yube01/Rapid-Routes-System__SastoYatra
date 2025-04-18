interface Edge {
  distance: number; // in kilometers
  time: number; // in minutes
}

interface Graph {
  [key: string]: { [key: string]: Edge };
}

const makeGraphBidirectional = (graph: Graph) => {
  const bidirectionalGraph: Graph = {};

  for (const stop in graph) {
    if (!bidirectionalGraph[stop]) bidirectionalGraph[stop] = {};

    for (const neighbor in graph[stop]) {
      bidirectionalGraph[stop][neighbor] = graph[stop][neighbor];

      if (!bidirectionalGraph[neighbor]) bidirectionalGraph[neighbor] = {};
      bidirectionalGraph[neighbor][stop] = graph[stop][neighbor]; // Make the connection bidirectional
    }
  }

  return bidirectionalGraph;
};

export const dijkstra = (graph: Graph, start: string, end: string) => {
  const bidirectionalGraph = makeGraphBidirectional(graph); // Ensure all routes work both ways
  const distances: { [key: string]: number } = {};
  const times: { [key: string]: number } = {};
  const prev: { [key: string]: string | null } = {};
  const pq: [string, number][] = [];
  const visited: Set<string> = new Set();

  for (const node in bidirectionalGraph) {
    distances[node] = Infinity;
    times[node] = Infinity;
    prev[node] = null;
  }

  distances[start] = 0;
  times[start] = 0;
  pq.push([start, 0]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[1] - b[1]);
    const [current, currentDist] = pq.shift()!;

    if (visited.has(current)) continue;
    visited.add(current);

    if (current === end) break;

    for (const neighbor in bidirectionalGraph[current]) {
      const edge = bidirectionalGraph[current][neighbor];
      const newDist = currentDist + edge.distance;
      const newTime = times[current] + edge.time;

      if (newDist < distances[neighbor] || newTime < times[neighbor]) {
        distances[neighbor] = newDist;
        times[neighbor] = newTime;
        prev[neighbor] = current;
        pq.push([neighbor, newDist]);
      }
    }
  }

  return distances[end] !== Infinity
    ? { distance: distances[end], time: times[end], path: buildPath(prev, end) }
    : {
        message: `No direct route to ${end}.`,
        path: [],
      };
};

// Helper function to build the path
const buildPath = (
  prev: { [key: string]: string | null },
  destination: string
) => {
  const path: string[] = [];
  let step: string | null = destination;
  while (step) {
    path.unshift(step);
    step = prev[step];
  }
  return path;
};
