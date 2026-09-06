interface Graph {
  [key: string]: { [key: string]: { distance: number; time: number } };
}

export type VehicleType = "bus" | "micro" | "tempo";

export interface RouteInfo {
  name: string;
  operator: string;
  vehicleType: VehicleType;
  graph: Graph;
}

// Purano Buspark - Chabahil bus routes
const puranoBusparkToChabahil: Graph = {
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

// Lagankhel - Naya Buspark (Ringroad) bus routes
const lagankhelToNayaBuspark: Graph = {
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

//Bhaktapur - Purano Thimi- Purano Buspark bus routes
const bhaktapurToPuranoBuspark: Graph = {
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

//Budhanilkantha School - Ratna Park bus routes
const budhanilkanthaToRatnaPark: Graph = {
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

//Kalanki - TIA Airport bus routes
const kalankiToAirport: Graph = {
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

//Chakrapath - Parikrama bus routes
const chakrapathParikrama: Graph = {
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

//Gothatar - Purano Buspark bus routes
const bagbazarToGothatar: Graph = {
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

//Kalanki - Pepsicola bus routes
const kalankiToPepsicola: Graph = {
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

//Kamalbinayak - Ratnapark bus routes
const kamalbinayakToRatnapark: Graph = {
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

//Purano Bus Park - Sakhu bus routes
const puranoBusparkToSakhu: Graph = {
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

//Ratnapark - Chyamasingh bus routes
const bagbazarToChyamasing: Graph = {
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

//Kausaltar - Naikap bus routes
const naikapToKausaltar: Graph = {
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

//Ratnapark - Changu bus routes
const ratnaparkToChangunarayan: Graph = {
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

//Ratnapark - Panauti bus routes
const bhadrakaliToPanauti: Graph = {
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

// Purano Bus Park to Budhanilkantha route
const puranoBusParkToBudhanilkantha: Graph = {
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
const jorpatiToPuranoBusPark: Graph = {
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
const ratnaParkToSundarijal: Graph = {
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
const gokarnaToChabahil = {
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
const balkumariToGopiKrishna = {
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
const ratnaparkToDaksinkali = {
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
const attarkhelToPuranoBuspark = {
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
const kalankiToBalkumari: Graph = {
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
const puranoBusparkToShivapuri: Graph = {
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

// Ratnapark to Dhulikhel route
const ratnaparkToDhulikhel: Graph = {
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

// Bagbazar to Kamalbinayak route
const bagbazarToKamalbinayak: Graph = {
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

export const allRoutes: RouteInfo[] = [
  {
    name: "Purano Buspark - Chabahil",
    operator: "Nepal Yatayat",
    vehicleType: "bus",
    graph: puranoBusparkToChabahil,
  },
  {
    name: "Lagankhel - Naya Buspark (Ringroad)",
    operator: "Sajha Yatayat",
    vehicleType: "bus",
    graph: lagankhelToNayaBuspark,
  },
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
    name: "Kalanki - TIA Airport",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: kalankiToAirport,
  },
  {
    name: "Chakrapath Parikrama (Ring Road)",
    operator: "Sajha Yatayat",
    vehicleType: "bus",
    graph: chakrapathParikrama,
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
    name: "Naikap - Kausaltar",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: naikapToKausaltar,
  },
  {
    name: "Ratnapark - Changunarayan",
    operator: "Bagmati Yatayat",
    vehicleType: "bus",
    graph: ratnaparkToChangunarayan,
  },
  {
    name: "Bhadrakali - Panauti",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: bhadrakaliToPanauti,
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
    name: "Ratnapark - Dhulikhel",
    operator: "Mahanagar Yatayat",
    vehicleType: "bus",
    graph: ratnaparkToDhulikhel,
  },
  {
    name: "Bagbazar - Kamalbinayak",
    operator: "Bagmati Yatayat",
    vehicleType: "bus",
    graph: bagbazarToKamalbinayak,
  },
];

// Helper: extract just the graphs from allRoutes (for backward compatibility)
export const allRouteGraphs = allRoutes.map((r) => r.graph);


const mergeMultipleGraphs = (...graphs: Graph[]): Graph => {
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

// Merge all bus routes into one graph
export const mergedGraph = mergeMultipleGraphs(...allRouteGraphs);

