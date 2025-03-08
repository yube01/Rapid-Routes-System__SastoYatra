interface Graph {
  [key: string]: { [key: string]: { distance: number; time: number } };
}

// Purano Buspark - Chabahil bus routes
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

// Lagankhel - Naya Buspark (Ringroad) bus routes
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
export const mergedGraph = mergeMultipleGraphs(
  puranoBusparkToChabahil,
  lagankhelToNayaBuspark
);
