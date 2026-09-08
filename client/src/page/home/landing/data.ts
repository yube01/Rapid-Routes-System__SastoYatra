import type {
    FeaturedDestination,
    FaqItem,
    FareTier,
    PresetCommute,
    TransitCorridor,
} from "./types"

export const FEATURED_DESTINATIONS: FeaturedDestination[] = [
    {
        name: "Swayambhunath Stupa",
        category: "Cultural",
        description: "The ancient hilltop shrine overlooking Kathmandu with 360-degree valley panoramas.",
        image: "/Swayambhu-Stupa-1024x576.jpg",
        stop: "Swyambhu Stop",
        tags: ["UNESCO Site", "Heritage", "Scenic"],
        bestBusLine: "Sajha Yatayat",
        travelTimeMin: 25,
    },
    {
        name: "Boudhanath Stupa",
        category: "Cultural",
        description: "One of the largest spherical stupas in the world and the spiritual center of Tibetan Buddhism.",
        image: "/boudha.jpg",
        stop: "Chabahil",
        tags: ["UNESCO Site", "Spiritual", "Meditation"],
        bestBusLine: "Nepal Yatayat",
        travelTimeMin: 20,
    },
    {
        name: "Basantapur Durbar Square",
        category: "Heritage",
        description: "The historic Malla palace square, Kumari Ghar, and traditional Newari architecture in central Kathmandu.",
        image: "/basantapur.jpg",
        stop: "Bhadrakali",
        tags: ["Palace", "History", "Central Hub"],
        bestBusLine: "Purano Buspark Arterial",
        travelTimeMin: 15,
    },
    {
        name: "Patan Durbar Square",
        category: "Heritage",
        description: "Lalitpur's masterclass of wood carvings, stone sculptures, and sacred Hindu-Buddhist courtyards.",
        image: "/patan-durbar-square.jpg",
        stop: "Lagankhel Stop",
        tags: ["Lalitpur", "Art", "Newari Culture"],
        bestBusLine: "Sajha Yatayat",
        travelTimeMin: 30,
    },
    {
        name: "Garden of Dreams",
        category: "Leisure",
        description: "Neo-classical historical garden in Kaiser Mahal with European architectural pavilions and tranquil ponds.",
        image: "/gardenofdreams.jpg",
        stop: "Bhadrakali",
        tags: ["Relaxation", "Thamel", "Architecture"],
        bestBusLine: "Nepal Yatayat",
        travelTimeMin: 10,
    },
    {
        name: "Budhanilkantha Temple",
        category: "Cultural",
        description: "Open-air sacred pond featuring the monolithic floating black stone statue of sleeping Lord Vishnu.",
        image: "/Budhanilkantha.jpg",
        stop: "Maharajgunj Chowk",
        tags: ["North Valley", "Sculpture", "Pilgrimage"],
        bestBusLine: "Nepal Yatayat",
        travelTimeMin: 40,
    },
]

export const POPULAR_PRESETS: PresetCommute[] = [
    {
        from: "Kalanki Chowk",
        to: "Chabahil",
        label: "Kalanki ↔ Chabahil",
        desc: "Ring Road North Arc (Sajha)",
        badge: "Most Commuted",
    },
    {
        from: "Bhadrakali",
        to: "Naya Bus Park",
        label: "Bhadrakali ↔ Gongabu",
        desc: "City Center to Bus Terminal",
        badge: "Fastest",
    },
    {
        from: "Lagankhel Stop",
        to: "Airport Bus Station",
        label: "Lagankhel ↔ TIA Airport",
        desc: "Lalitpur to International Terminal",
        badge: "Direct",
    },
    {
        from: "Koteshwar Stop",
        to: "Kalanki Chowk",
        label: "Koteshwar ↔ Kalanki",
        desc: "Ring Road South Artery",
        badge: "Express",
    },
]

export const FARE_TIERS: FareTier[] = [
    {
        minKm: 0,
        maxKm: 5,
        fare: 20,
        rangeLabel: "0.0 – 5.0 km",
        exampleRoute: "Ratna Park → Naya Baneshwar",
        noteHint: "Single Rs. 20 note or coins",
    },
    {
        minKm: 5.1,
        maxKm: 10,
        fare: 25,
        rangeLabel: "5.1 – 10.0 km",
        exampleRoute: "Bhadrakali → Chabahil",
        noteHint: "Carry Rs. 25 exact change",
    },
    {
        minKm: 10.1,
        maxKm: 15,
        fare: 30,
        rangeLabel: "10.1 – 15.0 km",
        exampleRoute: "Kalanki → Koteshwar",
        noteHint: "Three Rs. 10 notes or Rs. 50 bill",
    },
    {
        minKm: 15.1,
        maxKm: 20,
        fare: 35,
        rangeLabel: "15.1 – 20.0 km",
        exampleRoute: "Lagankhel → Naya Buspark",
        noteHint: "Standard Ring Road cross rate",
    },
    {
        minKm: 20.1,
        maxKm: 35,
        fare: 43,
        rangeLabel: "> 20.0 km",
        exampleRoute: "Full Ring Road Loop (~27 km)",
        noteHint: "Rs. 33 base + Rs. 2 per extra km",
    },
]

export const TRANSIT_CORRIDORS: TransitCorridor[] = [
    {
        id: "ring-road",
        name: "Ring Road Chakrapath Loop",
        code: "LINE 1",
        color: "emerald",
        operator: "Mahanagar Yatayat & Sajha",
        vehicleType: "bus",
        keyStops: ["Kalanki", "Balaju", "Naya Bus Park", "Chabahil", "Koteshwar", "Satdobato"],
        description: "The 27 km circular artery connecting all four quadrants of the valley with high-capacity green & blue buses.",
        frequency: "Every 4-7 mins",
        badge: "Primary Artery",
    },
    {
        id: "east-west",
        name: "Purano Buspark – Chabahil Corridor",
        code: "LINE 2",
        color: "teal",
        operator: "Nepal Yatayat",
        vehicleType: "bus",
        keyStops: ["Bhadrakali", "Maitighar", "Baneshwar", "Tinkune", "Airport", "Chabahil"],
        description: "Dense commercial spine linking government secretariats, Tribhuvan International Airport, and Boudha.",
        frequency: "Every 3-5 mins",
        badge: "High Frequency",
    },
    {
        id: "lalitpur-feeder",
        name: "Lagankhel – Ring Road Feeder",
        code: "LINE 3",
        color: "cyan",
        operator: "Rajdhani & Lalitpur Minibus",
        vehicleType: "micro",
        keyStops: ["Lagankhel", "Batuk Bhairav", "Satdobato", "Gwarko", "Koteshwar"],
        description: "Rapid microbus connector joining the historic Patan core with outer Ring Road junctions.",
        frequency: "Every 5-8 mins",
        badge: "Rapid Micro",
    },
]

export const COMMUTER_METRICS = [
    {
        value: "50+",
        label: "Mapped Valley Stops",
        detail: "Kathmandu, Lalitpur & Bhaktapur",
    },
    {
        value: "< 1 ms",
        label: "Dijkstra Engine Latency",
        detail: "Instant optimal transit graph traversal",
    },
    {
        value: "Rs. 20",
        label: "Base Government Fare",
        detail: "Official DoTM distance-tiered rate",
    },
    {
        value: "0%",
        label: "Surge Pricing",
        detail: "No peak hour markup or weather surge",
    },
]

export const FAQS: FaqItem[] = [
    {
        question: "How does Rapid Routes (Sasto Yatra) calculate the best bus path?",
        answer: "Rapid Routes uses a graph-based Dijkstra shortest-path algorithm evaluated over our curated bidirectional network of Kathmandu Valley transit stops. The engine weighs both physical road distances (in km) and average local traffic transit times (in minutes) to yield the optimal route with minimal delay and fewest bus switches.",
        category: "Algorithm",
    },
    {
        question: "How are the Kathmandu bus fares calculated?",
        answer: "Fares strictly adhere to the official Nepal Department of Transport Management (DoTM) Kathmandu Valley distance-based tiered fare bracket: up to 5 km is Rs. 20, 5-10 km is Rs. 25, 10-15 km is Rs. 30, 15-20 km is Rs. 35, and Rs. 33 base + Rs. 2 per km thereafter. When a journey involves switching between different bus lines, our engine alerts you to separate segment fares.",
        category: "Fares",
    },
    {
        question: "Does Sasto Yatra support student or senior citizen discount cards?",
        answer: "Yes! While our calculator displays standard base adult fares by default, government-recognized student ID cards (45% discount) and senior citizen / disability concession passes are legally honored by all valley bus operators (Sajha, Mahanagar, etc.).",
        category: "Concessions",
    },
    {
        question: "How do I know where to switch buses if my destination has no direct bus?",
        answer: "Our engine automatically detects multi-segment routes and clearly marks 'Transfer Points' (e.g. switching at Chabahil, Koteshwar, or Ratna Park). In the route breakdown, each segment specifies the bus operator name, vehicle type (🚌 large bus vs 🚐 micro), and individual segment fare.",
        category: "Transfers",
    },
    {
        question: "Can I use the route finder without creating an account?",
        answer: "Yes! All route calculations, fare estimates, and transit guides are 100% free and accessible without login. Registering an account simply unlocks extra perks like saving frequent daily commutes (e.g., college, workplace), tracking your travel history, and contributing search rankings.",
        category: "Account",
    },
    {
        question: "How does the trending popular destinations algorithm work?",
        answer: "Our popular destinations feed uses an exponential time-decay scoring algorithm: Score = searchCount × e^(-λ · Δt). This guarantees that actively trending commuter spots and current seasonal festival hubs (e.g. Pashupatinath during Shivaratri, Patan during festival periods) rank above older historical spikes.",
        category: "Algorithm",
    },
]
