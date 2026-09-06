
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, History, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { dijkstra } from "@/algorithm"
import { mergedGraph } from "@/routes-dataset"
import { toast } from "sonner"
import RouteSection from "./route-section"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Footer from "../components/footer"
import { motion } from "framer-motion"
import {
    buildRouteSegments,
    calculateTotalFareWithTransfers,
    type RouteSegment,
} from "@/utils/route-utils";




export default function HistoryPage() {



    const [route, setRoute] = useState<string[]>([]);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [segments, setSegments] = useState<RouteSegment[]>([]);
    const [transferFare, setTransferFare] = useState<number>(0);

    //   const [transferPoints, setTransferPoints] = useState<string[]>([]);

    // console.log(allStops)

    const findRoute = (source: string, destination: string) => {
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
        const multiSegmentFare = calculateTotalFareWithTransfers(routeSegments);
        setTransferFare(multiSegmentFare);

        // Find all transfer points
        //   const transfers = findTransferPoints(result.path);
        //   setTransferPoints(transfers);


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
            return 33;
        } else {
            // Optionally handle totalDistances greater than 20 km
            // For now, you can return a base + additional rate
            return 33 + Math.ceil(totalDistance - 20) * 2; // Rs. 2 per km after 20 km (example)
        }
    };

    interface History {
        hid: number;
        id: string;
        source: string;
        destination: string;
    }


    const [history, setHistory] = useState<History[]>([]);
    useEffect(() => {
        const id = localStorage.getItem("user_info") || ""

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5005/history/getHistory/${id}`, {
                    method: "GET",
                    credentials: "include", // include cookies if needed
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                setHistory(data); // handle the fetched data
                const totalFare = calculateTotalFare(totalDistance);
                setCost(totalFare);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col">
            <Navbar />

            <header className="pt-16 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-block p-2 bg-slate-800/50 rounded-full mb-4">
                        <History className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Route History</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">View your previously searched routes</p>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 max-w-4xl">

                {history.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-block p-3 bg-slate-800/50 rounded-full mb-4">
                            <History className="h-10 w-10 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">No routes found</h3>
                        <p className="text-slate-400 mb-6">
                            {history.length === 0
                                ? "You haven't saved for any routes yet."
                                : "No routes match your current filters."}
                        </p>
                        <Link to="/">
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                <Navigation className="mr-2 h-5 w-5" />
                                Find a Route
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
                        {history.map((item) => (
                            <Card key={item.id} className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm overflow-hidden">

                                <CardContent>
                                    <div className=" flex justify-between items-center w-full">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="h-5 w-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{item.source}</div>
                                                </div>
                                            </div>

                                            <div className="hidden sm:block">
                                                <ArrowRight className="h-5 w-5 text-slate-500" />
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="h-5 w-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{item.destination}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                findRoute(item.source, item.destination);
                                                setOpen(true);
                                            }}
                                            className="px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
                                        >
                                            Search Route
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent className="max-h-[90vh] overflow-y-auto min-w-[60rem] bg-slate-900 border border-emerald-500/30">
                                {route.length > 0 && (
                                    <RouteSection
                                        route={route}
                                        segments={segments}
                                        totalTime={totalTime.toFixed(2)}
                                        totalDistance={totalDistance.toFixed(2)}
                                        totalCost={cost}
                                        transferFare={transferFare}
                                    />
                                )}
                            </DialogContent>
                        </Dialog>
                    </motion.div>
                )}
            </main>
            <Footer />

        </div>
    )
}

