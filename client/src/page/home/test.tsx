
import { useState } from "react"
import { Navbar } from "../components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Sample location data
const locations = [
    { id: "nyc", name: "New York City" },
    { id: "la", name: "Los Angeles" },
    { id: "chi", name: "Chicago" },
    { id: "mia", name: "Miami" },
    { id: "sf", name: "San Francisco" },
    { id: "sea", name: "Seattle" },
    { id: "bos", name: "Boston" },
    { id: "dc", name: "Washington DC" },
]

export default function Test() {
    const [source, setSource] = useState<string | undefined>()
    const [destination, setDestination] = useState<string | undefined>()
    const [showRoute, setShowRoute] = useState(false)

    const handleFindRoute = () => {
        if (source && destination && source !== destination) {
            setShowRoute(true)
            // Add a small delay to ensure state updates before rendering
            setTimeout(() => {
                const routeElement = document.getElementById("route-section")
                if (routeElement) {
                    routeElement.scrollIntoView({ behavior: "smooth" })
                }
            }, 100)
        }
    }

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
                                            {locations.map((location) => (
                                                <SelectItem key={location.id} value={location.id}>
                                                    <div>
                                                        <div>{location.name}</div>
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
                                            {locations.map((location) => (
                                                <SelectItem key={location.id} value={location.id}>
                                                    <div>
                                                        <div>{location.name}</div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Button
                                    onClick={handleFindRoute}
                                    disabled={!source || !destination || source === destination}
                                    className="px-8 py-6 bg-emerald-500 hover:bg-emerald-600 text-white"
                                    size="lg"
                                >
                                    <Navigation className="mr-2 h-5 w-5" />
                                    Find Route
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {showRoute && source && destination && (
                        <div id="route-section" className="mt-8 animate-fadeIn">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold">Your Route</h2>
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3 py-1">
                                    Fastest Route
                                </Badge>
                            </div>

                            <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="p-6 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400">Starting Point</div>
                                            {/* <div className="font-medium text-lg">{sourceLocation?.name}</div>
                                            <div className="text-sm text-slate-400">{sourceLocation?.description}</div> */}
                                        </div>
                                    </div>

                                    <div className="px-6 py-3 flex">
                                        <div className="border-l-2 border-dashed border-emerald-500/30 ml-6 pl-10">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-slate-400">Estimated travel time:</span>
                                                <span className="font-medium">25 mins</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-slate-400">Distance:</span>
                                                <span className="font-medium">8.5 km</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="h-6 w-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-400">Destination</div>
                                            {/* <div className="font-medium text-lg">{destinationLocation?.name}</div>
                                            <div className="text-sm text-slate-400">{destinationLocation?.description}</div> */}
                                        </div>
                                    </div>

                                    <Separator className="bg-slate-700" />

                                    <div className="p-6">
                                        <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <MapPin className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                                                <p className="text-slate-300">Map view will be displayed here</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </main>

                {showRoute && source && destination && (
                    <div id="route-section" className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">
                            Route from {locations.find((l) => l.id === source)?.name} to{" "}
                            {locations.find((l) => l.id === destination)?.name}
                        </h2>
                        {/* <RouteMap source={source} destination={destination} /> */}
                    </div>
                )}
            </main>
        </div>
    )
}

