import React from "react"
import { Badge } from "@/components/ui/badge"
import { Check, X, Minus } from "lucide-react"

const COMPARISON_ROWS = [
    {
        aspect: "Route Certainty",
        sasto: { text: "Dijkstra Shortest Path with exact stops", positive: true },
        rideHailing: { text: "Depends on driver's chosen route", neutral: true },
        asking: { text: "Frequently conflicting directions", negative: true },
    },
    {
        aspect: "Average Cost",
        sasto: { text: "Rs. 20 – Rs. 35 flat bracket", positive: true },
        rideHailing: { text: "Rs. 150 – Rs. 600+ per trip", negative: true },
        asking: { text: "Overcharging risk from conductors", negative: true },
    },
    {
        aspect: "Peak / Rain Surge",
        sasto: { text: "Zero surge pricing, ever", positive: true },
        rideHailing: { text: "Heavy 1.5x–2.5x rain/rush surge", negative: true },
        asking: { text: "Arbitrary late night inflated rates", negative: true },
    },
    {
        aspect: "Bus Switch Awareness",
        sasto: { text: "Automatic transfer alerts & line names", positive: true },
        rideHailing: { text: "Single vehicle point-to-point", neutral: true },
        asking: { text: "Unclear where to switch buses", negative: true },
    },
    {
        aspect: "Student & Senior Concession",
        sasto: { text: "45% discount on all public buses", positive: true },
        rideHailing: { text: "No discounts recognized", negative: true },
        asking: { text: "Dependent on conductor mood", negative: true },
    },
]

export const TransitComparison: React.FC = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3 px-3 py-1">
                    Value Comparison
                </Badge>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Making Kathmandu Commutes Affordable & Reliable
                </h2>
                <p className="mt-2.5 text-slate-300 text-sm sm:text-base">
                    Compare navigating with Sasto Yatra against ride-hailing and uninformed guesswork.
                </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-950/80 text-xs font-bold uppercase tracking-wider text-slate-400">
                            <th className="p-4 sm:p-5 w-1/4">Aspect</th>
                            <th className="p-4 sm:p-5 w-1/3 text-emerald-400 bg-emerald-950/20 border-x border-slate-800">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                    <span>Rapid Routes (Sasto Yatra)</span>
                                </div>
                            </th>
                            <th className="p-4 sm:p-5 w-1/5 text-slate-300">Ride Hailing Apps</th>
                            <th className="p-4 sm:p-5 w-1/5 text-slate-400">Asking Strangers</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                        {COMPARISON_ROWS.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-4 sm:p-5 font-semibold text-white">
                                    {row.aspect}
                                </td>
                                
                                {/* Sasto Yatra column */}
                                <td className="p-4 sm:p-5 bg-emerald-950/15 border-x border-slate-800 text-emerald-300 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                                        <span>{row.sasto.text}</span>
                                    </div>
                                </td>

                                {/* Ride Hailing */}
                                <td className="p-4 sm:p-5 text-slate-300">
                                    <div className="flex items-center gap-2">
                                        {row.rideHailing.negative ? (
                                            <X className="h-4 w-4 text-rose-400/80 shrink-0" />
                                        ) : (
                                            <Minus className="h-4 w-4 text-slate-500 shrink-0" />
                                        )}
                                        <span>{row.rideHailing.text}</span>
                                    </div>
                                </td>

                                {/* Asking Strangers */}
                                <td className="p-4 sm:p-5 text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <X className="h-4 w-4 text-rose-400/80 shrink-0" />
                                        <span>{row.asking.text}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
