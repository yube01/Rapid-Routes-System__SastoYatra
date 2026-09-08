import type { Graph, RouteInfo } from "./types";
import { nepalYatayatRoutes } from "./nepal-yatayat";
import { sajhaYatayatRoutes } from "./sajha-yatayat";
import { mahanagarYatayatRoutes } from "./mahanagar-yatayat";

// Re-export types
export * from "./types";

// Re-export individual operator modules
export * from "./nepal-yatayat";
export * from "./sajha-yatayat";
export * from "./mahanagar-yatayat";
export * from "./other-routes";

/**
 * Filtered bus routes: only Nepal Yatayat, Sajha Yatayat, and Mahanagar Yatayat
 * with vehicleType: "bus".
 */
export const allRoutes: RouteInfo[] = [
  ...nepalYatayatRoutes,
  ...sajhaYatayatRoutes,
  ...mahanagarYatayatRoutes,
];

// Helper: extract just the graphs from allRoutes (for backward compatibility)
export const allRouteGraphs: Graph[] = allRoutes.map((r) => r.graph);

/**
 * Merge multiple graphs preserving and extending node connections.
 */
export const mergeMultipleGraphs = (...graphs: Graph[]): Graph => {
  const merged: Graph = {};

  for (const graph of graphs) {
    for (const node in graph) {
      if (!merged[node]) {
        merged[node] = { ...graph[node] };
      } else {
        // Merge connections while preserving existing ones
        merged[node] = { ...merged[node], ...graph[node] };
      }
    }
  }

  return merged;
};

// Merge all active bus routes into one unified graph
export const mergedGraph: Graph = mergeMultipleGraphs(...allRouteGraphs);
