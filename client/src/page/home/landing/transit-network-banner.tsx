import React from "react"
import { COMMUTER_METRICS } from "./data"

export const TransitNetworkBanner: React.FC = () => {
    return (
        <section className="border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-md py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center divide-x divide-slate-800/60 -ml-px">
                    {COMMUTER_METRICS.map((metric, idx) => (
                        <div key={idx} className="px-3 sm:px-6">
                            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                {metric.value}
                            </div>
                            <div className="text-sm font-semibold text-white mt-1">
                                {metric.label}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                                {metric.detail}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
