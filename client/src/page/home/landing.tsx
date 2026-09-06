import React, { useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
    MapPin,
    Navigation,
    Clock,
    Banknote,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    TrendingUp,
    Zap,
    Compass,
    Layers,
    Bus,
    ChevronDown,
    ChevronUp,
    ArrowRightLeft
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "../components/navbar"
import Footer from "../components/footer"
import { mergedGraph } from "@/routes-dataset"
import { dijkstra } from "@/algorithm"
import { allStops } from "@/constants/allstops"

// Standard Kathmandu Transit Fare brackets
const calculateFare = (distance: number): number => {
    if (distance <= 0) return 0
    if (distance <= 5) return 20
    if (distance <= 10) return 25
    if (distance <= 15) return 30
    if (distance <= 20) return 35
    return 33 + Math.ceil(distance - 20) * 2
}

// Curated Kathmandu destinations with available public assets
const featuredDestinations = [
    {
        name: "Swayambhunath Stupa",
        category: "Cultural",
        description: "The ancient Monkey Temple overlooking the Kathmandu Valley with breathtaking panoramas.",
        image: "/Swayambhu-Stupa-1024x576.jpg",
        stop: "Swayambhu Stop",
        tags: ["Heritage", "Buddhist", "Scenic"],
    },
    {
        name: "Boudhanath Stupa",
        category: "Cultural",
        description: "One of the largest spherical stupas in the world and the center of Tibetan Buddhism in Nepal.",
        image: "/boudha.jpg",
        stop: "Chabahil",
        tags: ["UNESCO Site", "Heritage", "Spiritual"],
    },
    {
        name: "Basantapur Durbar Square",
        category: "Cultural",
        description: "Historic heart of Kathmandu featuring Malla-era palaces, courtyards, and pagoda temples.",
        image: "/basantapur.jpg",
        stop: "Bhadrakali",
        tags: ["Palace", "History", "Central"],
    },
    {
        name: "Garden of Dreams",
        category: "Leisure",
        description: "Neo-classical historical garden in Thamel with European architectural pavillions and fountains.",
        image: "/gardenofdreams.jpg",
        stop: "Bhadrakali",
        tags: ["Relaxation", "Thamel", "Architecture"],
    },
    {
        name: "Patan Durbar Square",
        category: "Cultural",
        description: "Lalitpur's masterclass in Newari architecture, stone sculptures, and sacred temples.",
        image: "/patan-durbar-square.jpg",
        stop: "Lagankhel Stop",
        tags: ["Lalitpur", "Art", "Newari Culture"],
    },
    {
        name: "Budhanilkantha Temple",
        category: "Cultural",
        description: "Open-air sacred shrine featuring the magnificent reclining stone statue of Lord Vishnu.",
        image: "/Budhanilkantha.jpg",
        stop: "Maharajgunj Chowk",
        tags: ["Temple", "Sculpture", "North Valley"],
    },
]

// FAQ Items
const faqs = [
    {
        question: "How does Rapid Routes (Sasto Yatra) calculate the best bus path?",
        answer: "We use Dijkstra's shortest path graph algorithm over a bidirectional network dataset of Kathmandu Valley bus stops. It factors in both real-world segment distances (in km) and average transit times (in minutes) to yield the optimal path with minimal delay.",
    },
    {
        question: "How are the bus fares calculated?",
        answer: "Fares are calculated according to the official Kathmandu Valley distance-based tiered public fare policy: up to 5 km is Rs. 20, 5-10 km is Rs. 25, 10-15 km is Rs. 30, 15-20 km is Rs. 35, and a fixed rate + Rs. 2/km thereafter.",
    },
    {
        question: "Can I use the route finder without creating an account?",
        answer: "Yes! You can preview routes, calculate fares, and explore popular hubs directly from this landing page. Logging in enables saving your commute history, pinning frequent trips, and accessing personalized analytics.",
    },
    {
        question: "What bus lines are currently mapped in the system?",
        answer: "The dataset includes major arterial lines: Purano Buspark to Chabahil, Lagankhel through Ring Road to Naya Bus Park, Bhaktapur to Purano Buspark, and cross-city connecting feeder stops spanning over 50 transit nodes.",
    },
    {
        question: "How does the trending algorithm for destinations work?",
        answer: "Our popular destinations feed uses an exponential time-decay scoring algorithm: Score = searchCount × e^(-λ · Δt). This guarantees that currently active hotspots rank above older historical spikes.",
    },
]

const LandingPage: React.FC = () => {
    const navigate = useNavigate()

    // Interactive Demo State
    const [source, setSource] = useState<string>("Bhadrakali")
    const [destination, setDestination] = useState<string>("Naya Bus Park")
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

    // Compute interactive preview using Dijkstra
    const demoResult = useMemo(() => {
        if (!source || !destination || source === destination) {
            return null
        }
        try {
            const result = dijkstra(mergedGraph, source, destination)
            const fare = calculateFare(result.distance ?? 0)
            return {
                path: result.path || [],
                distance: (result.distance ?? 0).toFixed(1),
                time: (result.time ?? 0).toFixed(0),
                fare,
            }
        } catch {
            return null
        }
    }, [source, destination])

    // Swap origin and destination
    const handleSwap = () => {
        const temp = source
        setSource(destination)
        setDestination(temp)
    }

    // Quick pick preset routes
    const applyPreset = (from: string, to: string) => {
        setSource(from)
        setDestination(to)
    }

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
            {/* Header Navbar */}
            <Navbar />

            {/* Ambient Lighting Gradients */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-transparent blur-3xl rounded-full" />
                <div className="absolute top-1/3 -left-48 w-[450px] h-[450px] bg-emerald-700/10 blur-[120px] rounded-full" />
                <div className="absolute top-2/3 -right-48 w-[450px] h-[450px] bg-cyan-700/10 blur-[120px] rounded-full" />
            </div>

            {/* Main Content Container */}
            <main className="relative z-10 flex-1 pt-24 pb-16">
                
                {/* HERO SECTION */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
                    
                    {/* Pill Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm shadow-sm shadow-emerald-950"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Kathmandu Valley's Smartest Transit & Fare Engine</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-none"
                    >
                        Navigate Kathmandu Bus Routes with{" "}
                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                            Precision & Fair Fares
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
                    >
                        Stop guessing bus stops and getting overcharged. Discover shortest transit paths across 50+ Kathmandu valley stops, calculate official fares, and find bus transfers in sub-milliseconds.
                    </motion.p>

                    {/* Primary CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-4"
                    >
                        <Button
                            size="lg"
                            onClick={() => navigate("/routes")}
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-7 py-6 text-base rounded-xl shadow-lg shadow-emerald-900/30 cursor-pointer flex items-center gap-2 group transition-all"
                        >
                            <Navigation className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                            <span>Launch Route Finder</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => {
                                const el = document.getElementById("fare-matrix")
                                el?.scrollIntoView({ behavior: "smooth" })
                            }}
                            className="border-slate-700 hover:border-slate-600 bg-slate-900/70 hover:bg-slate-800 text-slate-200 px-6 py-6 text-base rounded-xl cursor-pointer"
                        >
                            <Banknote className="h-4 w-4 mr-2 text-emerald-400" />
                            <span>View Fare Matrix</span>
                        </Button>
                    </motion.div>

                    {/* INTERACTIVE ROUTE SEARCH & FARE CALCULATOR CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-14 max-w-4xl mx-auto"
                    >
                        <Card className="border border-emerald-500/20 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-emerald-950/40 text-left rounded-2xl overflow-hidden">
                            <CardHeader className="border-b border-slate-800/80 bg-slate-900/40 px-6 py-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="flex items-center gap-2.5">
                                        <div className="h-8 w-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                                            <Zap className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold text-white">
                                                Instant Route & Fare Calculator
                                            </CardTitle>
                                            <CardDescription className="text-xs text-slate-400">
                                                Test Dijkstra pathfinding directly with Kathmandu stops
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs w-fit">
                                        Real-time Graph Engine
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                {/* Stop Selection Row */}
                                <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
                                    {/* Starting Point */}
                                    <div className="md:col-span-5 space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                                            Origin Stop
                                        </label>
                                        <Select value={source} onValueChange={setSource}>
                                            <SelectTrigger className="w-full bg-slate-950/70 border-slate-700 text-white h-12 rounded-xl focus:ring-emerald-500">
                                                <SelectValue placeholder="Select Origin" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 text-slate-100 border-slate-700 max-h-60">
                                                {allStops.map((stop) => (
                                                    <SelectItem key={stop} value={stop}>
                                                        {stop}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Swap Button */}
                                    <div className="md:col-span-1 flex justify-center pt-4 md:pt-6">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={handleSwap}
                                            title="Swap Origin and Destination"
                                            className="h-10 w-10 rounded-full border-slate-700 hover:border-emerald-500 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-all"
                                        >
                                            <ArrowRightLeft className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Destination */}
                                    <div className="md:col-span-5 space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                            <Navigation className="h-3.5 w-3.5 text-teal-400" />
                                            Destination Stop
                                        </label>
                                        <Select value={destination} onValueChange={setDestination}>
                                            <SelectTrigger className="w-full bg-slate-950/70 border-slate-700 text-white h-12 rounded-xl focus:ring-emerald-500">
                                                <SelectValue placeholder="Select Destination" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 text-slate-100 border-slate-700 max-h-60">
                                                {allStops.map((stop) => (
                                                    <SelectItem key={stop} value={stop}>
                                                        {stop}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Quick Route Presets */}
                                <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-xs">
                                    <span className="text-slate-400 font-medium mr-1">Try Popular Commutes:</span>
                                    <button
                                        type="button"
                                        onClick={() => applyPreset("Kalanki", "Chabahil")}
                                        className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-emerald-950/50 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 transition cursor-pointer"
                                    >
                                        Kalanki → Chabahil
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyPreset("Bhadrakali", "Naya Bus Park")}
                                        className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-emerald-950/50 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 transition cursor-pointer"
                                    >
                                        Bhadrakali → Naya Bus Park
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyPreset("Lagankhel Stop", "Airport Bus Station")}
                                        className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-emerald-950/50 hover:text-emerald-300 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 transition cursor-pointer"
                                    >
                                        Lagankhel → Airport
                                    </button>
                                </div>

                                {/* Calculation Results Box */}
                                {demoResult && demoResult.path.length > 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5"
                                    >
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                                            <div className="pt-2 sm:pt-0">
                                                <div className="text-xs text-slate-400 uppercase font-medium flex items-center justify-center gap-1">
                                                    <Banknote className="h-3.5 w-3.5 text-emerald-400" />
                                                    Est. Bus Fare
                                                </div>
                                                <div className="text-2xl font-black text-emerald-400 mt-1">
                                                    Rs. {demoResult.fare}
                                                </div>
                                                <div className="text-[10px] text-slate-400">Govt. standard rate</div>
                                            </div>

                                            <div className="pt-2 sm:pt-0">
                                                <div className="text-xs text-slate-400 uppercase font-medium flex items-center justify-center gap-1">
                                                    <Compass className="h-3.5 w-3.5 text-teal-400" />
                                                    Distance
                                                </div>
                                                <div className="text-2xl font-black text-white mt-1">
                                                    {demoResult.distance} <span className="text-sm font-semibold text-slate-400">km</span>
                                                </div>
                                                <div className="text-[10px] text-slate-400">Shortest Dijkstra path</div>
                                            </div>

                                            <div className="pt-2 sm:pt-0">
                                                <div className="text-xs text-slate-400 uppercase font-medium flex items-center justify-center gap-1">
                                                    <Clock className="h-3.5 w-3.5 text-cyan-400" />
                                                    Travel Time
                                                </div>
                                                <div className="text-2xl font-black text-white mt-1">
                                                    ~{demoResult.time} <span className="text-sm font-semibold text-slate-400">min</span>
                                                </div>
                                                <div className="text-[10px] text-slate-400">Avg. valley bus speed</div>
                                            </div>

                                            <div className="pt-2 sm:pt-0">
                                                <div className="text-xs text-slate-400 uppercase font-medium flex items-center justify-center gap-1">
                                                    <Bus className="h-3.5 w-3.5 text-indigo-400" />
                                                    Stops
                                                </div>
                                                <div className="text-2xl font-black text-white mt-1">
                                                    {demoResult.path.length} <span className="text-sm font-semibold text-slate-400">nodes</span>
                                                </div>
                                                <div className="text-[10px] text-slate-400">Transit stops traversed</div>
                                            </div>
                                        </div>

                                        {/* Traversed Path Pills */}
                                        <div className="mt-5 pt-4 border-t border-slate-800/80">
                                            <div className="text-xs text-slate-400 font-medium mb-2">Transit Hop Route:</div>
                                            <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto pr-1">
                                                {demoResult.path.map((stop, index) => {
                                                    const isFirst = index === 0
                                                    const isLast = index === demoResult.path.length - 1
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <span
                                                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                                    isFirst
                                                                        ? "bg-emerald-500 text-slate-950 font-bold"
                                                                        : isLast
                                                                        ? "bg-teal-500 text-slate-950 font-bold"
                                                                        : "bg-slate-800 text-slate-200 border border-slate-700"
                                                                }`}
                                                            >
                                                                {stop}
                                                            </span>
                                                            {index < demoResult.path.length - 1 && (
                                                                <span className="text-slate-500 text-xs">→</span>
                                                            )}
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        {/* Action link */}
                                        <div className="mt-4 flex justify-end">
                                            <Button
                                                size="sm"
                                                onClick={() => navigate("/routes")}
                                                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs cursor-pointer flex items-center gap-1.5"
                                            >
                                                <span>Open Full Interactive Route Navigator</span>
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-sm text-slate-400">
                                        Select differing origin and destination points to view live Dijkstra pathfinding and fare calculations.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </section>

                {/* VALLEY TRANSIT NETWORK METRICS BAR */}
                <section className="border-y border-slate-800/80 bg-slate-900/40 backdrop-blur py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-3xl sm:text-4xl font-black text-emerald-400">50+</div>
                                <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Mapped Transit Stops</div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl font-black text-teal-400">&lt; 1 ms</div>
                                <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Dijkstra Search Latency</div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl font-black text-cyan-400">Rs. 20</div>
                                <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Base Local Bus Fare</div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
                                <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Fare Transparency</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* KEY FEATURES SECTION */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3">
                            Engineered For Kathmandu Commuters
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Why Choose Rapid Routes (Sasto Yatra)?
                        </h2>
                        <p className="mt-3 text-slate-300 text-base sm:text-lg">
                            Designed specifically for Kathmandu Valley’s unique public transport challenges: complex ring roads, missing timetable schedules, and unpredictable fare changes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all mb-3">
                                    <Navigation className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl text-white font-bold">Dijkstra Shortest Path</CardTitle>
                                <CardDescription className="text-slate-300 text-sm leading-relaxed mt-2">
                                    Traverses bidirectional Kathmandu valley graph nodes to compute shortest physical distance and minimal transit time simultaneously.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all mb-3">
                                    <Banknote className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl text-white font-bold">Dynamic Fare Estimation</CardTitle>
                                <CardDescription className="text-slate-300 text-sm leading-relaxed mt-2">
                                    Avoid getting overcharged by conductors. Calculates exact fares based on Kathmandu Valley government distance-tiered brackets.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all mb-3">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl text-white font-bold">Smart Bus Transfer Alerts</CardTitle>
                                <CardDescription className="text-slate-300 text-sm leading-relaxed mt-2">
                                    Detects where you need to switch buses across Route 1, Route 2, and Route 3 lines (e.g. at Chabahil, Ratna Park, or Koteshwar).
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 4 */}
                        <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all mb-3">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl text-white font-bold">Exponential Decay Ranking</CardTitle>
                                <CardDescription className="text-slate-300 text-sm leading-relaxed mt-2">
                                    Trending destinations update algorithmically with exponential time-decay, ranking hubs based on fresh commuter searches.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 5 */}
                        <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all mb-3">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl text-white font-bold">Saved History & Commutes</CardTitle>
                                <CardDescription className="text-slate-300 text-sm leading-relaxed mt-2">
                                    Store frequent journeys (college, work, or home routes) directly in your profile for one-tap navigation anytime.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        {/* Feature 6 */}
                        <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all duration-300 group">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all mb-3">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl text-white font-bold">Mobile First & Ultra Lightweight</CardTitle>
                                <CardDescription className="text-slate-300 text-sm leading-relaxed mt-2">
                                    Fast page load times and zero unnecessary external map bloat, designed to run smoothly on mobile networks across the valley.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                {/* FEATURED DESTINATIONS SHOWCASE */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                        <div>
                            <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/10 mb-3">
                                Explore Kathmandu Valley
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Popular Valley Landmarks & Transit Hubs
                            </h2>
                            <p className="mt-2 text-slate-300 text-sm sm:text-base">
                                Reach iconic cultural stupas, palaces, and garden retreats on local bus lines.
                            </p>
                        </div>
                        <Link to="/popular">
                            <Button variant="outline" className="border-slate-700 hover:border-emerald-500 text-emerald-400 hover:text-white bg-slate-900/80 cursor-pointer flex items-center gap-1.5 w-fit">
                                <span>View All Trending Hubs</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredDestinations.map((dest, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.2 }}
                                className="group"
                            >
                                <Card className="border border-slate-800/80 bg-slate-900/70 overflow-hidden rounded-2xl flex flex-col h-full hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/20 transition-all">
                                    {/* Destination Image */}
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                        <Badge className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs">
                                            {dest.category}
                                        </Badge>
                                    </div>

                                    {/* Destination Content */}
                                    <CardContent className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                                                {dest.name}
                                            </h3>
                                            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                                                {dest.description}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {dest.tags.map((tag, tIdx) => (
                                                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                                                <span>Transit: <strong className="text-slate-200">{dest.stop}</strong></span>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    setDestination(dest.stop)
                                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                                }}
                                                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 h-7 px-2 text-xs cursor-pointer flex items-center gap-1"
                                            >
                                                <span>Test Route</span>
                                                <ArrowRight className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section className="border-y border-slate-800/80 bg-slate-900/30 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3">
                                Simple & Intuitive
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                How Rapid Routes Works
                            </h2>
                            <p className="mt-3 text-slate-300 text-base sm:text-lg">
                                Master Kathmandu public transit in four straightforward steps.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Step 1 */}
                            <div className="relative p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition-all">
                                <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center mb-4">
                                    01
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Pick Locations</h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    Select starting and destination stops from 50+ mapped stops spanning Kathmandu, Lalitpur, and Bhaktapur.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/30 transition-all">
                                <div className="h-10 w-10 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-400 font-bold flex items-center justify-center mb-4">
                                    02
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Dijkstra Computes</h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    The algorithm queries the bidirectional graph network to discover shortest distance and least transit duration in milliseconds.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/30 transition-all">
                                <div className="h-10 w-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center mb-4">
                                    03
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Review Fare & Stops</h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    Get official fare estimation, total travel time, full stop sequence, and highlighted bus interchange points.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="relative p-6 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                                <div className="h-10 w-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 font-bold flex items-center justify-center mb-4">
                                    04
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Ride with Confidence</h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    Board your local bus knowing exact stops, where to switch routes, and exactly how much money to hand to the conductor.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* KATHMANDU VALLEY FARE MATRIX SECTION */}
                <section id="fare-matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-5">
                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                                Official Rate Matrix
                            </Badge>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                Transparent Bus Fares Across Kathmandu
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                Never overpay for local transit again. Rapid Routes strictly calculates fares based on official distance thresholds recognized across Kathmandu Valley public transport.
                            </p>

                            <div className="space-y-3 text-sm text-slate-300">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                    <span>Flat base fare of Rs. 20 for short inner-city hops under 5 km</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                    <span>Incremental Rs. 5 steps up to 20 km distances</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                    <span>Long-distance ring road rates calculate at Rs. 2 per additional km</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Table */}
                        <div className="lg:col-span-7">
                            <Card className="border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl overflow-hidden rounded-2xl">
                                <CardHeader className="bg-slate-950/70 border-b border-slate-800/80 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                                            <Banknote className="h-4 w-4 text-emerald-400" />
                                            Government Distance Tier Bracket
                                        </CardTitle>
                                        <span className="text-xs text-slate-400">Kathmandu Standard</span>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 divide-y divide-slate-800/80">
                                    <div className="grid grid-cols-12 px-6 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/40">
                                        <div className="col-span-5">Distance Bracket</div>
                                        <div className="col-span-4">Example Commute</div>
                                        <div className="col-span-3 text-right">Standard Fare</div>
                                    </div>
                                    <div className="grid grid-cols-12 px-6 py-4 text-sm items-center hover:bg-slate-800/30 transition">
                                        <div className="col-span-5 font-medium text-white">0.0 – 5.0 km</div>
                                        <div className="col-span-4 text-xs text-slate-400">Ratna Park → Baneshwar</div>
                                        <div className="col-span-3 text-right font-bold text-emerald-400 text-base">Rs. 20</div>
                                    </div>
                                    <div className="grid grid-cols-12 px-6 py-4 text-sm items-center hover:bg-slate-800/30 transition">
                                        <div className="col-span-5 font-medium text-white">5.1 – 10.0 km</div>
                                        <div className="col-span-4 text-xs text-slate-400">Bhadrakali → Chabahil</div>
                                        <div className="col-span-3 text-right font-bold text-emerald-400 text-base">Rs. 25</div>
                                    </div>
                                    <div className="grid grid-cols-12 px-6 py-4 text-sm items-center hover:bg-slate-800/30 transition">
                                        <div className="col-span-5 font-medium text-white">10.1 – 15.0 km</div>
                                        <div className="col-span-4 text-xs text-slate-400">Kalanki → Koteshwar</div>
                                        <div className="col-span-3 text-right font-bold text-emerald-400 text-base">Rs. 30</div>
                                    </div>
                                    <div className="grid grid-cols-12 px-6 py-4 text-sm items-center hover:bg-slate-800/30 transition">
                                        <div className="col-span-5 font-medium text-white">15.1 – 20.0 km</div>
                                        <div className="col-span-4 text-xs text-slate-400">Lagankhel → Naya Buspark</div>
                                        <div className="col-span-3 text-right font-bold text-emerald-400 text-base">Rs. 35</div>
                                    </div>
                                    <div className="grid grid-cols-12 px-6 py-4 text-sm items-center hover:bg-slate-800/30 transition bg-emerald-950/10">
                                        <div className="col-span-5 font-medium text-white">&gt; 20.0 km</div>
                                        <div className="col-span-4 text-xs text-slate-400">Full Ring Road Cross-Valley</div>
                                        <div className="col-span-3 text-right font-bold text-teal-400 text-sm">Rs. 33 + Rs. 2/km</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* COMPARISON TABLE */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3">
                            The Sasto Yatra Advantage
                        </Badge>
                        <h2 className="text-3xl font-extrabold text-white">
                            Comparing Commute Options in Kathmandu
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur text-left text-sm">
                            <thead className="bg-slate-950/80 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                                <tr>
                                    <th className="p-4 sm:p-5">Feature</th>
                                    <th className="p-4 sm:p-5 text-emerald-400 bg-emerald-950/20 border-x border-slate-800">
                                        Rapid Routes (Sasto Yatra)
                                    </th>
                                    <th className="p-4 sm:p-5">Asking Bystanders / Conductors</th>
                                    <th className="p-4 sm:p-5">Ride Hailing (Pathao/InDrive)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/80 text-slate-300">
                                <tr className="hover:bg-slate-800/20">
                                    <td className="p-4 sm:p-5 font-medium text-white">Route Accuracy</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 bg-emerald-950/20 border-x border-slate-800 font-semibold">
                                        Mathematical Dijkstra Shortest Path
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-400">Subjective & often incorrect</td>
                                    <td className="p-4 sm:p-5 text-slate-400">Road traffic dependent</td>
                                </tr>
                                <tr className="hover:bg-slate-800/20">
                                    <td className="p-4 sm:p-5 font-medium text-white">Average Cost</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 bg-emerald-950/20 border-x border-slate-800 font-semibold">
                                        Rs. 20 – Rs. 35 (Super Affordable)
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-400">Variable / Overcharging risk</td>
                                    <td className="p-4 sm:p-5 text-slate-400">Rs. 150 – Rs. 600+</td>
                                </tr>
                                <tr className="hover:bg-slate-800/20">
                                    <td className="p-4 sm:p-5 font-medium text-white">Surge Pricing</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 bg-emerald-950/20 border-x border-slate-800 font-semibold">
                                        Zero Surge, Ever
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-400">Arbitrary late-night rates</td>
                                    <td className="p-4 sm:p-5 text-slate-400">Heavy rain & peak hour surge</td>
                                </tr>
                                <tr className="hover:bg-slate-800/20">
                                    <td className="p-4 sm:p-5 font-medium text-white">Transfer Guidance</td>
                                    <td className="p-4 sm:p-5 text-emerald-400 bg-emerald-950/20 border-x border-slate-800 font-semibold">
                                        Automatic interchange detection
                                    </td>
                                    <td className="p-4 sm:p-5 text-slate-400">Confusing directions</td>
                                    <td className="p-4 sm:p-5 text-slate-400">Direct point-to-point</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ ACCORDION SECTION */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3">
                            Got Questions?
                        </Badge>
                        <h2 className="text-3xl font-extrabold text-white">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = expandedFaq === index
                            return (
                                <div
                                    key={index}
                                    className="border border-slate-800 rounded-xl bg-slate-900/60 overflow-hidden transition-all"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                                        className="w-full flex items-center justify-between p-5 text-left font-semibold text-white hover:text-emerald-300 transition-colors cursor-pointer"
                                    >
                                        <span className="text-base sm:text-lg">{faq.question}</span>
                                        {isOpen ? (
                                            <ChevronUp className="h-5 w-5 text-emerald-400 flex-shrink-0 ml-4" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="px-5 pb-5 text-sm sm:text-base text-slate-300 border-t border-slate-800/60 pt-3"
                                            >
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* BOTTOM CALL TO ACTION BANNER */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
                    <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-tr from-emerald-950/60 via-slate-900 to-teal-950/60 p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-emerald-950/50">
                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                                Ready to Commute Smarter Across Kathmandu?
                            </h2>
                            <p className="text-slate-300 text-base sm:text-lg">
                                Jump straight into the Route Finder or create your account to save daily trips, track your transport history, and explore trending hubs.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                                <Button
                                    size="lg"
                                    onClick={() => navigate("/routes")}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg cursor-pointer text-base"
                                >
                                    <Navigation className="h-5 w-5 mr-2" />
                                    Launch Route Navigator
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => navigate("/register")}
                                    className="border-slate-700 hover:border-slate-600 bg-slate-900/80 hover:bg-slate-800 text-white px-8 py-6 rounded-xl cursor-pointer text-base"
                                >
                                    Create Free Account
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default LandingPage
