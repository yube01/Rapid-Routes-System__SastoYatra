import React from "react"
import { useNavigate } from "react-router-dom"
import { Navigation, ArrowRight, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export const CtaBanner: React.FC = () => {
    const navigate = useNavigate()

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
            <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-tr from-emerald-950/70 via-slate-900 to-teal-950/60 p-8 sm:p-14 text-center overflow-hidden shadow-2xl shadow-emerald-950/40">
                {/* Subtle schematic background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                        <span>Ready For Your Next Valley Journey?</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                        Start Riding Smarter Across Kathmandu
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        Find the fastest route from anywhere to anywhere in Kathmandu, Lalitpur, and Bhaktapur. Free, open, and built for commuters.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <Button
                            size="lg"
                            onClick={() => navigate("/routes")}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-6 rounded-xl shadow-lg cursor-pointer text-base flex items-center gap-2 group transition-all"
                        >
                            <Navigation className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                            <span>Launch Route Navigator</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate("/register")}
                            className="border-slate-700 hover:border-slate-600 bg-slate-900/80 hover:bg-slate-800 text-white px-7 py-6 rounded-xl cursor-pointer text-base flex items-center gap-2"
                        >
                            <UserPlus className="h-4 w-4 text-emerald-400" />
                            <span>Create Free Account</span>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
