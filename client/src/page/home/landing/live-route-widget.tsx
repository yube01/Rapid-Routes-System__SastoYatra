import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    MapPin,
    Navigation,
    Clock,
    Banknote,
    Zap,
    ArrowRightLeft,
    ArrowRight,
    Bus,
    Shuffle,
    AlertCircle,
    Coins,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { allStops } from "@/constants/allstops"
import { mergedGraph } from "@/routes-dataset"
import { dijkstra } from "@/algorithm"
import {
    buildRouteSegments,
    calculateTotalFareWithTransfers,
    getTransferCount,
    getVehicleEmoji,
} from "@/utils/route-utils"

interface LiveRouteWidgetProps {
    source: string
    destination: string
    onSourceChange: (stop: string) => void
    onDestinationChange: (stop: string) => void
    onSwap: () => void
    onOpenFullNavigator: (from: string, to: string) => void
}

export const LiveRouteWidget: React.FC<LiveRouteWidgetProps> = ({
    source,
    destination,
    onSourceChange,
    onDestinationChange,
    onSwap,
    onOpenFullNavigator,
}) => {
    // Dijkstra and Segment computation
    const routeData = useMemo(() => {
        if (!source || !destination || source === destination) {
            return null
        }
        try {
            const result = dijkstra(mergedGraph, source, destination)
            if (!result || !result.path || result.path.length === 0) {
                return null
            }
            const segments = buildRouteSegments(result.path)
            const transferFare = calculateTotalFareWithTransfers(segments)
            const transfers = getTransferCount(segments)

            return {
                path: result.path,
                distance: (result.distance ?? 0).toFixed(1),
                time: Math.round(result.time ?? 0),
                fare: transferFare,
                segments,
                transfers,
            }
        } catch (e) {
            console.error("Dijkstra calculation failed", e)
            return null
        }
    }, [source, destination])

    // Khulla Paisa recommendation text based on fare
    const khullaPaisaTip = useMemo(() => {
        if (!routeData) return ""
        const fare = routeData.fare
        if (fare <= 20) return "Carry exact Rs. 20 note or coin"
        if (fare === 25) return "Keep Rs. 20 + Rs. 5 coin ready"
        if (fare === 30) return "Three Rs. 10 notes or exact Rs. 30"
        if (fare === 35) return "Rs. 20 + Rs. 10 + Rs. 5 coin"
        return `Prepare exact Rs. ${fare} to avoid conductor disputes`
    }, [routeData])

    return (
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:mt-2 mb-16">
            <Card className="border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-slate-950/80 rounded-2xl overflow-hidden">
                {/* Terminal Header */}
                <CardHeader className="border-b border-slate-800 bg-slate-950/60 px-5 sm:px-8 py-4 sm:py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                <Zap className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                                    <span>Interactive Transit Simulator</span>
                                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-normal border border-slate-700">
                                        Kathmandu V-Graph
                                    </span>
                                </CardTitle>
                                <CardDescription className="text-xs text-slate-400 mt-0.5">
                                    Instant Dijkstra graph calculation across Kathmandu, Lalitpur & Bhaktapur
                                </CardDescription>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-center">
                            <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs px-2.5 py-1 font-medium">
                                Real-Time Bidirectional Graph
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-8">
                    {/* Origin & Destination Selector Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-11 gap-3 sm:gap-4 items-center">
                        {/* Origin Stop */}
                        <div className="md:col-span-5 space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                                Origin Stop (प्रस्थान बिन्दु)
                            </label>
                            <Select value={source} onValueChange={onSourceChange}>
                                <SelectTrigger className="w-full bg-slate-950/80 border-slate-700/80 hover:border-slate-600 text-white h-12 rounded-xl focus:ring-emerald-500 transition-colors">
                                    <SelectValue placeholder="Select Origin Stop" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 text-slate-100 border-slate-700 max-h-64 shadow-xl">
                                    {allStops.map((stop) => (
                                        <SelectItem key={stop} value={stop} className="cursor-pointer hover:bg-slate-800 focus:bg-emerald-950/60 focus:text-emerald-300">
                                            {stop}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Swap Direction Button */}
                        <div className="md:col-span-1 flex justify-center pt-2 md:pt-5">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={onSwap}
                                title="Swap Origin and Destination"
                                className="h-10 w-10 rounded-xl border-slate-700 hover:border-emerald-500 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer transition-all shadow-md active:scale-95"
                            >
                                <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Destination Stop */}
                        <div className="md:col-span-5 space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                <Navigation className="h-3.5 w-3.5 text-teal-400" />
                                Destination Stop (गन्तव्य)
                            </label>
                            <Select value={destination} onValueChange={onDestinationChange}>
                                <SelectTrigger className="w-full bg-slate-950/80 border-slate-700/80 hover:border-slate-600 text-white h-12 rounded-xl focus:ring-emerald-500 transition-colors">
                                    <SelectValue placeholder="Select Destination Stop" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 text-slate-100 border-slate-700 max-h-64 shadow-xl">
                                    {allStops.map((stop) => (
                                        <SelectItem key={stop} value={stop} className="cursor-pointer hover:bg-slate-800 focus:bg-emerald-950/60 focus:text-emerald-300">
                                            {stop}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Results / Route Board Display */}
                    <AnimatePresence mode="wait">
                        {routeData ? (
                            <motion.div
                                key={`${source}-${destination}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mt-7 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-950/80 to-emerald-950/20 p-5 sm:p-6"
                            >
                                {/* Ticket Header Banner */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                        <span className="text-xs sm:text-sm font-semibold text-white">
                                            Optimal Path Found
                                        </span>
                                        {routeData.transfers > 0 ? (
                                            <Badge className="bg-amber-950/70 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1 font-medium">
                                                <Shuffle className="h-3 w-3" />
                                                <span>{routeData.transfers} Bus Switch Required</span>
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 text-xs flex items-center gap-1 font-medium">
                                                <Bus className="h-3 w-3" />
                                                <span>Direct Route (No Switch)</span>
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Khulla Paisa Commuter Advice */}
                                    <div className="flex items-center gap-1.5 text-xs text-amber-300/90 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-lg">
                                        <Coins className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                        <span>{khullaPaisaTip}</span>
                                    </div>
                                </div>

                                {/* Metric Highlights */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-800/80 text-center">
                                    {/* Fare */}
                                    <div className="space-y-1">
                                        <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                                            <Banknote className="h-3.5 w-3.5 text-emerald-400" />
                                            <span>Fare Estimate</span>
                                        </div>
                                        <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                                            Rs. {routeData.fare}
                                        </div>
                                        <div className="text-[11px] text-slate-400">
                                            {routeData.transfers > 0 ? "Sum of segment fares" : "Official single fare"}
                                        </div>
                                    </div>

                                    {/* Distance */}
                                    <div className="space-y-1">
                                        <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                                            <Navigation className="h-3.5 w-3.5 text-teal-400" />
                                            <span>Distance</span>
                                        </div>
                                        <div className="text-2xl sm:text-3xl font-black text-white">
                                            {routeData.distance}{" "}
                                            <span className="text-sm font-semibold text-slate-400">km</span>
                                        </div>
                                        <div className="text-[11px] text-slate-400">Road graph distance</div>
                                    </div>

                                    {/* Time */}
                                    <div className="space-y-1">
                                        <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                                            <Clock className="h-3.5 w-3.5 text-cyan-400" />
                                            <span>Travel Time</span>
                                        </div>
                                        <div className="text-2xl sm:text-3xl font-black text-white">
                                            ~{routeData.time}{" "}
                                            <span className="text-sm font-semibold text-slate-400">min</span>
                                        </div>
                                        <div className="text-[11px] text-slate-400">Avg. valley bus speed</div>
                                    </div>

                                    {/* Stops */}
                                    <div className="space-y-1">
                                        <div className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                                            <Bus className="h-3.5 w-3.5 text-indigo-400" />
                                            <span>Transit Stops</span>
                                        </div>
                                        <div className="text-2xl sm:text-3xl font-black text-white">
                                            {routeData.path.length}
                                        </div>
                                        <div className="text-[11px] text-slate-400">Stops traversed</div>
                                    </div>
                                </div>

                                {/* Bus Segments & Transfer Callouts */}
                                {routeData.segments.length > 0 && (
                                    <div className="pt-5 pb-3">
                                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                                            Bus Operators & Line Breakdown:
                                        </div>
                                        <div className="space-y-2.5">
                                            {routeData.segments.map((seg, sIdx) => (
                                                <div
                                                    key={sIdx}
                                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs gap-2"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-base">{getVehicleEmoji(seg.vehicleType)}</span>
                                                        <div>
                                                            <div className="font-bold text-white flex items-center gap-1.5">
                                                                <span>{seg.routeName}</span>
                                                                <span className="text-slate-400 text-[10px] font-normal">
                                                                    ({seg.operator})
                                                                </span>
                                                            </div>
                                                            <div className="text-[11px] text-slate-400 mt-0.5">
                                                                Board at <strong className="text-emerald-400">{seg.stops[0]}</strong> → Alight at <strong className="text-teal-400">{seg.stops[seg.stops.length - 1]}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center font-mono">
                                                        <span className="text-slate-400">{seg.segmentDistance.toFixed(1)} km</span>
                                                        <span className="text-slate-500">•</span>
                                                        <span className="text-slate-400">~{Math.round(seg.segmentTime)} min</span>
                                                        <span className="text-slate-500">•</span>
                                                        <span className="font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                                                            Rs. {seg.segmentFare}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Sequential Stop Pills */}
                                <div className="mt-4 pt-4 border-t border-slate-800/80">
                                    <div className="text-xs text-slate-400 font-medium mb-2.5 flex items-center justify-between">
                                        <span>Stop Progression ({routeData.path.length} stops):</span>
                                        <span className="text-[11px] text-slate-400">Scroll horizontally if needed →</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                                        {routeData.path.map((stop, index) => {
                                            const isFirst = index === 0
                                            const isLast = index === routeData.path.length - 1
                                            return (
                                                <React.Fragment key={index}>
                                                    <span
                                                        className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                                                            isFirst
                                                                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                                                                : isLast
                                                                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                                                                : "bg-slate-800/90 text-slate-200 border border-slate-700/80"
                                                        }`}
                                                    >
                                                        {stop}
                                                    </span>
                                                    {index < routeData.path.length - 1 && (
                                                        <span className="text-slate-600 text-xs shrink-0">→</span>
                                                    )}
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Open in full navigator button */}
                                <div className="mt-5 pt-3 flex flex-wrap items-center justify-between gap-3">
                                    <div className="text-[11px] text-slate-400">
                                        Need live step-by-step navigation with stop timers?
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => onOpenFullNavigator(source, destination)}
                                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs cursor-pointer flex items-center gap-1.5 transition-all"
                                    >
                                        <span>Open in Full Interactive Navigator</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="mt-6 p-6 rounded-2xl bg-slate-950/60 border border-slate-800 text-center text-sm text-slate-400 flex flex-col items-center justify-center gap-2">
                                <AlertCircle className="h-6 w-6 text-slate-500" />
                                <p>Select different origin and destination stops above to view the live shortest route and fare calculation.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </section>
    )
}
