import React from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TRANSIT_CORRIDORS } from "./data"
import { getVehicleEmoji } from "@/utils/route-utils"

interface TransitCorridorsProps {
    onSelectRoute: (from: string, to: string) => void
}

export const TransitCorridors: React.FC<TransitCorridorsProps> = ({ onSelectRoute }) => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3 px-3 py-1">
                    Valley Transit Infrastructure
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Key Kathmandu Arteries & Bus Lines
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                    Explore the primary transit corridors mapping the valley's ring road loops, commercial spines, and heritage feeder links.
                </p>
            </div>

            {/* Corridor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TRANSIT_CORRIDORS.map((corridor, idx) => (
                    <motion.div
                        key={corridor.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="group flex flex-col justify-between p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-lg hover:shadow-emerald-950/20"
                    >
                        <div>
                            {/* Header Tags */}
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                                    {corridor.code}
                                </span>
                                <Badge className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[11px]">
                                    {corridor.badge}
                                </Badge>
                            </div>

                            {/* Corridor Title */}
                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                                {corridor.name}
                            </h3>

                            {/* Operator and Frequency */}
                            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                <div className="flex items-center gap-1.5">
                                    <span>{getVehicleEmoji(corridor.vehicleType)}</span>
                                    <span>{corridor.operator}</span>
                                </div>
                                <span>•</span>
                                <div className="flex items-center gap-1 text-slate-300">
                                    <Clock className="h-3.5 w-3.5 text-teal-400" />
                                    <span>{corridor.frequency}</span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                                {corridor.description}
                            </p>

                            {/* Key Stops Along Line */}
                            <div className="mt-6 pt-4 border-t border-slate-800/80">
                                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2.5 flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-emerald-400" />
                                    Key Waypoints & Stops:
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {corridor.keyStops.map((stop, sIdx) => (
                                        <span
                                            key={sIdx}
                                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                                        >
                                            {stop}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Test Route Action */}
                        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                {corridor.keyStops[0]} ↔ {corridor.keyStops[corridor.keyStops.length - 1]}
                            </span>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                    onSelectRoute(corridor.keyStops[0], corridor.keyStops[corridor.keyStops.length - 1])
                                    window.scrollTo({ top: 380, behavior: "smooth" })
                                }}
                                className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 text-xs px-2.5 h-8 cursor-pointer flex items-center gap-1"
                            >
                                <span>Simulate Line</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
