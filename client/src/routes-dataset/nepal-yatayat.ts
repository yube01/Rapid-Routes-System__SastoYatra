import type { Graph, RouteInfo } from "./types";

// Purano Buspark - Chabahil bus route
export const puranoBusparkToChabahil: Graph = {
  Bhadrakali: { "Singha Durbar West Stop": { distance: 1.2, time: 5 } },
  "Singha Durbar West Stop": { Maitighar: { distance: 0.8, time: 4 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 6 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 8 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 6 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.3, time: 7 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.7, time: 9 } },
  "Tinkune Stop": { "Gairigaun Stop": { distance: 1.2, time: 6 } },
  "Gairigaun Stop": { "Sinamangal Ring Road Stop": { distance: 1.5, time: 7 } },
  "Sinamangal Ring Road Stop": {
    "Airport Bus Station": { distance: 1.0, time: 5 },
  },
  "Airport Bus Station": { "Gaushala Chok Stop": { distance: 1.3, time: 6 } },
  "Gaushala Chok Stop": { Chabahil: { distance: 1.1, time: 5 } },
  Chabahil: { "Gopikrishna Stop": { distance: 1.0, time: 4 } },
  "Gopikrishna Stop": { "Dhumbarahi Stop": { distance: 1.4, time: 7 } },
  "Dhumbarahi Stop": { "Chappalkarkhana Stop": { distance: 1.2, time: 6 } },
  "Chappalkarkhana Stop": { "Maharajgunj Chowk": { distance: 1.6, time: 8 } },
};

export const nepalYatayatRoutes: RouteInfo[] = [
  {
    name: "Purano Buspark - Chabahil",
    operator: "Nepal Yatayat",
    vehicleType: "bus",
    graph: puranoBusparkToChabahil,
  },
];
