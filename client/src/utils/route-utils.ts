import { allRoutes, mergedGraph } from "@/routes-dataset";
import type { RouteInfo, VehicleType } from "@/routes-dataset";

export interface RouteSegment {
  stops: string[];
  routeName: string;
  operator: string;
  vehicleType: VehicleType;
  segmentDistance: number;
  segmentTime: number;
  segmentFare: number;
}

/**
 * Given an edge (fromStop → toStop), find which RouteInfo contains it.
 * We check both forward (fromStop → toStop) and reverse (toStop → fromStop)
 * directions since routes are used bidirectionally.
 */
const findRouteForEdge = (
  fromStop: string,
  toStop: string
): RouteInfo | null => {
  for (const route of allRoutes) {
    const graph = route.graph;
    // Forward direction
    if (graph[fromStop] && graph[fromStop][toStop]) {
      return route;
    }
    // Reverse direction (bidirectional)
    if (graph[toStop] && graph[toStop][fromStop]) {
      return route;
    }
  }
  return null;
};

/**
 * Calculate fare for a given distance using Kathmandu Valley tiered brackets.
 */
export const calculateSegmentFare = (distance: number): number => {
  if (distance <= 0) return 0;
  if (distance <= 5) return 20;
  if (distance <= 10) return 25;
  if (distance <= 15) return 30;
  if (distance <= 20) return 35;
  return 33 + Math.ceil(distance - 20) * 2;
};

/**
 * Get edge weight (distance and time) between two consecutive stops
 * from the merged graph (which is bidirectional after Dijkstra processes it).
 */
const getEdgeWeight = (
  from: string,
  to: string
): { distance: number; time: number } => {
  // Check forward
  if (mergedGraph[from] && mergedGraph[from][to]) {
    return mergedGraph[from][to];
  }
  // Check reverse (bidirectional)
  if (mergedGraph[to] && mergedGraph[to][from]) {
    return mergedGraph[to][from];
  }
  return { distance: 0, time: 0 };
};

/**
 * Build route segments from a path.
 * Splits the path into contiguous segments where each segment is served
 * by the same bus operator/route. Transfer points are where one segment
 * ends and another begins.
 */
export const buildRouteSegments = (path: string[]): RouteSegment[] => {
  if (path.length < 2) return [];

  const segments: RouteSegment[] = [];
  let currentRoute = findRouteForEdge(path[0], path[1]);
  let currentStops: string[] = [path[0]];
  let currentDistance = 0;
  let currentTime = 0;

  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];
    const edgeRoute = findRouteForEdge(from, to);
    const edge = getEdgeWeight(from, to);

    // Check if we're switching to a different route (transfer point)
    if (
      edgeRoute &&
      currentRoute &&
      edgeRoute.name !== currentRoute.name
    ) {
      // Close the current segment
      const fare = calculateSegmentFare(currentDistance);
      segments.push({
        stops: [...currentStops],
        routeName: currentRoute.name,
        operator: currentRoute.operator,
        vehicleType: currentRoute.vehicleType,
        segmentDistance: currentDistance,
        segmentTime: currentTime,
        segmentFare: fare,
      });

      // Start a new segment (transfer stop is included in both segments)
      currentRoute = edgeRoute;
      currentStops = [from];
      currentDistance = 0;
      currentTime = 0;
    }

    // If currentRoute is null (first edge couldn't find a route), use edgeRoute
    if (!currentRoute && edgeRoute) {
      currentRoute = edgeRoute;
    }

    currentStops.push(to);
    currentDistance += edge.distance;
    currentTime += edge.time;
  }

  // Close the final segment
  if (currentRoute && currentStops.length > 0) {
    const fare = calculateSegmentFare(currentDistance);
    segments.push({
      stops: [...currentStops],
      routeName: currentRoute.name,
      operator: currentRoute.operator,
      vehicleType: currentRoute.vehicleType,
      segmentDistance: currentDistance,
      segmentTime: currentTime,
      segmentFare: fare,
    });
  }

  return segments;
};

/**
 * Calculate total fare with transfer awareness.
 * Each bus segment = separate fare payment.
 */
export const calculateTotalFareWithTransfers = (
  segments: RouteSegment[]
): number => {
  return segments.reduce((total, seg) => total + seg.segmentFare, 0);
};

/**
 * Calculate single-ride fare (no transfer penalty — treat as one continuous ride).
 */
export const calculateSingleFare = (totalDistance: number): number => {
  return calculateSegmentFare(totalDistance);
};

/**
 * Get total number of transfers in a route.
 */
export const getTransferCount = (segments: RouteSegment[]): number => {
  return Math.max(0, segments.length - 1);
};

/**
 * Get the vehicle type emoji for display.
 */
export const getVehicleEmoji = (type: VehicleType): string => {
  switch (type) {
    case "bus":
      return "🚌";
    case "micro":
      return "🚐";
    case "tempo":
      return "🛺";
    default:
      return "🚌";
  }
};
