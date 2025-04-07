"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Navigation, History, Clock, Calendar, ArrowRight, Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { Navbar } from "../components/navbar"

// Dummy data for user history
const historyData = [
    {
        id: "hist1",
        source: { id: "loc1", name: "Downtown", description: "City Center" },
        destination: { id: "loc5", name: "Beach", description: "Coastal Area" },
        distance: "12.5 km",
        time: "35 mins",
        searchedAt: "2025-04-06T10:30:00",
        completed: true,
    },
    {
        id: "hist2",
        source: { id: "loc3", name: "University", description: "Main Campus" },
        destination: { id: "loc4", name: "Shopping Mall", description: "Central Mall" },
        distance: "4.2 km",
        time: "12 mins",
        searchedAt: "2025-04-05T15:45:00",
        completed: true,
    },
    {
        id: "hist3",
        source: { id: "loc2", name: "Airport", description: "International Terminal" },
        destination: { id: "loc1", name: "Downtown", description: "City Center" },
        distance: "18.2 km",
        time: "45 mins",
        searchedAt: "2025-04-04T08:15:00",
        completed: false,
    },
    {
        id: "hist4",
        source: { id: "loc4", name: "Shopping Mall", description: "Central Mall" },
        destination: { id: "loc2", name: "Airport", description: "International Terminal" },
        distance: "20.1 km",
        time: "50 mins",
        searchedAt: "2025-04-03T17:20:00",
        completed: true,
    },
    {
        id: "hist5",
        source: { id: "loc1", name: "Downtown", description: "City Center" },
        destination: { id: "loc3", name: "University", description: "Main Campus" },
        distance: "5.8 km",
        time: "15 mins",
        searchedAt: "2025-04-02T12:10:00",
        completed: true,
    },
    {
        id: "hist6",
        source: { id: "loc5", name: "Beach", description: "Coastal Area" },
        destination: { id: "loc1", name: "Downtown", description: "City Center" },
        distance: "12.5 km",
        time: "35 mins",
        searchedAt: "2025-04-01T09:45:00",
        completed: false,
    },
]

export default function HistoryPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all")
    const [historyItems, setHistoryItems] = useState(historyData)

    const filteredHistory = historyItems
        .filter((item) => {
            if (filter === "completed") return item.completed
            if (filter === "incomplete") return !item.completed
            return true
        })
        .filter((item) => {
            if (!searchTerm) return true
            const searchLower = searchTerm.toLowerCase()
            return (
                item.source.name.toLowerCase().includes(searchLower) ||
                item.destination.name.toLowerCase().includes(searchLower)
            )
        })

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    const handleClearHistory = () => {
        setHistoryItems([])
    }

    const handleDeleteItem = (id: string) => {
        setHistoryItems((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <div className="h-[90vh] lg:w-[1280px] md:w-full flex flex-col">
            <Navbar />

            <header className="pt-16 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-block p-2 bg-slate-800/50 rounded-full mb-4">
                        <History className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Route History</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">View and manage your previously searched routes</p>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 max-w-4xl">
                <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl text-emerald-400">Search & Filter</CardTitle>
                        <CardDescription className="text-slate-300">Find specific routes in your history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search by location name..."
                                        className="pl-9 bg-slate-700 border-slate-600 text-white"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Select value={filter} onValueChange={setFilter}>
                                    <SelectTrigger className="w-full bg-slate-700 border-slate-600">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-700 text-white border-slate-600">
                                        <SelectItem value="all">All Routes</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="incomplete">Not Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border-slate-700 pt-4 flex justify-between">
                        <div className="text-sm text-slate-400">
                            {filteredHistory.length} {filteredHistory.length === 1 ? "route" : "routes"} found
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                            onClick={handleClearHistory}
                        >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Clear History
                        </Button>
                    </CardFooter>
                </Card>

                {filteredHistory.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-block p-3 bg-slate-800/50 rounded-full mb-4">
                            <History className="h-10 w-10 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">No routes found</h3>
                        <p className="text-slate-400 mb-6">
                            {historyItems.length === 0
                                ? "You haven't searched for any routes yet."
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
                    <div className="space-y-6">
                        {filteredHistory.map((item) => (
                            <Card key={item.id} className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <CardTitle className="text-lg text-emerald-400">
                                                {item.source.name} to {item.destination.name}
                                            </CardTitle>
                                            <CardDescription className="text-slate-400 flex items-center gap-2">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(item.searchedAt)}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={
                                                item.completed
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                                    : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                            }
                                        >
                                            {item.completed ? "Completed" : "Not Completed"}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{item.source.name}</div>
                                                <div className="text-sm text-slate-400">{item.source.description}</div>
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
                                                <div className="font-medium">{item.destination.name}</div>
                                                <div className="text-sm text-slate-400">{item.destination.description}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4 mt-3">
                                        <div className="flex items-center gap-2 text-sm bg-slate-700/50 px-3 py-1 rounded-full">
                                            <Clock className="h-4 w-4 text-emerald-400" />
                                            <span>{item.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm bg-slate-700/50 px-3 py-1 rounded-full">
                                            <ArrowRight className="h-4 w-4 text-emerald-400" />
                                            <span>{item.distance}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <Separator className="bg-slate-700" />
                                <CardFooter className="pt-4 flex justify-between">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                                        onClick={() => handleDeleteItem(item.id)}
                                    >
                                        <Trash2 className="mr-1 h-4 w-4" />
                                        Remove
                                    </Button>
                                    <Link to={`/?source=${item.source.id}&destination=${item.destination.id}`}>
                                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                            <Navigation className="mr-1 h-4 w-4" />
                                            Search Again
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

