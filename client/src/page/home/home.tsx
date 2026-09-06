import React, { useEffect, useState } from "react";
import { mergedGraph } from "@/routes-dataset";
import { dijkstra } from "@/algorithm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Banknote, Zap } from "lucide-react"
import { Navbar } from "../components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RouteSection from "./route-section";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { allStops } from "@/constants/allstops";
import Footer from "../components/footer";
import { motion } from "framer-motion"
import {
  buildRouteSegments,
  calculateTotalFareWithTransfers,
  calculateSingleFare,
  getTransferCount,
  type RouteSegment,
} from "@/utils/route-utils";

type RouteMode = "fastest" | "cheapest";

const BusRouteFinder: React.FC = () => {

    const navigate = useNavigate()

    const [source, setSource] = useState<string>("Bhadrakali");
    const [destination, setDestination] = useState<string>("Naya Bus Park");
    const [route, setRoute] = useState<string[]>([]);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [transferFare, setTransferFare] = useState<number>(0);
    const [segments, setSegments] = useState<RouteSegment[]>([]);
    const [mode, setMode] = useState<RouteMode>("fastest");

    const findRoute = () => {
        if (source === destination) {
            alert("Source and destination cannot be the same!");
            return;
        }
        const startTime = performance.now();

        const result = dijkstra(mergedGraph, source, destination);
        console.log(result)
        if (result.path.length === 0) {
            toast.error("No direct route to this destination. Please try another one.")
        }
        const endTime = performance.now();
        console.log(`Execution Time: ${(endTime - startTime).toFixed(4)} milliseconds`);

        setRoute(result.path);
        setTotalDistance(result.distance ?? 0);
        setTotalTime(result.time ?? 0);

        // Build segments for transfer detection
        const routeSegments = buildRouteSegments(result.path);
        setSegments(routeSegments);

        // Calculate both fare types
        const singleFare = calculateSingleFare(result.distance ?? 0);
        const multiSegmentFare = calculateTotalFareWithTransfers(routeSegments);
        setTransferFare(multiSegmentFare);

        // In cheapest mode, use single fare; in fastest mode, use transfer fare
        if (mode === "cheapest") {
            setCost(singleFare);
        } else {
            setCost(multiSegmentFare);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user_info") === null) {
            navigate("/login")
        }
    }, [navigate])

    // Recalculate fare when mode changes
    useEffect(() => {
        if (route.length === 0) return;
        const singleFare = calculateSingleFare(totalDistance);
        const multiSegmentFare = calculateTotalFareWithTransfers(segments);
        setTransferFare(multiSegmentFare);

        if (mode === "cheapest") {
            setCost(singleFare);
        } else {
            setCost(multiSegmentFare);
        }
    }, [mode, totalDistance, segments, route.length]);

    const transferCount = getTransferCount(segments);

    return (
        <div className="min-h-screen w-full flex flex-col pt-16">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
                <header className=" pb-12 px-4 text-center">
                    <div className="container mx-auto max-w-3xl">
                        <div className="inline-block p-2 bg-slate-800/50 rounded-full mb-4">
                            <Navigation className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Route</h1>
                        <p className="text-slate-300 text-lg max-w-xl mx-auto">
                            Discover the best path between any two locations with our advanced routing system
                        </p>
                    </div>
                </header>
                <main className="container mx-auto px-4 pb-20 max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Card className="mb-12 border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl text-emerald-400">Rapid Routes</CardTitle>
                                <CardDescription className="text-slate-300">Select your starting point and destination</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                    <div className="space-y-3">
                                        <label htmlFor="source" className="text-sm font-medium flex items-center gap-2 text-white">
                                            <MapPin className="h-4 w-4 text-emerald-400" />
                                            Starting Point
                                        </label>
                                        <Select value={source} onValueChange={setSource}>
                                            <SelectTrigger id="source" className="w-full text-white border-slate-600">
                                                <SelectValue className=" text-white" placeholder="Select starting point" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-700 text-white border-slate-600">
                                                {allStops.map((stop) => (
                                                    <SelectItem key={stop} value={stop}>
                                                        <div>
                                                            <div>{stop}</div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="destination" className="text-sm font-medium flex items-center gap-2 text-white">
                                            <MapPin className="h-4 w-4 text-emerald-400" />
                                            Destination
                                        </label>
                                        <Select value={destination} onValueChange={setDestination}>
                                            <SelectTrigger id="destination" className="w-full text-white border-slate-600">
                                                <SelectValue className=" text-white" placeholder="Select destination" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-700 text-white border-slate-600">
                                                {allStops.map((stop) => (
                                                    <SelectItem key={stop} value={stop}>
                                                        <div>
                                                            <div>{stop}</div>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Mode Toggle */}
                                <div className="mt-6 flex items-center justify-center gap-3">
                                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Route Priority:</span>
                                    <div className="flex rounded-xl overflow-hidden border border-slate-600/50 bg-slate-900/50">
                                        <button
                                            onClick={() => setMode("fastest")}
                                            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                                                mode === "fastest"
                                                    ? "bg-emerald-500/20 text-emerald-400 border-r border-emerald-500/30"
                                                    : "text-slate-400 hover:text-slate-200 border-r border-slate-700/50"
                                            }`}
                                        >
                                            <Zap className="h-4 w-4" />
                                            Fastest
                                        </button>
                                        <button
                                            onClick={() => setMode("cheapest")}
                                            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                                                mode === "cheapest"
                                                    ? "bg-amber-500/20 text-amber-400"
                                                    : "text-slate-400 hover:text-slate-200"
                                            }`}
                                        >
                                            <Banknote className="h-4 w-4" />
                                            Save Money
                                        </button>
                                    </div>
                                </div>

                                {/* Mode description */}
                                <div className="mt-3 text-center">
                                    {mode === "fastest" ? (
                                        <p className="text-xs text-slate-400">
                                            ⚡ Shows the quickest route. If transfers are needed, each bus ride is charged separately.
                                        </p>
                                    ) : (
                                        <p className="text-xs text-slate-400">
                                            💰 Shows single-ride fare as if no transfers. Ideal when direct routes are available.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <Button
                                        onClick={findRoute}
                                        disabled={!source || !destination || source === destination}
                                        className="px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                                        size="lg"
                                    >
                                        <Navigation className="mr-2 h-5 w-5" />
                                        Find Route
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {route.length > 0 && (
                        <>
                            {/* Savings hint when in fastest mode and transfers add cost */}
                            {mode === "fastest" && transferCount > 0 && transferFare > calculateSingleFare(totalDistance) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-300 flex items-center gap-2"
                                >
                                    <Banknote className="h-4 w-4 flex-shrink-0" />
                                    <span>
                                        💡 <strong>Tip:</strong> Switch to "Save Money" mode to see the single-ride fare of{" "}
                                        <strong className="text-amber-400">Rs. {calculateSingleFare(totalDistance)}</strong> instead of{" "}
                                        <strong>Rs. {transferFare}</strong> (with {transferCount} transfer{transferCount > 1 ? "s" : ""}).
                                    </span>
                                </motion.div>
                            )}
                            <RouteSection
                                route={route}
                                segments={segments}
                                totalTime={totalTime.toFixed(2)}
                                totalDistance={totalDistance.toFixed(2)}
                                totalCost={cost}
                                transferFare={transferFare}
                            />
                        </>
                    )}
                </main>
            </main>
            <Footer />
        </div>
    );
};

export default BusRouteFinder;
