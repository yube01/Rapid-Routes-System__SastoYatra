import { useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Navigation, Star, TrendingUp, Clock, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { popularRoutes } from '@/data/destination'



export default function PopularDestinations() {
    const [activeTab, setActiveTab] = useState('all')

    const filteredRoutes = activeTab === 'all'
        ? popularRoutes
        : popularRoutes.filter(route => route.category === activeTab)

    return (
        <div className="h-[90vh] lg:w-[1280px] md:w-full flex flex-col">
            <Navbar />

            <header className="pt-16 pb-12 px-4 text-center">
                <div className="container mx-auto max-w-3xl">
                    <div className="inline-block p-2 bg-slate-800/50 rounded-full mb-4">
                        <TrendingUp className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Popular Destinations</h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">
                        Discover the most searched routes and trending destinations
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 pb-20 max-w-5xl">
                <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
                    <div className="flex justify-center mb-6">
                        <TabsList className="bg-slate-800/50 text-white">
                            <TabsTrigger value="all" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                All Routes
                            </TabsTrigger>
                            <TabsTrigger value="travel" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Travel
                            </TabsTrigger>
                            <TabsTrigger value="leisure" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Leisure
                            </TabsTrigger>
                            <TabsTrigger value="education" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Education
                            </TabsTrigger>
                            <TabsTrigger value="shopping" className="data-[state=active]:bg-emerald-500/20 text-white cursor-pointer data-[state=active]:text-emerald-400">
                                Shopping
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value={activeTab} className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRoutes.map((route) => (
                                <Card key={route.id} className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm overflow-hidden hover:shadow-emerald-900/10 hover:shadow-xl transition-all duration-300">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg text-emerald-400">
                                                {route.source.name} to {route.destination.name}
                                            </CardTitle>
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                                                {route.popularity}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-slate-400">
                                            {route.category.charAt(0).toUpperCase() + route.category.slice(1)} Route
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{route.source.name}</div>
                                                <div className="text-sm text-slate-400">{route.source.description}</div>
                                            </div>
                                        </div>

                                        <div className="ml-5 border-l-2 border-dashed border-emerald-500/30 pl-4 py-2">
                                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                                <Clock className="h-4 w-4 text-emerald-400" />
                                                <span>{route.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                                <ArrowRight className="h-4 w-4 text-emerald-400" />
                                                <span>{route.distance}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mt-4">
                                            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="h-5 w-5 text-emerald-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{route.destination.name}</div>
                                                <div className="text-sm text-slate-400">{route.destination.description}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t border-slate-700 pt-4 flex justify-between items-center">
                                        <div className="flex items-center gap-1 text-sm text-slate-400">
                                            <Users className="h-4 w-4" />
                                            <span>{route.searches.toLocaleString()} searches</span>
                                        </div>
                                        <Link to={`/?source=${route.source.id}&destination=${route.destination.id}`}>
                                            <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20">
                                                <Navigation className="mr-1 h-4 w-4" />
                                                Get Directions
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-12 text-center">
                    <Card className="border-0 shadow-lg bg-slate-800/50 backdrop-blur-sm p-6 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                            <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Weekly Trending Route</h3>
                        <p className="text-slate-300 mb-4">
                            Downtown to Beach is the most popular route this week with over 500 searches!
                        </p>
                        <Link to="/?source=loc1&destination=loc5">
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                                <Navigation className="mr-2 h-5 w-5" />
                                Try This Route
                            </Button>
                        </Link>
                    </Card>
                </div>
            </main>
        </div>
    )
}
