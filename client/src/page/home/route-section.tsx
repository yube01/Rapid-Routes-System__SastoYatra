"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, ArrowRight, Navigation } from "lucide-react"
import { motion } from "framer-motion"

interface RoutePoint {
  name: string
  description?: string
  type: "start" | "stop" | "end"
}

interface RouteSectionProps {
  sourceLocation: string
  destinationLocation: string
  route: string[]
  transferPoints: string[]
  totalTime?: string
  totalDistance?: string
}

export default function RouteSection({
  sourceLocation,
  destinationLocation,
  route,
  transferPoints,
  totalTime,
  totalDistance,
}: RouteSectionProps) {
  const [animatedRoute, setAnimatedRoute] = useState<RoutePoint[]>([])

  console.log(route)

  // Create a complete route array with start, stops, and end
  useEffect(() => {
    const fullRoute: RoutePoint[] = []

    // Add starting point
    if (sourceLocation) {
      fullRoute.push({
        name: sourceLocation,
        description: sourceLocation,
        type: "start",
      })
    }

    // Add intermediate stops
    if (route.length > 0) {
      route.forEach((stop) => {
        fullRoute.push({
          name: stop,
          type: "stop",
        })
      })
    }

    // Add destination
    if (destinationLocation) {
      fullRoute.push({
        name: destinationLocation,
        description: destinationLocation,
        type: "end",
      })
    }

    // Animate each point appearing one by one
    const animateRoute = async () => {
      setAnimatedRoute([])
      for (let i = 0; i < fullRoute.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        setAnimatedRoute((prev) => [...prev, fullRoute[i]])
      }
    }

    animateRoute()
  }, [sourceLocation, destinationLocation, route])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // const lineVariants = {
  //   hidden: { pathLength: 0 },
  //   show: { pathLength: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  // }

  return (
    <motion.div
      id="route-section"
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Route</h2>
        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3 py-1">
          <Navigation className="mr-1 h-4 w-4" />
          Fastest Route
        </Badge>
      </div>

      <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <motion.div className="py-6" variants={containerVariants} initial="hidden" animate="show">
            {animatedRoute.map((point, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <div className="flex items-start px-6">
                  <div className="relative">
                    <motion.div
                      className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${point.type === "start"
                          ? "bg-emerald-500/20"
                          : point.type === "end"
                            ? "bg-emerald-500/20"
                            : "bg-slate-700/50"
                        }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MapPin
                        className={`h-6 w-6 ${point.type === "start" || point.type === "end" ? "text-emerald-400" : "text-slate-400"
                          }`}
                      />
                      {/* Pulse animation for the current point */}
                      {index === animatedRoute.length - 1 && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-emerald-400/20"
                          initial={{ scale: 0.8, opacity: 0.8 }}
                          animate={{ scale: 1.2, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </motion.div>

                    {/* Connecting line to next point */}
                    {index < animatedRoute.length - 1 && (
                      <motion.div
                        className="absolute left-1/2 top-12 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/30 to-slate-700/30"
                        style={{ height: "calc(100% - 12px)" }}
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    )}
                  </div>

                  <motion.div
                    className="ml-4 pb-8"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div
                      className={`font-medium text-lg ${point.type === "start" || point.type === "end" ? "text-white" : "text-slate-300"
                        }`}
                    >
                      {point.name}
                    </div>
                    {point.description && <div className="text-sm text-slate-400">{point.description}</div>}
                    {point.type === "start" && <div className="text-sm text-emerald-400 mt-1">Starting Point</div>}
                    {point.type === "end" && <div className="text-sm text-emerald-400 mt-1">Destination</div>}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Transfer Points Section */}
          {transferPoints.length > 0 && (
            <motion.div
              className="px-6 py-4 bg-slate-700/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-4 w-4 text-amber-400" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-amber-400">Transfer Points</div>
                  <div className="text-sm text-slate-300 mt-1">
                    {transferPoints.map((point, index) => (
                      <motion.span
                        key={index}
                        className="inline-block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.2 }}
                      >
                        {point}
                        {index < transferPoints.length - 1 && <span className="mx-1 text-slate-500">•</span>}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Route Summary */}
          <motion.div
            className="p-6 bg-slate-800/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Estimated Travel Time</div>
                  <div className="font-medium text-lg">{totalTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Total Distance</div>
                  <div className="font-medium text-lg">{totalDistance}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
