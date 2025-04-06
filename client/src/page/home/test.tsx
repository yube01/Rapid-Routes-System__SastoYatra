
import { useState } from "react"
import { Navbar } from "../components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample location data
const locations = [
  { id: "nyc", name: "New York City" },
  { id: "la", name: "Los Angeles" },
  { id: "chi", name: "Chicago" },
  { id: "mia", name: "Miami" },
  { id: "sf", name: "San Francisco" },
  { id: "sea", name: "Seattle" },
  { id: "bos", name: "Boston" },
  { id: "dc", name: "Washington DC" },
]

export default function Test() {
  const [source, setSource] = useState<string | undefined>()
  const [destination, setDestination] = useState<string | undefined>()
  const [showRoute, setShowRoute] = useState(false)

  const handleFindRoute = () => {
    if (source && destination && source !== destination) {
      setShowRoute(true)
      // Add a small delay to ensure state updates before rendering
      setTimeout(() => {
        const routeElement = document.getElementById("route-section")
        if (routeElement) {
          routeElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  return (
    <div className="h-[90vh] lg:w-[1280px] md:w-full flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Find Your Route</h1>

        <Card className="mb-8 bg-transparent text-white">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="source" className="text-sm font-medium">
                  Select Source
                </label>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger id="source" className="w-full">
                    <SelectValue placeholder="Select starting point" />
                  </SelectTrigger>
                  <SelectContent className=" bg-black text-white">
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="destination" className="text-sm font-medium">
                  Select Destination
                </label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination" className="w-full">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent className=" bg-black text-white">
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleFindRoute}
                disabled={!source || !destination || source === destination}
                className="px-8"
              >
                Find Route
              </Button>
            </div>
          </CardContent>
        </Card>

        {showRoute && source && destination && (
          <div id="route-section" className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              Route from {locations.find((l) => l.id === source)?.name} to{" "}
              {locations.find((l) => l.id === destination)?.name}
            </h2>
            {/* <RouteMap source={source} destination={destination} /> */}
          </div>
        )}
      </main>
    </div>
  )
}

