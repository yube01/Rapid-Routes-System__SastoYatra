"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Settings, Plus, Edit, Trash2, MapPin, TrendingUp, Save, X } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

// Sample location data
const locations = [
    { id: "loc1", name: "Downtown", description: "City Center" },
    { id: "loc2", name: "Airport", description: "International Terminal" },
    { id: "loc3", name: "University", description: "Main Campus" },
    { id: "loc4", name: "Shopping Mall", description: "Central Mall" },
    { id: "loc5", name: "Beach", description: "Coastal Area" },
]

// Initial popular routes data
const initialPopularRoutes = [
    {
        id: "route1",
        source: { id: "loc1", name: "Downtown", description: "City Center" },
        destination: { id: "loc5", name: "Beach", description: "Coastal Area" },
        distance: "12.5",
        time: "35",
        popularity: "Very High",
        searches: 2453,
        category: "leisure",
    },
    {
        id: "route2",
        source: { id: "loc2", name: "Airport", description: "International Terminal" },
        destination: { id: "loc1", name: "Downtown", description: "City Center" },
        distance: "18.2",
        time: "45",
        popularity: "High",
        searches: 1876,
        category: "travel",
    },
    {
        id: "route3",
        source: { id: "loc1", name: "Downtown", description: "City Center" },
        destination: { id: "loc3", name: "University", description: "Main Campus" },
        distance: "5.8",
        time: "15",
        popularity: "High",
        searches: 1654,
        category: "education",
    },
]

interface PopularRoute {
    id: string
    source: { id: string; name: string; description: string }
    destination: { id: string; name: string; description: string }
    distance: string
    time: string
    popularity: string
    searches: number
    category: string
}

export default function AdminPanel() {
    const [popularRoutes, setPopularRoutes] = useState<PopularRoute[]>(initialPopularRoutes)
    const [editingRoute, setEditingRoute] = useState<PopularRoute | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    // Form state for adding new route
    const [newRoute, setNewRoute] = useState({
        source: "",
        destination: "",
        distance: "",
        time: "",
        popularity: "",
        searches: "",
        category: "",
    })

    // Form state for editing route
    const [editForm, setEditForm] = useState({
        source: "",
        destination: "",
        distance: "",
        time: "",
        popularity: "",
        searches: "",
        category: "",
    })

    const categories = ["travel", "leisure", "education", "shopping", "business"]
    const popularityLevels = ["Low", "Medium", "High", "Very High"]

    const handleAddRoute = () => {
        if (
            !newRoute.source ||
            !newRoute.destination ||
            !newRoute.distance ||
            !newRoute.time ||
            !newRoute.popularity ||
            !newRoute.searches ||
            !newRoute.category
        ) {
            toast(
                "Please fill in all fields",
            )
            return
        }

        if (newRoute.source === newRoute.destination) {
            toast("Source and destination cannot be the same")
            return
        }

        const sourceLocation = locations.find((l) => l.id === newRoute.source)
        const destinationLocation = locations.find((l) => l.id === newRoute.destination)

        if (!sourceLocation || !destinationLocation) {
            toast("Invalid source or destination")
            return
        }

        const route: PopularRoute = {
            id: `route${Date.now()}`,
            source: sourceLocation,
            destination: destinationLocation,
            distance: newRoute.distance,
            time: newRoute.time,
            popularity: newRoute.popularity,
            searches: Number.parseInt(newRoute.searches),
            category: newRoute.category,
        }

        setPopularRoutes([...popularRoutes, route])
        setNewRoute({
            source: "",
            destination: "",
            distance: "",
            time: "",
            popularity: "",
            searches: "",
            category: "",
        })

        toast("Popular route added successfully")
    }

    const handleEditRoute = (route: PopularRoute) => {
        setEditingRoute(route)
        setEditForm({
            source: route.source.id,
            destination: route.destination.id,
            distance: route.distance,
            time: route.time,
            popularity: route.popularity,
            searches: route.searches.toString(),
            category: route.category,
        })
        setIsEditDialogOpen(true)
    }

    const handleUpdateRoute = () => {
        if (!editingRoute) return

        if (
            !editForm.source ||
            !editForm.destination ||
            !editForm.distance ||
            !editForm.time ||
            !editForm.popularity ||
            !editForm.searches ||
            !editForm.category
        ) {
            toast("Please fill in all fields")
            return
        }

        if (editForm.source === editForm.destination) {
            toast("Source and destination cannot be the same")
            return
        }

        const sourceLocation = locations.find((l) => l.id === editForm.source)
        const destinationLocation = locations.find((l) => l.id === editForm.destination)

        if (!sourceLocation || !destinationLocation) {
            toast("Invalid source or destination")
            return
        }

        const updatedRoute: PopularRoute = {
            ...editingRoute,
            source: sourceLocation,
            destination: destinationLocation,
            distance: editForm.distance,
            time: editForm.time,
            popularity: editForm.popularity,
            searches: Number.parseInt(editForm.searches),
            category: editForm.category,
        }

        setPopularRoutes(popularRoutes.map((route) => (route.id === editingRoute.id ? updatedRoute : route)))

        setIsEditDialogOpen(false)
        setEditingRoute(null)

        toast("Route updated successfully")
    }

    const handleDeleteRoute = (routeId: string) => {
        setPopularRoutes(popularRoutes.filter((route) => route.id !== routeId))
        toast("Route deleted successfully")
    }

    const getPriorityColor = (popularity: string) => {
        switch (popularity) {
            case "Very High":
                return "bg-red-500/10 text-red-400 border-red-500/30"
            case "High":
                return "bg-orange-500/10 text-orange-400 border-orange-500/30"
            case "Medium":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
            case "Low":
                return "bg-green-500/10 text-green-400 border-green-500/30"
            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/30"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <header className="pt-16 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-block p-2 bg-slate-800/50 rounded-full mb-4">
                        <Settings className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Panel</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">Manage popular destinations and route data</p>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 max-w-6xl">
                <Tabs defaultValue="add" className="space-y-6">
                    <div className="flex justify-center">
                        <TabsList className="bg-slate-800/50 backdrop-blur-sm">
                            <TabsTrigger
                                value="add"
                                className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Destination
                            </TabsTrigger>
                            <TabsTrigger
                                value="manage"
                                className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                            >
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Manage Routes
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="add">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl text-emerald-400">Add New Popular Route</CardTitle>
                                    <CardDescription className="text-slate-300">
                                        Create a new popular destination route for users to discover
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="add-source" className="text-sm font-medium flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-emerald-400" />
                                                Source Location
                                            </Label>
                                            <Select
                                                value={newRoute.source}
                                                onValueChange={(value) => setNewRoute({ ...newRoute, source: value })}
                                            >
                                                <SelectTrigger className="bg-slate-700 border-slate-600">
                                                    <SelectValue placeholder="Select source location" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-700 text-white border-slate-600">
                                                    {locations.map((location) => (
                                                        <SelectItem key={location.id} value={location.id}>
                                                            <div>
                                                                <div>{location.name}</div>
                                                                <div className="text-xs text-slate-400">{location.description}</div>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="add-destination" className="text-sm font-medium flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-emerald-400" />
                                                Destination Location
                                            </Label>
                                            <Select
                                                value={newRoute.destination}
                                                onValueChange={(value) => setNewRoute({ ...newRoute, destination: value })}
                                            >
                                                <SelectTrigger className="bg-slate-700 border-slate-600">
                                                    <SelectValue placeholder="Select destination location" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-700 text-white border-slate-600">
                                                    {locations.map((location) => (
                                                        <SelectItem key={location.id} value={location.id}>
                                                            <div>
                                                                <div>{location.name}</div>
                                                                <div className="text-xs text-slate-400">{location.description}</div>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="add-distance">Distance (km)</Label>
                                            <Input
                                                id="add-distance"
                                                type="number"
                                                step="0.1"
                                                placeholder="e.g., 12.5"
                                                className="bg-slate-700 border-slate-600"
                                                value={newRoute.distance}
                                                onChange={(e) => setNewRoute({ ...newRoute, distance: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="add-time">Travel Time (minutes)</Label>
                                            <Input
                                                id="add-time"
                                                type="number"
                                                placeholder="e.g., 35"
                                                className="bg-slate-700 border-slate-600"
                                                value={newRoute.time}
                                                onChange={(e) => setNewRoute({ ...newRoute, time: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="add-popularity">Popularity Level</Label>
                                            <Select
                                                value={newRoute.popularity}
                                                onValueChange={(value) => setNewRoute({ ...newRoute, popularity: value })}
                                            >
                                                <SelectTrigger className="bg-slate-700 border-slate-600">
                                                    <SelectValue placeholder="Select popularity" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-700 text-white border-slate-600">
                                                    {popularityLevels.map((level) => (
                                                        <SelectItem key={level} value={level}>
                                                            {level}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="add-searches">Search Count</Label>
                                            <Input
                                                id="add-searches"
                                                type="number"
                                                placeholder="e.g., 1500"
                                                className="bg-slate-700 border-slate-600"
                                                value={newRoute.searches}
                                                onChange={(e) => setNewRoute({ ...newRoute, searches: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="add-category">Category</Label>
                                            <Select
                                                value={newRoute.category}
                                                onValueChange={(value) => setNewRoute({ ...newRoute, category: value })}
                                            >
                                                <SelectTrigger className="bg-slate-700 border-slate-600">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-700 text-white border-slate-600">
                                                    {categories.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button onClick={handleAddRoute} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Route
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="manage">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl text-emerald-400">Manage Popular Routes</CardTitle>
                                    <CardDescription className="text-slate-300">
                                        View, edit, and delete existing popular destination routes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border border-slate-700 overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                                                    <TableHead className="text-slate-300">Route</TableHead>
                                                    <TableHead className="text-slate-300">Distance</TableHead>
                                                    <TableHead className="text-slate-300">Time</TableHead>
                                                    <TableHead className="text-slate-300">Popularity</TableHead>
                                                    <TableHead className="text-slate-300">Searches</TableHead>
                                                    <TableHead className="text-slate-300">Category</TableHead>
                                                    <TableHead className="text-slate-300">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {popularRoutes.map((route) => (
                                                    <TableRow key={route.id} className="border-slate-700 hover:bg-slate-700/30">
                                                        <TableCell>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {route.source.name} → {route.destination.name}
                                                                </div>
                                                                <div className="text-sm text-slate-400">
                                                                    {route.source.description} to {route.destination.description}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>{route.distance} km</TableCell>
                                                        <TableCell>{route.time} min</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className={getPriorityColor(route.popularity)}>
                                                                {route.popularity}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>{route.searches.toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                                                                {route.category}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleEditRoute(route)}
                                                                    className="text-emerald-400 hover:bg-emerald-500/10"
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger asChild>
                                                                        <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10">
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent className="bg-slate-800 border-slate-700">
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle className="text-white">Delete Route</AlertDialogTitle>
                                                                            <AlertDialogDescription className="text-slate-300">
                                                                                Are you sure you want to delete this route? This action cannot be undone.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                                                                                Cancel
                                                                            </AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() => handleDeleteRoute(route.id)}
                                                                                className="bg-red-500 hover:bg-red-600 text-white"
                                                                            >
                                                                                Delete
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    {popularRoutes.length === 0 && (
                                        <div className="text-center py-8">
                                            <TrendingUp className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-slate-300 mb-2">No routes found</h3>
                                            <p className="text-slate-400">Add some popular routes to get started.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </TabsContent>
                </Tabs>

                {/* Edit Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-emerald-400">Edit Route</DialogTitle>
                            <DialogDescription className="text-slate-300">Update the route information below.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Source Location</Label>
                                    <Select
                                        value={editForm.source}
                                        onValueChange={(value) => setEditForm({ ...editForm, source: value })}
                                    >
                                        <SelectTrigger className="bg-slate-700 border-slate-600">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-700 text-white border-slate-600">
                                            {locations.map((location) => (
                                                <SelectItem key={location.id} value={location.id}>
                                                    {location.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Destination Location</Label>
                                    <Select
                                        value={editForm.destination}
                                        onValueChange={(value) => setEditForm({ ...editForm, destination: value })}
                                    >
                                        <SelectTrigger className="bg-slate-700 border-slate-600">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-700 text-white border-slate-600">
                                            {locations.map((location) => (
                                                <SelectItem key={location.id} value={location.id}>
                                                    {location.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Distance (km)</Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        className="bg-slate-700 border-slate-600"
                                        value={editForm.distance}
                                        onChange={(e) => setEditForm({ ...editForm, distance: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Travel Time (minutes)</Label>
                                    <Input
                                        type="number"
                                        className="bg-slate-700 border-slate-600"
                                        value={editForm.time}
                                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Popularity Level</Label>
                                    <Select
                                        value={editForm.popularity}
                                        onValueChange={(value) => setEditForm({ ...editForm, popularity: value })}
                                    >
                                        <SelectTrigger className="bg-slate-700 border-slate-600">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-700 text-white border-slate-600">
                                            {popularityLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Search Count</Label>
                                    <Input
                                        type="number"
                                        className="bg-slate-700 border-slate-600"
                                        value={editForm.searches}
                                        onChange={(e) => setEditForm({ ...editForm, searches: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select
                                        value={editForm.category}
                                        onValueChange={(value) => setEditForm({ ...editForm, category: value })}
                                    >
                                        <SelectTrigger className="bg-slate-700 border-slate-600">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-700 text-white border-slate-600">
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                                className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateRoute} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    )
}
