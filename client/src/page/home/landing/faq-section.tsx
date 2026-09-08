import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FAQS } from "./data"

export const FaqSection: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

    const toggleFaq = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3 px-3 py-1">
                    Commuter Guidance
                </Badge>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="mt-2 text-slate-300 text-sm sm:text-base">
                    Everything you need to know about Kathmandu fares, bus transfers, and path calculations.
                </p>
            </div>

            <div className="space-y-3.5">
                {FAQS.map((faq, index) => {
                    const isOpen = expandedIndex === index
                    return (
                        <div
                            key={index}
                            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                                isOpen
                                    ? "bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20"
                                    : "bg-slate-900/50 border-slate-800/90 hover:border-slate-700"
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-5 text-left font-semibold text-white transition-colors cursor-pointer group"
                            >
                                <div className="flex items-center gap-3 pr-4">
                                    <HelpCircle className={`h-4 w-4 shrink-0 transition-colors ${isOpen ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-300"}`} />
                                    <span className="text-sm sm:text-base text-slate-100 group-hover:text-emerald-300 transition-colors">
                                        {faq.question}
                                    </span>
                                </div>
                                {isOpen ? (
                                    <ChevronUp className="h-4 w-4 text-emerald-400 shrink-0" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                                )}
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22 }}
                                        className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3.5"
                                    >
                                        <p>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
