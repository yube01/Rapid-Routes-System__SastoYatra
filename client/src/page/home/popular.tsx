import { useEffect, useMemo, useState } from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Navigation, TrendingUp } from 'lucide-react'
import { Navbar } from '../components/navbar'
import { mergedGraph } from '@/routes-dataset'
import { dijkstra } from '@/algorithm'
import { toast } from 'sonner'
import RouteSection from './route-section';
import { getExponentialDecayScore } from '@/algorithm/exponentialDecayScore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allStops } from '@/constants/allstops';



export default function PopularDestinations() {
    const [activeTab, setActiveTab] = useState('all')

    const [routes, setRoutes] = useState<string[]>([]);
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);

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


        setRoutes(result.path);
        setTotalDistance(result.distance ?? 0);
        setTotalTime(result.time ?? 0);


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


    interface Route {
        did: number;
        name: string;
        category: string;
        location: string;
        image: string;
        searchCount: number;
        lastTimeSearched: string;
    }

    const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5005/location/getLocation", {
                    method: "GET",
                    credentials: "include", // include cookies if needed
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log(data)
                setPopularRoutes(data); // handle the fetched data
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);



    const updatePopularity = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5005/location/updateLocation/${id}`, {
                method: "PUT",
                credentials: "include", // include cookies if needed
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data); // handle the fetched data
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        const totalFare = calculateTotalFare(totalDistance);
        setCost(totalFare);
    }, [totalDistance])

    const sortedRoutes = useMemo(() => {
        const filtered = activeTab === 'all'
            ? popularRoutes
            : popularRoutes.filter(route => route.category === activeTab);

        return filtered
            .map(route => ({
                ...route,
                score: getExponentialDecayScore(route.searchCount, route.lastTimeSearched)
            }))
            .sort((a, b) => b.score - a.score);
    }, [activeTab, popularRoutes]);

    console.log(sortedRoutes)


    const [open, setOpen] = useState<boolean>(false)

    const currentLocation = localStorage.getItem("location");


    useEffect(() => {

        if (localStorage.getItem("location") === null) {
            setOpen(true)
        }
    }, [])

    const [source, setSource] = useState<string>("Bhadrakali");




    return (
        <div className="h-[90vh] lg:w-[1280px] md:w-full flex flex-col">
            <Navbar />

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className=' bg-black'>
                    <DialogHeader>
                        <DialogTitle>Select Your Location</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                        <Select value={source} onValueChange={(value) => {
                            setSource(value)
                            localStorage.setItem("location", value) // Save to localStorage
                            setOpen(false)                          // Close the modal
                        }}>
                            <SelectTrigger id="source" className="w-full text-white border-slate-600">
                                <SelectValue className=" text-white" placeholder="Select starting point" />
                            </SelectTrigger>
                            <SelectContent className="bg-black text-white border-slate-600">
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
                </DialogContent>
            </Dialog>

            <header className="pt-16 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-block p-2 bg-slate-800/50 rounded-full mb-4">
                        <TrendingUp className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Popular Destinations</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">
                        Discover the most searched routes and trending destinations
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 max-w-5xl">
                <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-6">
                        <TabsList className="bg-slate-800/50 text-white">
                            <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                All Routes
                            </TabsTrigger>
                            <TabsTrigger value="cultural" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Cultural
                            </TabsTrigger>
                            <TabsTrigger value="leisure" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Leisure
                            </TabsTrigger>
                            <TabsTrigger value="education" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Education
                            </TabsTrigger>
                            <TabsTrigger value="shopping" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Shopping
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value={activeTab} className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedRoutes.map((route) => (
                                <Card
                                    onClick={() => updatePopularity(route.did)
                                    }
                                    key={route.did}
                                    className="border-0 px-4 flex justify-between shadow-lg bg-slate-800/50 backdrop-blur-sm overflow-hidden hover:shadow-emerald-900/10 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="w-full h-52 overflow-hidden">
                                        <img
                                            src={`/${route.image}`}
                                            alt=""
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>

                                    <CardHeader>
                                        <div className="flex justify-center items-start">
                                            <CardTitle className="text-lg text-emerald-400">
                                                {route.name}
                                            </CardTitle>

                                        </div>
                                        <CardDescription className="text-slate-400">
                                            {route.category.charAt(0).toUpperCase() + route.category.slice(1)} Route
                                        </CardDescription>
                                    </CardHeader>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                onClick={() => {
                                                    if (currentLocation) {
                                                        findRoute(currentLocation, route.location);
                                                    } else {
                                                        toast.error("Please select your current location first.");
                                                    }
                                                }}
                                                variant="outline"
                                                size="sm"
                                                className="border-emerald-500/30 cursor-pointer text-emerald-400 hover:bg-emerald-500/20 hover:text-white"
                                            >
                                                <Navigation className="mr-1 h-4 w-4" />
                                                Get Directions
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent className="max-h-[90vh] overflow-y-auto min-w-[40rem] bg-slate-900 border border-emerald-500/30">
                                            <DialogHeader >
                                                <DialogTitle className="text-emerald-400 w-[20rem]">Route Details</DialogTitle>
                                                <RouteSection
                                                    route={routes}
                                                    totalTime={totalTime.toFixed(2)}
                                                    totalDistance={totalDistance.toFixed(2)}
                                                    totalCost={cost}
                                                />
                                            </DialogHeader>

                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="button"
                                                        className="border-emerald-500/30 cursor-pointer text-emerald-400 hover:bg-emerald-500/20 hover:text-white"
                                                        variant="secondary">
                                                        Close
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* <div className="mt-12 text-center">
                    <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm p-6 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Weekly Trending Route</h3>
                        <p className="text-slate-300 mb-4">
                            Downtown to Beach is the most popular route this week with over 500 searches!
                        </p>
                        <Link to="/?source=loc1&destination=loc5">
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                <Navigation className="mr-2 h-5 w-5" />
                                Try This Route
                            </Button>
                        </Link>
                    </Card>
                </div> */}
            </main>
        </div>
    )
}
