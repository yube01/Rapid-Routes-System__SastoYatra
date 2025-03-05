
interface Graph {
  [key: string]: { [key: string]: number };
}
export function dijkstra(graph: Graph, start: string, end: string) {
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

  let path = [];
  let step = end;
  while (step) {
    path.unshift(step);
    step = prev[step]!;
  }

  return { distance: distances[end], path };
}