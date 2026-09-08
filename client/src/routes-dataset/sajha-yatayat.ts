import type { Graph, RouteInfo } from "./types";

// Lagankhel - Naya Buspark (Ringroad) bus route
export const lagankhelToNayaBuspark: Graph = {
  "Lagankhel Stop": { "Batuk Bhairav": { distance: 1.0, time: 4 } },
  "Batuk Bhairav": { "Lalitpur Industrial Estate": { distance: 0.8, time: 3 } },
  "Lalitpur Industrial Estate": { Satdobato: { distance: 1.2, time: 5 } },
  Satdobato: { "B & B Hospital/KCM Stop": { distance: 0.7, time: 3 } },
  "B & B Hospital/KCM Stop": { "Gwarko Chok": { distance: 0.9, time: 4 } },
  "Gwarko Chok": { "Koteshwar Stop": { distance: 2.5, time: 10 } },
  "Koteshwar Stop": { "Gairigaun Stop": { distance: 1.0, time: 4 } },
  "Gairigaun Stop": { "Sinamangal Ring Road Stop": { distance: 0.8, time: 3 } },
  "Sinamangal Ring Road Stop": {
    "Airport Bus Station": { distance: 1.0, time: 4 },
  },
  "Airport Bus Station": { Chabahil: { distance: 1.5, time: 6 } },
  Chabahil: { "Gopi Krishna Stop": { distance: 0.1, time: 1 } },
  "Gopi Krishna Stop": { "Sukedhara Stop": { distance: 1.0, time: 4 } },
  "Sukedhara Stop": { "Chapal Karkhana Stop": { distance: 0.9, time: 4 } },
  "Chapal Karkhana Stop": { "Narayan Gopal Chok": { distance: 1.1, time: 5 } },
  "Narayan Gopal Chok": { Basundhara: { distance: 0.8, time: 4 } },
  Basundhara: { "Samakhusi Stop": { distance: 1.2, time: 5 } },
  "Samakhusi Stop": { "Gongabu Chok": { distance: 1.0, time: 4 } },
  "Gongabu Chok": { "Naya Bus Park": { distance: 0.5, time: 2 } },
};

// Chakrapath - Parikrama (Ring Road) bus route
export const chakrapathParikrama: Graph = {
  "Gaushala Chowk Stop": { "Gopi Krishna Stop": { distance: 0.8, time: 3 } },
  "Gopi Krishna Stop": { "Sukedhara Stop": { distance: 1.0, time: 4 } },
  "Sukedhara Stop": { "Dhumbarahi Stop": { distance: 1.2, time: 5 } },
  "Dhumbarahi Stop": { "Chappal Karkhana Stop": { distance: 1.1, time: 4 } },
  "Chappal Karkhana Stop": { "Narayan Gopal Stop": { distance: 1.3, time: 5 } },
  "Narayan Gopal Stop": { "Basundhara Stop": { distance: 1.0, time: 4 } },
  "Basundhara Stop": { "Samakhushi Stop": { distance: 1.2, time: 5 } },
  "Samakhushi Stop": { "Gongabu Stop": { distance: 1.0, time: 4 } },
  "Gongabu Stop": { "Macchapokhari Stop": { distance: 0.9, time: 3 } },
  "Macchapokhari Stop": { "Balaju Stop": { distance: 1.1, time: 5 } },
  "Balaju Stop": { "Banasthali Stop": { distance: 1.2, time: 5 } },
  "Banasthali Stop": { "Dhungedhara Stop": { distance: 1.0, time: 4 } },
  "Dhungedhara Stop": { "Sano Bharyang": { distance: 1.3, time: 5 } },
  "Sano Bharyang": { "Thulo Bharyang": { distance: 1.1, time: 4 } },
  "Thulo Bharyang": { "Swyambhu Stop": { distance: 1.5, time: 6 } },
  "Swyambhu Stop": { "Kalanki Chowk": { distance: 2.0, time: 8 } },
  "Kalanki Chowk": { Khasibazaar: { distance: 1.0, time: 4 } },
  Khasibazaar: { Balkhu: { distance: 1.1, time: 5 } },
  Balkhu: { "Sanepa Height": { distance: 1.5, time: 6 } },
  "Sanepa Height": { Ekantakuna: { distance: 1.3, time: 5 } },
  Ekantakuna: { "Satdobato Stop": { distance: 1.2, time: 5 } },
  "Satdobato Stop": { "Gwarko Stop": { distance: 1.1, time: 4 } },
  "Gwarko Stop": { "Koteshwor Stop": { distance: 2.0, time: 8 } },
  "Koteshwor Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Sinamangal Stop": { distance: 1.3, time: 5 } },
  "Sinamangal Stop": { Pinglasthan: { distance: 1.0, time: 4 } },
  Pinglasthan: { Gaushala: { distance: 0.8, time: 3 } },
};

export const sajhaYatayatRoutes: RouteInfo[] = [
  {
    name: "Lagankhel - Naya Buspark (Ringroad)",
    operator: "Sajha Yatayat",
    vehicleType: "bus",
    graph: lagankhelToNayaBuspark,
  },
  {
    name: "Chakrapath Parikrama (Ring Road)",
    operator: "Sajha Yatayat",
    vehicleType: "bus",
    graph: chakrapathParikrama,
  },
];
