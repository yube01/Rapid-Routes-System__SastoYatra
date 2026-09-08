import React from "react"
import { motion } from "framer-motion"
import {
    ShieldCheck,
    Shuffle,
    GitCommit,
    Zap,
    TrendingUp,
    Bookmark,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const COMMUTER_FEATURES = [
    {
        icon: ShieldCheck,
        title: "Fair Fare Guarantee",
        desc: "Strictly adheres to official distance brackets (Rs. 20–35). Never worry about conductors demanding arbitrary arbitrary extra rupees.",
        badge: "Anti-Overcharging",
        accent: "emerald",
    },
    {
        icon: Shuffle,
        title: "Smart Transfer Guidance",
        desc: "Instantly alerts you when you need to switch between Route 1, 2, or 3 lines (e.g., at Chabahil, Ratna Park, or Koteshwar).",
        badge: "Multi-Leg Routing",
        accent: "teal",
    },
    {
        icon: GitCommit,
        title: "Dijkstra Graph Intelligence",
        desc: "Queries a bidirectional graph network to simultaneously minimize distance and valley traffic transit times in sub-milliseconds.",
        badge: "Shortest Path",
        accent: "cyan",
    },
    {
        icon: Zap,
        title: "Bandwidth-Light Performance",
        desc: "Designed to load in milliseconds with zero heavy external map bloat, perfect for spotty mobile networks around valley intersections.",
        badge: "Ultra Fast",
        accent: "amber",
    },
    {
        icon: TrendingUp,
        title: "Decay-Ranked Valley Hotspots",
        desc: "Algorithmic time-decay ranking ensures current seasonal hubs (festivals, college terms, temple events) rise to the top of trending feeds.",
        badge: "Smart Scoring",
        accent: "indigo",
    },
    {
        icon: Bookmark,
        title: "Saved Commutes & History",
        desc: "Create a free account to store your daily college, office, or home commutes and access them in one tap from your phone.",
        badge: "Convenience",
        accent: "emerald",
    },
]

export const CommuterFeatures: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3 px-3 py-1">
                    Built For Daily Valley Life
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Why Kathmandu Commuters Rely on Sasto Yatra
                </h2>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                    Public transport in Kathmandu is fast and affordable when you know the lines. We strip away the guesswork.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {COMMUTER_FEATURES.map((feat, idx) => {
                    const Icon = feat.icon
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                            className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-emerald-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-md hover:shadow-emerald-950/20 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-11 w-11 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-950/40 group-hover:border-emerald-500/40 transition-all">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                                        {feat.badge}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                                    {feat.title}
                                </h3>

                                <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    {feat.desc}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
