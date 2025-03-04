interface Graph {
    [key: string]: { [key: string]: number };
  }
  
  // Purano Buspark - Chabahil bus routes
  export const puranoBusparkToChabahil: Graph = {
    Bhadrakali: { "Singha Durbar West Stop": 1.2 },
    "Singha Durbar West Stop": { Maitighar: 0.8 },
    Maitighar: { "Buddhanagar Stop": 1.1 },
    "Buddhanagar Stop": { "Naya Baneshwar Bus Station": 1.5 },
    "Naya Baneshwar Bus Station": { "Minbhawan Stop": 1.0 },
    "Minbhawan Stop": { "Shantinagar Stop": 1.3 },
    "Shantinagar Stop": { "Tinkune Stop": 1.7 },
    "Tinkune Stop": { "Gairigaun Stop": 1.2 },
    "Gairigaun Stop": { "Sinamangal Ring Road Stop": 1.5 },
    "Sinamangal Ring Road Stop": { "Airport Bus Station": 1.0 },
    "Airport Bus Station": { "Gaushala Chok Stop": 1.3 },
    "Gaushala Chok Stop": { Chabahil: 1.1 },
    Chabahil: { "Gopikrishna Stop": 1.0 },
    "Gopikrishna Stop": { "Dhumbarahi Stop": 1.4 },
    "Dhumbarahi Stop": { "Chappalkarkhana Stop": 1.2 },
    "Chappalkarkhana Stop": { "Maharajgunj Chowk": 1.6 },
  };
  
  // Lagankhel - Naya Buspark (Ringroad) bus routes
  export const lagankhelToNayaBuspark: Graph = {
    "Lagankhel Stop": { "Batuk Bhairav": 1.0 },
    "Batuk Bhairav": { "Lalitpur Industrial Estate": 0.8 },
    "Lalitpur Industrial Estate": { Satdobato: 1.2 },
    Satdobato: { "B & B Hospital/KCM Stop": 0.7 },
    "B & B Hospital/KCM Stop": { "Gwarko Chok": 0.9 },
    "Gwarko Chok": { "Koteshwar Stop": 2.5 },
    "Koteshwar Stop": { "Gairigaun Stop": 1.0 },
    "Gairigaun Stop": { "Sinamangal Ring Road Stop": 0.8 },
    "Sinamangal Ring Road Stop": { "Airport Bus Station": 1.0 },
    "Airport Bus Station": { Chabahil: 1.5 },
    Chabahil: { "Gopi Krishna Stop": 0.1 },
    "Gopi Krishna Stop": { "Sukedhara Stop": 1.0 },
    "Sukedhara Stop": { "Chapal Karkhana Stop": 0.9 },
    "Chapal Karkhana Stop": { "Narayan Gopal Chok": 1.1 },
    "Narayan Gopal Chok": { Basundhara: 0.8 },
    Basundhara: { "Samakhusi Stop": 1.2 },
    "Samakhusi Stop": { "Gongabu Chok": 1.0 },
    "Gongabu Chok": { "Naya Bus Park": 0.5 },
  };