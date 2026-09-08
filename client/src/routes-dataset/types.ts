export interface Graph {
  [key: string]: { [key: string]: { distance: number; time: number } };
}

export type VehicleType = "bus" | "micro" | "tempo";

export interface RouteInfo {
  name: string;
  operator: string;
  vehicleType: VehicleType;
  graph: Graph;
}
