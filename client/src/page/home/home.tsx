import React, { useEffect, useState } from "react";
import { mergedGraph } from "@/routes-dataset";
import { dijkstra } from "@/algorithm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"
import { Navbar } from "../components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RouteSection from "./route-section";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { allStops, routeMappings } from "@/constants/allstops";
import Footer from "../components/footer";



// Find transfer points where route changes
const findTransferPoints = (path: string[]) => {
    const transfers: string[] = [];
    let previousRoute = routeMappings[path[0]];

    for (let i = 1; i < path.length; i++) {
        const currentRoute = routeMappings[path[i]];

        // If the route changes at this stop, it's a transfer point
        if (currentRoute && previousRoute && currentRoute.join() !== previousRoute.join()) {
            transfers.push(path[i]);
        }

        previousRoute = currentRoute;
    }

    return transfers;
};

const BusRouteFinder: React.FC = () => {

    const navigate = useNavigate()


    const [source, setSource] = useState<string>("Bhadrakali");
    const [destination, setDestination] = useState<string>("Naya Bus Park");
    const [route, setRoute] = useState<string[]>([]);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [transferPoints, setTransferPoints] = useState<string[]>([]);

    // console.log(allStops)

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

        // Find all transfer points
        const transfers = findTransferPoints(result.path);
        setTransferPoints(transfers);


    };
    const calculateTotalFare = (totalDistance: number): number => {
        //cost
        if (totalDistance <= 5) {
            return 20;
        } else if (totalDistance <= 10) {
            return 25;
        } else if (totalDistance <= 15) {
            return 30;
        } else if (totalDistance <= 20) {
            return 35;
        } else {
            // Optionally handle totalDistances greater than 20 km
            // For now, you can return a base + additional rate
            return 33 + Math.ceil(totalDistance - 20) * 2; // Rs. 2 per km after 20 km (example)
        }
    };



    useEffect(() => {

        if (localStorage.getItem("user_info") === null) {
            navigate("/login")
        }
        const totalFare = calculateTotalFare(totalDistance);
        setCost(totalFare);
    }, [navigate, totalDistance])



    return (
        <div className="h-[90vh] lg:w-[1280px] md:w-full flex flex-col">
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

                    {route.length > 0 && (
                        <RouteSection
                            route={route}
                            transferPoints={transferPoints}
                            totalTime={totalTime.toFixed(2)}
                            totalDistance={totalDistance.toFixed(2)}
                            totalCost={cost}
                        />
                    )}
                </main>
            </main>
            <Footer />
        </div>
    );
};

export default BusRouteFinder;
