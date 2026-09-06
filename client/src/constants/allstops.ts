import { allRoutes, mergedGraph } from "@/routes-dataset";
export const routeMappings: { [key: string]: string[] } = {};

allRoutes.forEach((route) => {
  Object.keys(route.graph).forEach((stop) => {
    if (!routeMappings[stop]) routeMappings[stop] = [];
    routeMappings[stop].push(route.name);
  });
});

export const allStops = Array.from(new Set([...Object.keys(mergedGraph)]));
