import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { MapPin, ArrowRight, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FEATURED_DESTINATIONS } from "./data"

interface DestinationsSectionProps {
    onSelectDestination: (stop: string) => void
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
    onSelectDestination,
}) => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header with Title and "View All" Link */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                    <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/10 mb-3 px-3 py-1">
                        Valley Landmarks & Transit Connections
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Reach Iconic Heritage on Local Buses
                    </h2>
                    <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
                        Kathmandu Valley's top UNESCO sites, palaces, and peaceful gardens are easily accessible via direct local transit.
                    </p>
                </div>

                <Link to="/popular">
                    <Button
                        variant="outline"
                        className="border-slate-800 hover:border-emerald-500 text-emerald-400 hover:text-white bg-slate-900/80 cursor-pointer flex items-center gap-1.5 w-fit"
                    >
                        <span>View All Trending Hubs</span>
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </Link>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURED_DESTINATIONS.map((dest, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                    >
                        <Card className="border border-slate-800/80 bg-slate-900/70 overflow-hidden rounded-2xl flex flex-col h-full hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all">
                            {/* Image Banner */}
                            <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                                
                                <Badge className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-xs">
                                    {dest.category}
                                </Badge>

                                {dest.travelTimeMin && (
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-mono bg-slate-950/80 backdrop-blur-md text-slate-200 px-2 py-0.5 rounded-md border border-slate-700/60">
                                        <Clock className="h-3 w-3 text-teal-400" />
                                        <span>~{dest.travelTimeMin} min from center</span>
                                    </div>
                                )}
                            </div>

                            {/* Card Content */}
                            <CardContent className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                                        {dest.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                                        {dest.description}
                                    </p>

                                    {/* Tag pills */}
                                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                                        {dest.tags.map((tag, tIdx) => (
                                            <span
                                                key={tIdx}
                                                className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Transit stop and CTA */}
                                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1.5 text-slate-400 truncate max-w-[60%]">
                                        <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                        <span className="truncate">Stop: <strong className="text-slate-200">{dest.stop}</strong></span>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            onSelectDestination(dest.stop)
                                            window.scrollTo({ top: 380, behavior: "smooth" })
                                        }}
                                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 h-8 px-2.5 text-xs cursor-pointer flex items-center gap-1"
                                    >
                                        <span>Simulate Route</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
