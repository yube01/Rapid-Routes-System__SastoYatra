"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Banknote, Route, Save, ArrowRightLeft, Bus } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import type { RouteSegment } from "@/utils/route-utils"
import { getVehicleEmoji, getTransferCount } from "@/utils/route-utils"


interface RouteSectionProps {
  route: string[]
  transferPoints?: string[]
  totalTime?: string
  totalDistance?: string
  totalCost?: number
  segments?: RouteSegment[]
  transferFare?: number
}

export default function RouteSection({
  route,
  totalTime,
  totalDistance,
  totalCost,
  segments,
  transferFare,
}: RouteSectionProps) {

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

  const handleSubmitClick = (async (id: string, source: string, destination: string) => {
    const response = await fetch(`http://localhost:5005/history/createHistory`, {
      method: "POST",
      body: JSON.stringify({ id, source, destination }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
    })

    const datas = await response.json();
    if (datas.msg === "Location added Sucessfully!") {
      toast("Route saved successfully!")
    }
  });

  const id = localStorage.getItem("user_info") || ""

  const transferCount = segments ? getTransferCount(segments) : 0;
  const hasSegments = segments && segments.length > 0;

  // Build a set of transfer stop names for highlighting
  const transferStops = new Set<string>();
  if (hasSegments && segments.length > 1) {
    for (let i = 0; i < segments.length - 1; i++) {
      // Last stop of current segment = first stop of next = transfer point
      const lastStop = segments[i].stops[segments[i].stops.length - 1];
      transferStops.add(lastStop);
    }
  }

  // Map each stop to its segment info
  const stopSegmentMap = new Map<number, { segIndex: number; isTransferPoint: boolean; isSegmentStart: boolean }>();
  if (hasSegments) {
    let pathIndex = 0;
    segments.forEach((seg, segIndex) => {
      seg.stops.forEach((_, stopIdx) => {
        const isSegmentStart = stopIdx === 0 && segIndex > 0;
        const isTransferPoint = segIndex > 0 && stopIdx === 0;
        stopSegmentMap.set(pathIndex, { segIndex, isTransferPoint, isSegmentStart });
        // Only advance pathIndex if it's not a duplicate transfer stop
        if (!(segIndex > 0 && stopIdx === 0)) {
          pathIndex++;
        }
      });
    });
  }

  // Flatten segments into display items
  interface DisplayItem {
    type: "stop" | "transfer";
    stopName?: string;
    isFirst?: boolean;
    isLast?: boolean;
    segment?: RouteSegment;
    fromSegment?: RouteSegment;
    toSegment?: RouteSegment;
  }

  const displayItems: DisplayItem[] = [];
  if (hasSegments) {
    segments.forEach((seg, segIndex) => {
      // Add transfer marker before this segment (except the first)
      if (segIndex > 0) {
        displayItems.push({
          type: "transfer",
          fromSegment: segments[segIndex - 1],
          toSegment: seg,
          stopName: seg.stops[0],
        });
      }

      seg.stops.forEach((stop, stopIdx) => {
        // Skip the first stop of non-first segments (it's the transfer point already shown)
        if (segIndex > 0 && stopIdx === 0) return;

        const isFirst = segIndex === 0 && stopIdx === 0;
        const isLast = segIndex === segments.length - 1 && stopIdx === seg.stops.length - 1;

        displayItems.push({
          type: "stop",
          stopName: stop,
          isFirst,
          isLast,
          segment: seg,
        });
      });
    });
  } else {
    // Fallback: no segments, just show flat route
    route.forEach((stop, index) => {
      displayItems.push({
        type: "stop",
        stopName: stop,
        isFirst: index === 0,
        isLast: index === route.length - 1,
      });
    });
  }

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
        <div className="flex items-center gap-3">
          {hasSegments && transferCount > 0 && (
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-400 border-amber-500/30 px-3 py-1 h-10 text-sm"
            >
              <ArrowRightLeft size={16} className="mr-1.5" />
              {transferCount} Transfer{transferCount > 1 ? "s" : ""}
            </Badge>
          )}
          <Badge
            onClick={() => handleSubmitClick(id, route[0], route[route.length - 1])}
            variant="outline"
            className="bg-emerald-500/10 hover:bg-emerald-900/10 cursor-pointer h-10 text-sm text-emerald-400  border-emerald-500/30 px-3 py-1"
          >
            <Save size={20} />
            Save Route
          </Badge>
        </div>
      </div>

      {/* Segment summary badges */}
      {hasSegments && (
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {segments.map((seg, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <Badge
                variant="outline"
                className={`text-xs px-2.5 py-1 ${seg.vehicleType === "bus"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                    : seg.vehicleType === "micro"
                      ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                      : "bg-orange-500/10 text-orange-400 border-orange-500/30"
                  }`}
              >
                {getVehicleEmoji(seg.vehicleType)} {seg.operator}
              </Badge>
              {idx < segments.length - 1 && (
                <span className="text-slate-500 text-xs">→</span>
              )}
            </div>
          ))}
        </motion.div>
      )}

      <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <motion.div key={JSON.stringify(route)} className="py-6" variants={containerVariants} initial="hidden" animate="show">

            {/* Segment header for first segment */}
            {hasSegments && (
              <motion.div variants={itemVariants} className="px-6 mb-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/40 border border-slate-600/30">
                  <Bus className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white">
                    {getVehicleEmoji(segments[0].vehicleType)} Board{" "}
                    <span className="text-emerald-400">{segments[0].operator}</span>
                  </span>
                  <Badge
                    variant="outline"
                    className="ml-auto text-[10px] px-1.5 py-0.5 border-slate-600 text-slate-400"
                  >
                    {segments[0].routeName}
                  </Badge>
                </div>
              </motion.div>
            )}

            {displayItems.map((item, index) => {
              if (item.type === "transfer") {
                // Transfer marker
                return (
                  <motion.div key={`transfer-${index}`} variants={itemVariants} className="relative px-6 py-2">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 backdrop-blur-sm">
                      <motion.div
                        className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: [0.8, 1.1, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <ArrowRightLeft className="h-5 w-5 text-amber-400" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                          Transfer at {item.stopName}
                        </div>
                        <div className="text-sm text-slate-300 mt-0.5">
                          Switch from{" "}
                          <span className="text-slate-200 font-medium">
                            {getVehicleEmoji(item.fromSegment!.vehicleType)} {item.fromSegment!.operator}
                          </span>
                          {" → "}
                          <span className="text-emerald-400 font-medium">
                            {getVehicleEmoji(item.toSegment!.vehicleType)} {item.toSegment!.operator}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0.5 border-amber-500/30 text-amber-400 bg-amber-500/10"
                      >
                        New fare
                      </Badge>
                    </div>
                  </motion.div>
                );
              }

              // Regular stop
              const isFirst = item.isFirst;
              const isLast = item.isLast;
              const isTransfer = transferStops.has(item.stopName || "");

              return (
                <motion.div key={index} variants={itemVariants} className="relative">
                  <div className="flex items-start px-6">
                    <div className="relative">
                      <motion.div
                        className={`h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 ${isFirst
                          ? "bg-emerald-500/20"
                          : isLast
                            ? "bg-emerald-500/20"
                            : isTransfer
                              ? "bg-amber-500/20"
                              : "bg-slate-700/50"
                          }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <MapPin
                          className={`h-6 w-6 ${isFirst || isLast
                            ? "text-emerald-400"
                            : isTransfer
                              ? "text-amber-400"
                              : "text-slate-400"
                            }`}
                        />
                        {/* Pulse animation for the last point */}
                        {isLast && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-emerald-400/20"
                            initial={{ scale: 0.8, opacity: 0.8 }}
                            animate={{ scale: 1.2, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </motion.div>

                      {/* Connecting line to next point */}
                      {index < displayItems.length - 1 && (
                        <motion.div
                          className={`absolute left-1/2 top-12 bottom-0 w-0.5 ${displayItems[index + 1]?.type === "transfer"
                            ? "bg-gradient-to-b from-emerald-500/30 to-amber-500/30"
                            : "bg-gradient-to-b from-emerald-500/30 to-slate-700/30"
                            }`}
                          style={{ height: "calc(100% - 12px)" }}
                          initial={{ scaleY: 0, originY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        />
                      )}
                    </div>

                    <motion.div
                      className="ml-4 pb-8 flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div
                        className={`h-12 flex items-center justify-center font-medium text-lg ${isFirst || isLast ? "text-white" : "text-slate-300"
                          }`}
                      >
                        {item.stopName}
                      </div>
                      {/* Show operator badge on first and last stops */}
                      {hasSegments && (isFirst || isLast) && item.segment && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0.5 ${item.segment.vehicleType === "bus"
                            ? "border-blue-500/30 text-blue-400"
                            : item.segment.vehicleType === "micro"
                              ? "border-purple-500/30 text-purple-400"
                              : "border-orange-500/30 text-orange-400"
                            }`}
                        >
                          {getVehicleEmoji(item.segment.vehicleType)} {item.segment.vehicleType}
                        </Badge>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Route Summary */}
          <motion.div
            className="p-6 bg-slate-800/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-emerald-400" />
                </div>
                <div className=" text-white">
                  <div className="text-sm text-slate-400">Estimated Travel Time</div>
                  <div className="font-medium text-lg">{totalTime} min</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Route className="h-5 w-5 text-emerald-400" />
                </div>
                <div className=" text-white">
                  <div className="text-sm text-slate-400">Total Distance</div>
                  <div className="font-medium text-lg">{totalDistance} km</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-700/30 p-3 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Banknote className="h-5 w-5 text-emerald-400" />
                </div>
                <div className=" text-white">
                  <div className="text-sm text-slate-400">Total Cost</div>
                  <div className="font-medium text-lg">Rs. {totalCost}</div>
                </div>
              </div>
            </div>

            {/* Per-segment fare breakdown */}
            {hasSegments && segments.length > 1 && (
              <motion.div
                className="mt-4 pt-4 border-t border-slate-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Fare Breakdown (per ride)
                </div>
                <div className="space-y-2">
                  {segments.map((seg, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-700/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {getVehicleEmoji(seg.vehicleType)}
                        </span>
                        <span className="text-sm text-slate-300">{seg.operator}</span>
                        <span className="text-xs text-slate-500">
                          ({seg.segmentDistance.toFixed(1)} km)
                        </span>
                      </div>
                      <span className="text-sm font-medium text-emerald-400">
                        Rs. {seg.segmentFare}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-sm font-semibold text-white">Total (with transfers)</span>
                    <span className="text-sm font-bold text-emerald-400">Rs. {transferFare ?? totalCost}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
