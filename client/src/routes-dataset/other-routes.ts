import type { Graph, RouteInfo } from "./types";

// Bhaktapur - Purano Thimi - Purano Buspark bus routes
export const bhaktapurToPuranoBuspark: Graph = {
  Bagbazar: { Maitighar: { distance: 1.0, time: 4 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 5 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 4 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.3, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.7, time: 7 } },
  "Tinkune Stop": { "Koteshwor Stop": { distance: 1.2, time: 5 } },
  "Koteshwor Stop": { "Jadibuti Stop": { distance: 1.5, time: 6 } },
  "Jadibuti Stop": { "Pepsicola Stop": { distance: 1.2, time: 5 } },
  "Pepsicola Stop": { "Panika Stop": { distance: 1.1, time: 4 } },
  "Panika Stop": { "Siddhikali Chowk Bus Stop": { distance: 1.3, time: 5 } },
  "Siddhikali Chowk Bus Stop": {
    "Bahakha Bazar Bus Stop": { distance: 1.5, time: 6 },
  },
  "Bahakha Bazar Bus Stop": {
    "Radheradhe Chowk Bus Stop": { distance: 1.7, time: 7 },
  },
  "Radheradhe Chowk Bus Stop": {
    "Hindunagar Chowk Bus Stop": { distance: 1.2, time: 5 },
  },
  "Hindunagar Chowk Bus Stop": {
    "Dhungedhara Chowk Bus Stop": { distance: 1.3, time: 5 },
  },
  "Dhungedhara Chowk Bus Stop": {
    "Dudhpati Bus Stop": { distance: 1.6, time: 7 },
  },
};

// Budhanilkantha School - Ratna Park micro routes
export const budhanilkanthaToRatnaPark: Graph = {
  "Budhanilkantha School Blue Micro Stand": {
    "Budhanilkantha Micro Stand": { distance: 1.2, time: 5 },
  },
  "Budhanilkantha Micro Stand": { "Golfutar Stop": { distance: 1.5, time: 6 } },
  "Golfutar Stop": { "Bansbari Stop": { distance: 1.3, time: 5 } },
  "Bansbari Stop": { "Chakrapath Stop--South": { distance: 1.6, time: 7 } },
  "Chakrapath Stop--South": { "Panipokhari Stop": { distance: 1.2, time: 5 } },
  "Panipokhari Stop": { "Lazimpat Stop": { distance: 1.4, time: 6 } },
  "Lazimpat Stop": { "Lainchaur Stop": { distance: 1.1, time: 4 } },
  "Lainchaur Stop": { Kantipath: { distance: 1.0, time: 4 } },
  Kantipath: { "Ratna Park": { distance: 0.9, time: 3 } },
};

// Gothatar - Purano Buspark micro routes
export const bagbazarToGothatar: Graph = {
  Bagbazar: { Maitighar: { distance: 1.2, time: 5 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.0, time: 4 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.2, time: 5 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.3, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Koteshwor Stop": { distance: 1.2, time: 5 } },
  "Koteshwor Stop": { "Jadibuti Stop": { distance: 1.0, time: 4 } },
  "Jadibuti Stop": { "Pepsicola Stop": { distance: 1.5, time: 6 } },
  "Pepsicola Stop": { "Khahare Chowk Bus Stop": { distance: 1.2, time: 5 } },
  "Khahare Chowk Bus Stop": { "Gothatar Stop": { distance: 1.3, time: 5 } },
};

// Kalanki - Pepsicola bus routes
export const kalankiToPepsicola: Graph = {
  "Kalanki Chowk": { Kalimati: { distance: 1.5, time: 6 } },
  Kalimati: { Tripureshwar: { distance: 1.2, time: 5 } },
  Tripureshwar: { Thapathali: { distance: 1.0, time: 4 } },
  Thapathali: { "Maitighar Stop--South": { distance: 0.8, time: 3 } },
  "Maitighar Stop--South": { Maitighar: { distance: 0.5, time: 2 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.0, time: 4 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.2, time: 5 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.3, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Koteshwor Stop": { distance: 1.2, time: 5 } },
  "Koteshwor Stop": { "Jadibuti Stop": { distance: 1.0, time: 4 } },
  "Jadibuti Stop": { "Pepsicola Chowk Stop": { distance: 1.5, time: 6 } },
};

// Kamalbinayak - Ratnapark bus routes
export const kamalbinayakToRatnapark: Graph = {
  Ratnapark: { Bhadrakali: { distance: 1.0, time: 4 } },
  Bhadrakali: { "Singha Durbar West Stop": { distance: 1.2, time: 5 } },
  "Singha Durbar West Stop": { Maitighar: { distance: 0.8, time: 3 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 4 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 4 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.3, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Koteshwor Stop": { distance: 1.2, time: 5 } },
  "Koteshwor Stop": { "Lokanthali Stop": { distance: 1.8, time: 7 } },
  "Lokanthali Stop": { "Gathaghar Stop": { distance: 1.0, time: 4 } },
  "Gathaghar Stop": { "Shrijananagar Stop": { distance: 1.0, time: 4 } },
  "Shrijananagar Stop": { Dudhpati: { distance: 1.2, time: 5 } },
  Dudhpati: { Byasi: { distance: 1.5, time: 6 } },
  Byasi: { "Kamalbinayak Stop": { distance: 1.0, time: 4 } },
};

// Purano Bus Park - Sakhu micro routes
export const puranoBusparkToSakhu: Graph = {
  "Purano Buspark": { Tundikhel: { distance: 1.0, time: 4 } },
  Tundikhel: { "Singha Durbar": { distance: 0.6, time: 2 } },
  "Singha Durbar": { "Maitighar Mandala": { distance: 0.8, time: 3 } },
  "Maitighar Mandala": { Nayabaneshwor: { distance: 1.2, time: 5 } },
  Nayabaneshwor: { "Minbhawan Stop": { distance: 1.0, time: 4 } },
  "Minbhawan Stop": { "Shentinagar Stop": { distance: 1.3, time: 5 } },
  "Shentinagar Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Gairigaun Stop": { distance: 1.2, time: 5 } },
  "Gairigaun Stop": { "Sinamangal Ring Road Stop": { distance: 1.5, time: 6 } },
  "Sinamangal Ring Road Stop": {
    "Airport Bus Station": { distance: 1.0, time: 4 },
  },
  "Airport Bus Station": { "Gaushala Chok Stop": { distance: 1.3, time: 5 } },
  "Gaushala Chok Stop": { Chabahil: { distance: 1.1, time: 4 } },
  Chabahil: { "Hyatt Regency": { distance: 1.5, time: 6 } },
  "Hyatt Regency": { Boudha: { distance: 1.2, time: 4 } },
  Boudha: { Jorpati: { distance: 2.0, time: 8 } },
  Jorpati: { "Narayantar Bridge": { distance: 1.5, time: 6 } },
  "Narayantar Bridge": { Mulpani: { distance: 2.5, time: 10 } },
  Mulpani: { Thali: { distance: 1.8, time: 7 } },
  Thali: { Sakhu: { distance: 1.0, time: 4 } },
};

// Ratnapark - Chyamasingh bus routes
export const bagbazarToChyamasing: Graph = {
  Bagbazar: { Bhadrakali: { distance: 0.9, time: 4 } },
  Bhadrakali: { "Singha Durbar West Stop": { distance: 0.7, time: 3 } },
  "Singha Durbar West Stop": { Maitighar: { distance: 0.8, time: 3 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 4 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 4 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.3, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Koteshwor Stop": { distance: 1.0, time: 4 } },
  "Koteshwor Stop": { "Lokanthali Stop": { distance: 1.2, time: 5 } },
  "Lokanthali Stop": { "Gathaghar Stop": { distance: 0.8, time: 3 } },
  "Gathaghar Stop": { "Shrijananagar Stop": { distance: 0.9, time: 4 } },
  "Shrijananagar Stop": { "Sallaghari Stop": { distance: 1.0, time: 4 } },
  "Sallaghari Stop": { Chunudevi: { distance: 1.2, time: 5 } },
  Chunudevi: { "Suotabinayak Stop": { distance: 1.3, time: 5 } },
  "Suotabinayak Stop": {
    "Dholeshwor Mahadev Bus Stop": { distance: 1.5, time: 6 },
  },
  "Dholeshwor Mahadev Bus Stop": {
    "Adarsha Bus Stop": { distance: 1.0, time: 4 },
  },
  "Adarsha Bus Stop": { "Jagati Bus Stop": { distance: 0.8, time: 3 } },
  "Jagati Bus Stop": { "Chyamasing Bus Stop": { distance: 1.0, time: 4 } },
};

// Ratnapark - Changu bus routes
export const ratnaparkToChangunarayan: Graph = {
  Ratnapark: { "Singha Durbar West Stop": { distance: 1.0, time: 4 } },
  "Singha Durbar West Stop": { Maitighar: { distance: 0.8, time: 3 } },
  Maitighar: { "Buddhanagar Stop": { distance: 1.1, time: 4 } },
  "Buddhanagar Stop": {
    "Naya Baneshwar Bus Station": { distance: 1.5, time: 6 },
  },
  "Naya Baneshwar Bus Station": {
    "Minbhawan Stop": { distance: 1.0, time: 4 },
  },
  "Minbhawan Stop": { "Shantinagar Stop": { distance: 1.2, time: 5 } },
  "Shantinagar Stop": { "Tinkune Stop": { distance: 1.5, time: 6 } },
  "Tinkune Stop": { "Koteshwor Stop": { distance: 1.0, time: 4 } },
  "Koteshwor Stop": { "Lokanthali Stop": { distance: 1.3, time: 5 } },
  "Lokanthali Stop": { "Gathaghar Stop": { distance: 1.0, time: 4 } },
  "Gathaghar Stop": { "Gaushala Chok Stop": { distance: 1.2, time: 5 } },
  "Gaushala Chok Stop": { "Shrijananagar Stop": { distance: 1.0, time: 4 } },
  "Shrijananagar Stop": { Dudhpati: { distance: 1.5, time: 6 } },
  Dudhpati: { Byasi: { distance: 1.2, time: 5 } },
  Byasi: { "Changunarayan Road": { distance: 1.0, time: 4 } },
  "Changunarayan Road": { "Changunarayan Stop": { distance: 1.5, time: 6 } },
};

// Purano Bus Park to Budhanilkantha route
export const puranoBusParkToBudhanilkantha: Graph = {
  "Purano Bus Park": { "Deuba Chowk stop": { distance: 1.0, time: 4 } },
  "Deuba Chowk stop": { Kantipath: { distance: 0.8, time: 3 } },
  Kantipath: { "Lainchaur stop": { distance: 1.1, time: 4 } },
  "Lainchaur stop": { "Lazimpat stop": { distance: 1.2, time: 5 } },
  "Lazimpat stop": { "Panipokhari stop": { distance: 1.0, time: 4 } },
  "Panipokhari stop": { "Chakrapath Stop-- South": { distance: 1.3, time: 5 } },
  "Chakrapath Stop-- South": { "Bansbari stop": { distance: 1.0, time: 4 } },
  "Bansbari stop": { "Golfutar stop": { distance: 1.0, time: 4 } },
  "Golfutar stop": { "Budhanilkantha Stop": { distance: 1.5, time: 6 } },
};

// Jorpati to Purano Bus Park route
export const jorpatiToPuranoBusPark: Graph = {
  Jorpati: { Bouddha: { distance: 1.0, time: 4 } },
  Bouddha: { Chuchepati: { distance: 0.8, time: 3 } },
  Chuchepati: { Chabahil: { distance: 1.1, time: 4 } },
  Chabahil: { Mitrapark: { distance: 1.2, time: 5 } },
  Mitrapark: { Gaushala: { distance: 1.0, time: 4 } },
  Gaushala: { Battisputali: { distance: 1.3, time: 5 } },
  Battisputali: { "Purano Baneshwor": { distance: 1.0, time: 4 } },
  "Purano Baneshwor": { Setopul: { distance: 1.2, time: 5 } },
  Setopul: { Dillibazar: { distance: 1.0, time: 4 } },
  Dillibazar: { Putalisadak: { distance: 1.0, time: 4 } },
  Putalisadak: { Bagbazar: { distance: 1.5, time: 6 } },
  Bagbazar: { "Purano Buspark": { distance: 1.5, time: 6 } },
};

// Ratna Park to Sundarijal route
export const ratnaParkToSundarijal: Graph = {
  Ratnapark: { "Singha Durbar West Stop": { distance: 1.0, time: 4 } },
  "Singha Durbar West Stop": { Kamalpokhari: { distance: 1.2, time: 5 } },
  Kamalpokhari: { Gyanehwor: { distance: 1.0, time: 4 } },
  Gyanehwor: { Ratopul: { distance: 1.0, time: 4 } },
  Ratopul: { Gaushala: { distance: 1.5, time: 6 } },
  Gaushala: { Mitrapark: { distance: 1.0, time: 4 } },
  Mitrapark: { Chabahil: { distance: 1.3, time: 5 } },
  Chabahil: { Chuchepati: { distance: 1.0, time: 4 } },
  Chuchepati: { Bouddha: { distance: 1.2, time: 5 } },
  Bouddha: { Jorpati: { distance: 1.0, time: 4 } },
  Jorpati: { "Gokarneshwor Mahadev Temple": { distance: 1.5, time: 6 } },
  "Gokarneshwor Mahadev Temple": { Nayapati: { distance: 1.0, time: 4 } },
  Nayapati: { Sundarijal: { distance: 1.5, time: 6 } },
};

// Gokarna to Chabahil route
export const gokarnaToChabahil: Graph = {
  "Gokarna Bus Stop": { Jorpati: { distance: 2.0, time: 6 } },
  Jorpati: { Boudha: { distance: 1.0, time: 4 } },
  Boudha: { "Hyatt Regency": { distance: 0.8, time: 3 } },
  "Hyatt Regency": { Chabahil: { distance: 1.2, time: 5 } },
  Chabahil: { "Gopi Krishna Stop": { distance: 0.5, time: 2 } },
  "Gopi Krishna Stop": { Dhumbarahi: { distance: 1.5, time: 6 } },
  Dhumbarahi: { "Narayan Gopal Chok": { distance: 0.7, time: 3 } },
  "Narayan Gopal Chok": { "Samakhusi Stop": { distance: 1.3, time: 5 } },
  "Samakhusi Stop": { "Naya Bus Park": { distance: 0.9, time: 4 } },
  "Naya Bus Park": { Balaju: { distance: 1.2, time: 5 } },
  Balaju: { Dhungedhara: { distance: 1.1, time: 4 } },
  Dhungedhara: { "Kalanki Chowk": { distance: 2.0, time: 7 } },
};

// Balkumari to Gopi Krishna route
export const balkumariToGopiKrishna: Graph = {
  "Sukedhara Stop": { "Dhumbarahi Stop": { distance: 0.8, time: 3 } },
  "Dhumbarahi Stop": { "Chappal Kerkhana": { distance: 1.0, time: 4 } },
  "Chappal Kerkhana": { "Narayan Gopal Chowk": { distance: 0.6, time: 2 } },
  "Narayan Gopal Chowk": { "Baluwatar Bus Stop": { distance: 1.3, time: 5 } },
  "Baluwatar Bus Stop": { "Naxal Stop": { distance: 1.1, time: 4 } },
  "Naxal Stop": { "Mariott Stop": { distance: 0.7, time: 3 } },
  "Mariott Stop": { "Hattisar Stop": { distance: 0.8, time: 3 } },
  "Hattisar Stop": { "Putali Sadak Stop": { distance: 1.0, time: 4 } },
  "Putali Sadak Stop": { "New Plaza Bus Stop": { distance: 0.6, time: 2 } },
  "New Plaza Bus Stop": { "Ghattekulo Bus Stop": { distance: 1.0, time: 4 } },
  "Ghattekulo Bus Stop": {
    "Hanumansthan Bus Stop": { distance: 0.5, time: 2 },
  },
  "Hanumansthan Bus Stop": { "New Baneshwor": { distance: 1.3, time: 5 } },
  "New Baneshwor": { "Minbhawan Bus Stand": { distance: 0.7, time: 3 } },
  "Minbhawan Bus Stand": { "Tinkune Bus Stand": { distance: 1.5, time: 6 } },
  "Tinkune Bus Stand": { "Koteshwor Bus Stand": { distance: 0.9, time: 4 } },
  "Koteshwor Bus Stand": { "Balkumari Bus Stop": { distance: 1.2, time: 5 } },
};

// Ratopul to Daksinkali route
export const ratnaparkToDaksinkali: Graph = {
  Ratnapark: { Kalimati: { distance: 1.2, time: 5 } },
  Kalimati: { Kuleshwor: { distance: 1.5, time: 6 } },
  Kuleshwor: { Balkhu: { distance: 1.0, time: 4 } },
  Balkhu: { Chobar: { distance: 2.0, time: 8 } },
  Chobar: { Taudaha: { distance: 3.5, time: 12 } },
  Taudaha: { Chalnakhel: { distance: 4.0, time: 15 } },
  Chalnakhel: { Satikhel: { distance: 3.0, time: 10 } },
  Satikhel: { Bhanjyang: { distance: 2.5, time: 9 } },
  Bhanjyang: { Dollu: { distance: 2.0, time: 8 } },
  Dollu: { SatikhelBusStop: { distance: 2.0, time: 8 } },
  SatikhelBusStop: { DakhinkaliTemple: { distance: 2.5, time: 10 } },
};

// Attarkhel to Purano Buspark route
export const attarkhelToPuranoBuspark: Graph = {
  Bhadrakali: { SinghaDurbarWest: { distance: 1.0, time: 4 } },
  SinghaDurbarWest: { Maitighar: { distance: 1.5, time: 5 } },
  Maitighar: { Buddhanagar: { distance: 1.0, time: 4 } },
  Buddhanagar: { NayaBaneshwar: { distance: 1.5, time: 6 } },
  NayaBaneshwar: { Minbhawan: { distance: 1.0, time: 4 } },
  Minbhawan: { Shantinagar: { distance: 1.2, time: 5 } },
  Shantinagar: { Tinkune: { distance: 1.0, time: 4 } },
  Tinkune: { Gairigaun: { distance: 1.5, time: 6 } },
  Gairigaun: { SinamangalRingRoad: { distance: 1.0, time: 4 } },
  SinamangalRingRoad: { AirportBusStation: { distance: 1.2, time: 5 } },
  AirportBusStation: { GaushalaChok: { distance: 1.0, time: 4 } },
  GaushalaChok: { Chabahil: { distance: 1.5, time: 6 } },
  Chabahil: { HyattRegency: { distance: 1.2, time: 5 } },
  HyattRegency: { Boudha: { distance: 1.0, time: 4 } },
  Boudha: { Jorpati: { distance: 1.5, time: 6 } },
  Jorpati: { Attarkhel: { distance: 2.0, time: 8 } },
  Attarkhel: { PuranoBusPark: { distance: 3.0, time: 10 } },
};

// Kalanki to Balkumari route
export const kalankiToBalkumari: Graph = {
  Kalanki_Chowk: { Kalimati: { distance: 2.5, time: 8 } },
  Kalimati: { Tripureshwar: { distance: 1.2, time: 5 } },
  Tripureshwar: { Thapathali: { distance: 1.0, time: 4 } },
  Thapathali: { Maitighar_South: { distance: 0.8, time: 3 } },
  Maitighar_South: { Maitighar: { distance: 0.5, time: 2 } },
  Maitighar: { Buddhanagar_Stop: { distance: 1.1, time: 4 } },
  Buddhanagar_Stop: { Naya_Baneshwar_Bus_Station: { distance: 1.5, time: 5 } },
  Naya_Baneshwar_Bus_Station: { Minbhawan_Stop: { distance: 0.9, time: 3 } },
  Minbhawan_Stop: { Shantinagar_Stop: { distance: 0.8, time: 3 } },
  Shantinagar_Stop: { Tinkune_Stop: { distance: 1.2, time: 4 } },
  Tinkune_Stop: { Koteshwor_Stop: { distance: 1.0, time: 3 } },
  Koteshwor_Stop: { Balkumari_Stop: { distance: 1.5, time: 5 } },
};

// Purano Buspark to Shivapuri route
export const puranoBusparkToShivapuri: Graph = {
  Purano_Bus_Park: { Deuba_Chowk_Stop: { distance: 1.2, time: 5 } },
  Deuba_Chowk_Stop: { Kantipath: { distance: 0.8, time: 3 } },
  Kantipath: { Lainchaur_Stop: { distance: 1.0, time: 4 } },
  Lainchaur_Stop: { Lazimpat_Stop: { distance: 1.1, time: 4 } },
  Lazimpat_Stop: { Panipokhari_Stop: { distance: 0.9, time: 3 } },
  Panipokhari_Stop: { Chakrapath_South: { distance: 1.5, time: 6 } },
  Chakrapath_South: { Bansbari_Stop: { distance: 1.2, time: 5 } },
  Bansbari_Stop: { Golfutar_Stop: { distance: 1.3, time: 5 } },
  Golfutar_Stop: { Budhanilkantha_Micro_Stand: { distance: 2.0, time: 7 } },
  Budhanilkantha_Micro_Stand: {
    Shivapuri_Park_Stop: { distance: 2.5, time: 8 },
  },
};

// Bagbazar to Kamalbinayak route
export const bagbazarToKamalbinayak: Graph = {
  Bagbazar: { Bhadrakali: { distance: 1.0, time: 5 } },
  Bhadrakali: { Singha_Durbar_West_Stop: { distance: 0.5, time: 2 } },
  Singha_Durbar_West_Stop: { Maitighar: { distance: 0.8, time: 3 } },
  Maitighar: { Buddhanagar_Stop: { distance: 0.6, time: 2 } },
  Buddhanagar_Stop: { Naya_Baneshwar_Bus_Station: { distance: 0.7, time: 3 } },
  Naya_Baneshwar_Bus_Station: { Minbhawan_Stop: { distance: 0.5, time: 2 } },
  Minbhawan_Stop: { Shantinagar_Stop: { distance: 0.4, time: 1 } },
  Shantinagar_Stop: { Tinkune_Stop: { distance: 0.6, time: 2 } },
  Tinkune_Stop: { Koteshwor_Stop: { distance: 0.5, time: 2 } },
  Koteshwor_Stop: { Lokanthali_Stop: { distance: 1.0, time: 3 } },
  Lokanthali_Stop: { Gathaghar_Stop: { distance: 0.7, time: 2 } },
  Gathaghar_Stop: { Gaushala_Chok_Stop: { distance: 0.5, time: 2 } },
  Gaushala_Chok_Stop: { Shrijananagar_Stop: { distance: 0.4, time: 1 } },
  Shrijananagar_Stop: { Dudhpati: { distance: 0.8, time: 3 } },
  Dudhpati: { Byasi: { distance: 0.6, time: 2 } },
  Byasi: { Kamalbinayak_Stop: { distance: 1.2, time: 5 } },
};

export const otherRoutes: RouteInfo[] = [
  {
    name: "Bhaktapur - Purano Buspark",
    operator: "Bagmati Yatayat",
    vehicleType: "bus",
    graph: bhaktapurToPuranoBuspark,
  },
  {
    name: "Budhanilkantha - Ratna Park",
    operator: "Samakhusi Yatayat",
    vehicleType: "micro",
    graph: budhanilkanthaToRatnaPark,
  },
  {
    name: "Bagbazar - Gothatar",
    operator: "Nepal Yatayat",
    vehicleType: "micro",
    graph: bagbazarToGothatar,
  },
  {
    name: "Kalanki - Pepsicola",
    operator: "Rajdhani Yatayat",
    vehicleType: "bus",
    graph: kalankiToPepsicola,
  },
  {
    name: "Kamalbinayak - Ratnapark",
    operator: "Bagmati Yatayat",
    vehicleType: "bus",
    graph: kamalbinayakToRatnapark,
  },
  {
    name: "Purano Buspark - Sakhu",
    operator: "Nepal Yatayat",
    vehicleType: "micro",
    graph: puranoBusparkToSakhu,
  },
  {
    name: "Bagbazar - Chyamasingh",
    operator: "Bagmati Yatayat",
    vehicleType: "bus",
    graph: bagbazarToChyamasing,
  },
  {
    name: "Ratnapark - Changunarayan",
    operator: "Bagmati Yatayat",
    vehicleType: "bus",
    graph: ratnaparkToChangunarayan,
  },
  {
    name: "Purano Bus Park - Budhanilkantha",
    operator: "Samakhusi Yatayat",
    vehicleType: "micro",
    graph: puranoBusParkToBudhanilkantha,
  },
  {
    name: "Jorpati - Purano Bus Park",
    operator: "Nepal Yatayat",
    vehicleType: "micro",
    graph: jorpatiToPuranoBusPark,
  },
  {
    name: "Ratna Park - Sundarijal",
    operator: "Gagalphedi Yatayat",
    vehicleType: "micro",
    graph: ratnaParkToSundarijal,
  },
  {
    name: "Gokarna - Chabahil",
    operator: "Tarkeshwor Yatayat",
    vehicleType: "micro",
    graph: gokarnaToChabahil,
  },
  {
    name: "Balkumari - Gopi Krishna",
    operator: "Bishalnagar Yatayat",
    vehicleType: "micro",
    graph: balkumariToGopiKrishna,
  },
  {
    name: "Ratnapark - Daksinkali",
    operator: "Dakshinkhali Yatayat",
    vehicleType: "bus",
    graph: ratnaparkToDaksinkali,
  },
  {
    name: "Attarkhel - Purano Buspark",
    operator: "Nepal Yatayat",
    vehicleType: "micro",
    graph: attarkhelToPuranoBuspark,
  },
  {
    name: "Kalanki - Balkumari",
    operator: "Rajdhani Yatayat",
    vehicleType: "bus",
    graph: kalankiToBalkumari,
  },
  {
    name: "Purano Buspark - Shivapuri",
    operator: "Samakhusi Yatayat",
    vehicleType: "micro",
    graph: puranoBusparkToShivapuri,
  },
  {
    name: "Bagbazar - Kamalbinayak",
    operator: "Bagmati Yatayat",
    vehicleType: "bus",
    graph: bagbazarToKamalbinayak,
  },
];
