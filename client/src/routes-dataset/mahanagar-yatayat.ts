import type { Graph, RouteInfo } from "./types";

// Kalanki - TIA Airport bus route
export const kalankiToAirport: Graph = {
  "Kalanki Chowk": { Kalimati: { distance: 1.8, time: 7 } },
  Kalimati: { Tripureshwar: { distance: 1.5, time: 6 } },
  Tripureshwar: { Thapathali: { distance: 1.2, time: 5 } },
  Thapathali: { "Maitighar Stop--South": { distance: 1.0, time: 4 } },
  "Maitighar Stop--South": { Maitighar: { distance: 0.5, time: 2 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 5 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 4 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.3, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.7, time: 7 } },
  "Tinkune Stop": { Gairigaun: { distance: 1.2, time: 5 } },
  Gairigaun: { "Sinamangal Stop": { distance: 1.5, time: 6 } },
  "Sinamangal Stop": { "Airport Bus Station": { distance: 1.0, time: 4 } },
};

// Naikap - Kausaltar bus route
export const naikapToKausaltar: Graph = {
  Naikap: { "Kalanki Chowk": { distance: 1.5, time: 6 } },
  "Kalanki Chowk": { Kalimati: { distance: 0.8, time: 3 } },
  Kalimati: { Tripureshwor: { distance: 1.0, time: 4 } },
  Tripureshwor: { Thapathali: { distance: 0.7, time: 3 } },
  Thapathali: { "Maitighar Stop--South": { distance: 0.5, time: 2 } },
  "Maitighar Stop--South": { Maitighar: { distance: 0.4, time: 2 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 4 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 4 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.2, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Koteshwar Stop": { distance: 1.0, time: 4 } },
  "Koteshwar Stop": { Jadibuti: { distance: 1.3, time: 5 } },
  Jadibuti: { Lokanthali: { distance: 1.0, time: 4 } },
  Lokanthali: { Kausaltar: { distance: 1.2, time: 5 } },
};

// Bhadrakali - Panauti bus route
export const bhadrakaliToPanauti: Graph = {
  Bhadrakali: { "Singha Durbar West Stop": { distance: 1.0, time: 4 } },
  "Singha Durbar West Stop": { Maitighar: { distance: 0.8, time: 3 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 4 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 4 },
  },
  "Minbhawan Stop": { "Tinkune Stop": { distance: 1.2, time: 5 } },
  "Tinkune Stop": { Jadibuti: { distance: 1.0, time: 4 } },
  Jadibuti: { Kausaltar: { distance: 1.3, time: 5 } },
  Kausaltar: { Gathaghar: { distance: 1.0, time: 4 } },
  Gathaghar: { Thimi: { distance: 1.0, time: 4 } },
  Thimi: { Srijananagar: { distance: 1.2, time: 5 } },
  Srijananagar: { "Tinkune Bhaktapur": { distance: 1.5, time: 6 } },
  "Tinkune Bhaktapur": { "Sallaghari Stop": { distance: 1.0, time: 4 } },
  "Sallaghari Stop": { Chunudevi: { distance: 1.2, time: 5 } },
  Chunudevi: { "Barahi Movies": { distance: 1.0, time: 4 } },
  "Barahi Movies": { Suryabinayek: { distance: 1.5, time: 6 } },
  Suryabinayek: { Adarsha: { distance: 1.0, time: 4 } },
  Adarsha: { Jagati: { distance: 1.0, time: 4 } },
  Jagati: { Sanga: { distance: 1.2, time: 5 } },
  Sanga: { Bansdol: { distance: 1.3, time: 5 } },
  Bansdol: { "Banepa Tindobato": { distance: 1.5, time: 6 } },
  "Banepa Tindobato": { Khadpu: { distance: 1.0, time: 4 } },
  Khadpu: { Panauti: { distance: 1.5, time: 6 } },
};

// Ratnapark - Dhulikhel bus route
export const ratnaparkToDhulikhel: Graph = {
  Bhadrakali: { Singha_Durbar_West_Stop: { distance: 0.5, time: 2 } },
  Singha_Durbar_West_Stop: { Maitighar: { distance: 0.8, time: 3 } },
  Maitighar: { Buddhanagar_Stop: { distance: 1.0, time: 4 } },
  Buddhanagar_Stop: { Naya_Baneshwar_Bus_Station: { distance: 1.2, time: 5 } },
  Naya_Baneshwar_Bus_Station: { Minbhawan_Stop: { distance: 0.8, time: 3 } },
  Minbhawan_Stop: { Tinkune_Stop: { distance: 1.0, time: 4 } },
  Tinkune_Stop: { Jadibuti: { distance: 1.5, time: 6 } },
  Jadibuti: { Kausaltar: { distance: 1.2, time: 5 } },
  Kausaltar: { Gathaghar: { distance: 1.0, time: 4 } },
  Gathaghar: { Thimi: { distance: 1.5, time: 6 } },
  Thimi: { Srijana_Nagar: { distance: 1.2, time: 5 } },
  Srijana_Nagar: { Tinkune_Bhaktapur: { distance: 1.3, time: 5 } },
  Tinkune_Bhaktapur: { Sallaghari_Stop: { distance: 1.5, time: 6 } },
  Sallaghari_Stop: { Chunudevi: { distance: 1.8, time: 7 } },
  Chunudevi: { Barahi_Movies: { distance: 1.0, time: 4 } },
  Barahi_Movies: { Suryabinayek: { distance: 1.2, time: 5 } },
  Suryabinayek: { Adarsha: { distance: 1.5, time: 6 } },
  Adarsha: { Jagati: { distance: 1.0, time: 4 } },
  Jagati: { Sanga: { distance: 2.0, time: 8 } },
  Sanga: { Bansdol: { distance: 1.5, time: 6 } },
  Bansdol: { Banepa_Tindobato: { distance: 2.0, time: 8 } },
  Banepa_Tindobato: { Budol_Bus_Station: { distance: 1.5, time: 6 } },
  Budol_Bus_Station: { Basghari: { distance: 1.0, time: 4 } },
  Basghari: { Dhulikhel_Bus_Station: { distance: 2.5, time: 10 } },
};

export const mahanagarYatayatRoutes: RouteInfo[] = [
  {
    name: "Kalanki - TIA Airport",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: kalankiToAirport,
  },
  {
    name: "Naikap - Kausaltar",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: naikapToKausaltar,
  },
  {
    name: "Bhadrakali - Panauti",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: bhadrakaliToPanauti,
  },
  {
    name: "Ratnapark - Dhulikhel",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: ratnaparkToDhulikhel,
  },
];
