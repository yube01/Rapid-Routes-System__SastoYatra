import React from "react"
import { motion } from "framer-motion"
import { Navigation, Banknote, ArrowRight, Compass, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { POPULAR_PRESETS } from "./data"

interface HeroSectionProps {
    onSelectPreset: (from: string, to: string) => void
    onScrollToFareMatrix: () => void
    onLaunchRouteFinder: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    onSelectPreset,
    onScrollToFareMatrix,
    onLaunchRouteFinder,
}) => {
    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-10 text-center">
            {/* Top Identity Chip */}
            <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-sm shadow-emerald-950/60"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-semibold tracking-wide">Kathmandu Valley Transit Engine</span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="hidden sm:inline text-slate-400 font-normal">50+ Stops Mapped</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
            >
                Navigate Kathmandu Buses with{" "}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Confidence & Fair Fares
                </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
            >
                Never guess your bus stop or overpay a conductor again. Calculate exact Dijkstra transit routes, official government-tiered fares, and smart bus interchange points in milliseconds.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
                <Button
                    size="lg"
                    onClick={onLaunchRouteFinder}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-6 text-base rounded-xl shadow-lg shadow-emerald-950/40 cursor-pointer flex items-center gap-2 group transition-all"
                >
                    <Navigation className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    <span>Launch Route Finder</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                    size="lg"
                    variant="outline"
                    onClick={onScrollToFareMatrix}
                    className="border-slate-800 hover:border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 px-6 py-6 text-base rounded-xl cursor-pointer flex items-center gap-2"
                >
                    <Banknote className="h-4 w-4 text-emerald-400" />
                    <span>View Fare Matrix</span>
                </Button>
            </motion.div>

            {/* Trust / Valley Proof Badges */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
            >
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Official DoTM Fare Brackets</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Compass className="h-4 w-4 text-teal-400" />
                    <span>Shortest Path Dijkstra Graph</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>Zero Login Required to Search</span>
                </div>
            </motion.div>

            {/* Quick Pick Presets */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 pt-6 border-t border-slate-800/80 max-w-4xl mx-auto"
            >
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
                    <span>Try Popular Daily Commutes:</span>
                    <span className="hidden sm:inline text-slate-400 font-normal">Click any commute to simulate</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {POPULAR_PRESETS.map((preset, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => onSelectPreset(preset.from, preset.to)}
                            className="group relative flex flex-col text-left p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer shadow-sm"
                        >
                            <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">
                                    {preset.label}
                                </span>
                                {preset.badge && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-medium shrink-0 ml-1">
                                        {preset.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] text-slate-400 truncate">
                                {preset.desc}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
