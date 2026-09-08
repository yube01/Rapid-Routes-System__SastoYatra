import type { VehicleType } from "@/routes-dataset"

export interface FeaturedDestination {
    name: string
    category: "Cultural" | "Leisure" | "Heritage" | "Transit Hub"
    description: string
    image: string
    stop: string
    tags: string[]
    bestBusLine?: string
    travelTimeMin?: number
}

export interface FaqItem {
    question: string
    answer: string
    category?: string
}

export interface FareTier {
    minKm: number
    maxKm: number
    fare: number
    rangeLabel: string
    exampleRoute: string
    noteHint: string
}

export interface PresetCommute {
    from: string
    to: string
    label: string
    desc: string
    badge?: string
}

export interface TransitCorridor {
    id: string
    name: string
    code: string
    color: string
    operator: string
    vehicleType: VehicleType
    keyStops: string[]
    description: string
    frequency: string
    badge: string
}
