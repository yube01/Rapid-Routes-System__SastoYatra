import {
  lagankhelToNayaBuspark,
  puranoBusparkToChabahil,
} from "./routes-dataset";
interface Graph {
  [key: string]: { [key: string]: number };
}
export function dijkstraWithSwitching(
    graph1: Graph,
    graph2: Graph,
    start: string,
    end: string
  ): { distance: number; path: string[]; switches: { stop: string; fromRoute: string; toRoute: string }[] } {
    const combinedGraph: Graph = { ...graph1, ...graph2 };
    const distances: { [key: string]: number } = {};
    const visited: { [key: string]: boolean } = {};
    const previous: { [key: string]: { stop: string; route: string } | null } = {} as { [key: string]: { stop: string; route: string } | null };
    const queue: string[] = [];
  
    // Initialize distances and previous
    for (const vertex in combinedGraph) {
      distances[vertex] = Infinity;
      previous[vertex] = null;
    }
    distances[start] = 0;
    queue.push(start);
  
    while (queue.length > 0) {
      const currentVertex = queue.shift()!;
      if (visited[currentVertex]) continue;
      visited[currentVertex] = true;
  
      // Check if the current vertex is in both graphs (switching point)
      const isSwitchingPoint = Object.keys(graph1).includes(currentVertex) && Object.keys(graph2).includes(currentVertex);
  
      // Explore neighbors in both graphs
      for (const neighbor in combinedGraph[currentVertex]) {
        const distance = distances[currentVertex] + combinedGraph[currentVertex][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = { stop: currentVertex, route: isSwitchingPoint ? "Both" : "Single" };
          queue.push(neighbor);
        }
      }
    }
  
    // Reconstruct the path and identify switches
    const path: string[] = [];
    const switches: { stop: string; fromRoute: string; toRoute: string }[] = [];
    let current: string | null = end;
    while (current !== null) {
      path.unshift(current);
      const prev: { stop: string; route: string } | null = previous[current];
      if (prev && prev.route === "Both") {
        switches.push({
          stop: current,
          fromRoute: graph1[prev.stop] ? "Purano Buspark - Chabahil" : "Lagankhel - Naya Buspark",
          toRoute: graph1[current] ? "Purano Buspark - Chabahil" : "Lagankhel - Naya Buspark",
        });
      }
      current = prev ? prev.stop : null;
    }
  
    return { distance: distances[end], path, switches };
  }
export const combinedGraph: Graph = {
  ...puranoBusparkToChabahil,
  ...lagankhelToNayaBuspark,
};
