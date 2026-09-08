import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/navbar"
import Footer from "../components/footer"

// Modular landing components
import { HeroSection } from "./landing/hero-section"
import { LiveRouteWidget } from "./landing/live-route-widget"
import { TransitNetworkBanner } from "./landing/transit-network-banner"
import { TransitCorridors } from "./landing/transit-corridors"
import { FareMatrixSection } from "./landing/fare-matrix-section"
import { DestinationsSection } from "./landing/destinations-section"
import { CommuterFeatures } from "./landing/commuter-features"
import { TransitComparison } from "./landing/transit-comparison"
import { FaqSection } from "./landing/faq-section"
import { CtaBanner } from "./landing/cta-banner"

const LandingPage: React.FC = () => {
    const navigate = useNavigate()

    // Interactive simulator state
    const [source, setSource] = useState<string>("Bhadrakali")
    const [destination, setDestination] = useState<string>("Naya Bus Park")

    // Swap origin and destination
    const handleSwap = () => {
        const temp = source
        setSource(destination)
        setDestination(temp)
    }

    // Apply quick commute preset
    const handleSelectPreset = (from: string, to: string) => {
        setSource(from)
        setDestination(to)
    }

    // Apply destination from landmark cards
    const handleSelectDestination = (stop: string) => {
        setDestination(stop)
    }

    // Smooth scroll to fare matrix
    const handleScrollToFareMatrix = () => {
        const el = document.getElementById("fare-matrix")
        el?.scrollIntoView({ behavior: "smooth" })
    }

    // Navigate to full route navigator with optional query or state
    const handleOpenFullNavigator = (from?: string, to?: string) => {
        if (from && to) {
            navigate(`/routes?source=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}`)
        } else {
            navigate("/routes")
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#080d14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans">
            {/* Main Application Header */}
            <Navbar />

            {/* Subtle Urban Grid & Ambient Accent (Non-intrusive) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[400px] bg-emerald-600/[0.07] blur-[120px] rounded-full" />
                <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] bg-teal-600/[0.04] blur-[140px] rounded-full" />
            </div>

            {/* Main Landing Flow */}
            <main className="relative z-10 flex-1 pt-20 pb-12">
                {/* 1. Hero with value proposition and quick presets */}
                <HeroSection
                    onSelectPreset={handleSelectPreset}
                    onScrollToFareMatrix={handleScrollToFareMatrix}
                    onLaunchRouteFinder={() => handleOpenFullNavigator(source, destination)}
                />

                {/* 2. Interactive Transit Terminal & Live Route Simulator */}
                <LiveRouteWidget
                    source={source}
                    destination={destination}
                    onSourceChange={setSource}
                    onDestinationChange={setDestination}
                    onSwap={handleSwap}
                    onOpenFullNavigator={handleOpenFullNavigator}
                />

                {/* 3. Valley Transit Network Key Metrics Banner */}
                <TransitNetworkBanner />

                {/* 4. Kathmandu Transit Corridors & Arteries */}
                <TransitCorridors
                    onSelectRoute={handleSelectPreset}
                />

                {/* 5. Interactive Fare Matrix & Khulla Paisa Explorer */}
                <FareMatrixSection />

                {/* 6. Featured Valley Cultural Destinations */}
                <DestinationsSection
                    onSelectDestination={handleSelectDestination}
                />

                {/* 7. Commuter Advantages & Features */}
                <CommuterFeatures />

                {/* 8. Commute Value Comparison */}
                <TransitComparison />

                {/* 9. Frequently Asked Questions Accordion */}
                <FaqSection />

                {/* 10. Bottom Launch Call to Action */}
                <CtaBanner />
            </main>

            {/* Global Footer */}
            <Footer />
        </div>
    )
}

export default LandingPage
