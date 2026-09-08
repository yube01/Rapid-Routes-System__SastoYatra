import React, { useState } from "react"
import { Banknote, CheckCircle2, Info, Coins, GraduationCap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FARE_TIERS } from "./data"
import { calculateSegmentFare } from "@/utils/route-utils"

export const FareMatrixSection: React.FC = () => {
    const [sliderKm, setSliderKm] = useState<number>(7.5)

    const computedFare = calculateSegmentFare(sliderKm)
    const studentFare = Math.round(computedFare * 0.55) // 45% student discount

    // Find which tier is active based on sliderKm
    const activeTierIndex = FARE_TIERS.findIndex(
        (tier) => sliderKm >= tier.minKm && sliderKm <= tier.maxKm
    )

    return (
        <section id="fare-matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                
                {/* Left Column: Context and Rules */}
                <div className="lg:col-span-5 space-y-6">
                    <div>
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3 px-3 py-1">
                            Official Fare Policy
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                            Transparent Bus Fares Across Kathmandu
                        </h2>
                        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                            Never worry about erratic fare demands. Rapid Routes computes distance-based fares governed by the official Nepal Department of Transport Management (DoTM) rate matrix.
                        </p>
                    </div>

                    {/* Interactive "Khulla Paisa" Fare Explorer Card */}
                    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                                <Coins className="h-4 w-4 text-emerald-400" />
                                Interactive Fare Tester
                            </span>
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                {sliderKm.toFixed(1)} km
                            </span>
                        </div>

                        {/* Slider */}
                        <div className="space-y-2">
                            <input
                                type="range"
                                min="1"
                                max="28"
                                step="0.5"
                                value={sliderKm}
                                onChange={(e) => setSliderKm(parseFloat(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                                <span>1 km (Inner City)</span>
                                <span>15 km</span>
                                <span>28 km (Full Ring Road)</span>
                            </div>
                        </div>

                        {/* Calculated result box */}
                        <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 flex items-center justify-between">
                            <div>
                                <div className="text-[11px] text-slate-400 uppercase font-medium">
                                    Official Standard Fare:
                                </div>
                                <div className="text-3xl font-black text-emerald-400 mt-0.5">
                                    Rs. {computedFare}
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-[11px] text-slate-400 uppercase font-medium flex items-center justify-end gap-1">
                                    <GraduationCap className="h-3.5 w-3.5 text-teal-400" />
                                    <span>Student Card (45% off):</span>
                                </div>
                                <div className="text-xl font-bold text-teal-300 mt-0.5">
                                    Rs. {studentFare}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Guidelines Checklist */}
                    <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                        <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span><strong>Flat base fare of Rs. 20</strong> for inner-city commutes up to 5 km.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span><strong>Predictable increments</strong> of Rs. 5 for every additional 5 km bracket.</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                            <span><strong>Legal Concessions</strong>: Legitimate student ID cards qualify for 45% discount across all public operators.</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual Tiered Table */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-xl overflow-hidden rounded-2xl">
                        <CardHeader className="bg-slate-950/70 border-b border-slate-800 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                                    <Banknote className="h-4 w-4 text-emerald-400" />
                                    <span>Government Distance-Tier Matrix</span>
                                </CardTitle>
                                <span className="text-xs text-slate-400 font-mono">Nepal DoTM Standard</span>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0 divide-y divide-slate-800/80">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/40">
                                <div className="col-span-4">Distance Tier</div>
                                <div className="col-span-5">Representative Commute</div>
                                <div className="col-span-3 text-right">Standard Fare</div>
                            </div>

                            {/* Table Rows */}
                            {FARE_TIERS.map((tier, idx) => {
                                const isCurrent = activeTierIndex === idx
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setSliderKm((tier.minKm + tier.maxKm) / 2)}
                                        className={`grid grid-cols-12 px-5 py-4 text-sm items-center cursor-pointer transition-all duration-200 ${
                                            isCurrent
                                                ? "bg-emerald-950/30 border-l-4 border-emerald-400 text-white"
                                                : "hover:bg-slate-800/40 text-slate-300"
                                        }`}
                                    >
                                        <div className="col-span-4 font-mono font-medium text-white flex items-center gap-2">
                                            {isCurrent && (
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                                            )}
                                            <span>{tier.rangeLabel}</span>
                                        </div>

                                        <div className="col-span-5 text-xs text-slate-400">
                                            <div>{tier.exampleRoute}</div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">
                                                {tier.noteHint}
                                            </div>
                                        </div>

                                        <div className="col-span-3 text-right">
                                            <span className={`font-black text-base ${isCurrent ? "text-emerald-400 font-mono" : "text-slate-200"}`}>
                                                Rs. {tier.fare}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>

                    {/* Advisory footer */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 px-2">
                        <Info className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                        <span>Fares shown reflect public transport standard rates approved for Kathmandu, Lalitpur, and Bhaktapur.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
