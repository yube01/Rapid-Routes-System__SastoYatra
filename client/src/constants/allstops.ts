import { allRoutes, mergedGraph } from "@/routes-dataset";
export const routeMappings: { [key: string]: string[] } = {};
const routeNames = ["Route 1", "Route 2", "Route 3"];

allRoutes.forEach((route, index) => {
  Object.keys(route).forEach((stop) => {
    if (!routeMappings[stop]) routeMappings[stop] = [];
    routeMappings[stop].push(routeNames[index]);
  });
});

export const allStops = Array.from(new Set([...Object.keys(mergedGraph)]));
