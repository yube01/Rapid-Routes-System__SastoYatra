import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Settings, Plus, Edit, Trash2, TrendingUp, Save, X } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "../components/navbar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { allStops } from "@/constants/allstops"
import { toast } from "sonner"
import Footer from "../components/footer"
import { API_URL } from "@/constants/api"

interface Route {
    did: number;
    name: string;
    category: string;
    location: string;
    image: string;
    searchCount: number;
    lastTimeSearched: string;
}

export default function AdminPanel() {
    const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
    const [editingRoute, setEditingRoute] = useState<Route | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    // Image preview states
    const [addImagePreview, setAddImagePreview] = useState<string>("")
    const [editImagePreview, setEditImagePreview] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/location/getLocation`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log(data)
                setPopularRoutes(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    const LocationSchema = z.object({
        location: z.string().min(1, { message: "Location is required" }),
        name: z.string().min(1, { message: "Name is required" }),
        category: z.string().min(1, { message: "Category is required" }),
        image: z.string().min(1, { message: "Image is required" })
    });

    // Form for adding new locations
    const locationForm = useForm({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            location: "",
            name: "",
            category: "",
            image: "",
        },
    });

    // Separate form for editing existing locations
    const editForm = useForm({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            location: "",
            name: "",
            category: "",
            image: "",
        },
    });

    const handleEditRoute = (route: Route) => {
        setEditingRoute(route)
        // Populate the edit form with the selected route's data
        editForm.reset({
            name: route.name,
            location: route.location,
            image: route.image,
            category: route.category,
        })
        // Set the current image as preview
        setEditImagePreview(`/${route.image}`)
        setIsEditDialogOpen(true)
    }

    const handleSubmitClick = locationForm.handleSubmit(async (data) => {
        const { location, name, category, image } = data;

        const response = await fetch(`${API_URL}/location/addLocation`, {
            method: "POST",
            body: JSON.stringify({ location, name, category, image }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const datas = await response.json();
        console.log(datas)
        if (datas.msg) {
            toast(datas.msg)
        }

        // Reset form after successful submission
        locationForm.reset();
        setAddImagePreview(""); // Clear image preview
    });

    const handleUpdateRoute = editForm.handleSubmit(async (data) => {
        if (!editingRoute) return;

        const { location, name, category, image } = data;

        try {
            const response = await fetch(`${API_URL}/location/updateLocationInfo/${editingRoute.did}`, {
                method: "PUT",
                body: JSON.stringify({ location, name, category, image }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const result = await response.json();
            console.log(result);

            if (result.msg) {
                toast(result.msg);
                // Refresh the routes list
                const fetchData = async () => {
                    try {
                        const response = await fetch(`${API_URL}/location/getLocation`, {
                            method: "GET",
                            credentials: "include",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        const data = await response.json();
                        setPopularRoutes(data);
                    } catch (error) {
                        console.error("Fetch error:", error);
                    }
                };
                fetchData();
            }

            setIsEditDialogOpen(false);
            setEditingRoute(null);
            setEditImagePreview(""); // Clear edit image preview
        } catch (error) {
            console.error("Update error:", error);
            toast("Failed to update route");
        }
    });


    const handleDeleteRoute = async (did: number) => {

        const response = await fetch(`${API_URL}/location/deleteLocation/${did}`, {
            method: "DELETE"
        })

        const datas = await response.json();
        console.log(datas)
        if (datas.msg) {
            toast(datas.msg)
        }

        // Reset form after successful submission
        locationForm.reset();
        setAddImagePreview(""); // Clear image preview}
    }

    return (
        <div className="h-[90vh] lg:w-[1280px] md:w-full flex flex-col">
            <Navbar />
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
                                className="data-[state=active]:bg-emerald-500/20 cursor-pointer text-white data-[state=active]:text-emerald-400"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Destination
                            </TabsTrigger>
                            <TabsTrigger
                                value="manage"
                                className="data-[state=active]:bg-emerald-500/20 cursor-pointer text-white data-[state=active]:text-emerald-400"
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
                                    <Form {...locationForm}>
                                        <form className="space-4 text-white gap-2 flex items-center justify-center" >
                                            <div className=" flex gap-2 flex-col">
                                                <FormField
                                                    control={locationForm.control}
                                                    name="location"
                                                    render={({ field }) => (
                                                        <FormItem className=' cursor-pointer'>
                                                            <FormLabel className="flex justify-between">Location</FormLabel>
                                                            <FormControl className="cursor-pointer">
                                                                <Select onValueChange={field.onChange}
                                                                    value={field.value}>
                                                                    <SelectTrigger id="source" className="w-full cursor-pointer text-white border-slate-600">
                                                                        <SelectValue className=" text-white" placeholder="Select starting point" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-slate-700 cursor-pointer text-white border-slate-600">
                                                                        {allStops.map((stop) => (
                                                                            <SelectItem className="cursor-pointer" key={stop} value={stop}>
                                                                                <div>
                                                                                    <div>{stop}</div>
                                                                                </div>
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={locationForm.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex justify-between">Name</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} type="text" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className=" flex gap-2 flex-col">
                                                <FormField
                                                    control={locationForm.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem className=' cursor-pointer'>
                                                            <FormLabel>Category</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    value={field.value}
                                                                >
                                                                    <SelectTrigger className='w-full cursor-pointer'>
                                                                        <SelectValue className="cursor-pointer" placeholder="Select category" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-slate-700 text-white border-slate-600 cursor-pointer">
                                                                        <SelectItem className="cursor-pointer" value="spiritual">Spiritual</SelectItem>
                                                                        <SelectItem className="cursor-pointer" value="cultural">Cultural</SelectItem>
                                                                        <SelectItem className="cursor-pointer" value="natural">Natural</SelectItem>
                                                                        <SelectItem className="cursor-pointer" value="historical">Historical</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={locationForm.control}
                                                    name="image"
                                                    render={({ field }) => (
                                                        <FormItem className=' cursor-pointer'>
                                                            <FormLabel>Image</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="file"
                                                                    className='bg-white text-black cursor-pointer'
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files?.[0];
                                                                        if (file) {
                                                                            field.onChange(file.name);
                                                                            // Create preview URL
                                                                            const previewUrl = URL.createObjectURL(file);
                                                                            setAddImagePreview(previewUrl);
                                                                        } else {
                                                                            field.onChange("");
                                                                            setAddImagePreview("");
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            {addImagePreview && (
                                                                <div className="mt-2">
                                                                    <img
                                                                        src={addImagePreview}
                                                                        alt="Preview"
                                                                        className="h-20 w-20 object-cover rounded border border-slate-600"
                                                                    />
                                                                </div>
                                                            )}
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </form>
                                    </Form>

                                    <div className="flex justify-end">
                                        <Button onClick={handleSubmitClick} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
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
                                                    <TableHead className="text-slate-300">Image</TableHead>
                                                    <TableHead className="text-slate-300">Name</TableHead>
                                                    <TableHead className="text-slate-300">Location</TableHead>
                                                    <TableHead className="text-slate-300">Category</TableHead>
                                                    <TableHead className="text-slate-300">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {popularRoutes.map((route) => (
                                                    <TableRow key={route.did} className="border-slate-700 hover:bg-slate-700/30">
                                                        <TableCell>
                                                            <div className=" h-20 w-20 overflow-hidden">
                                                                <img
                                                                    src={`/${route.image}`}
                                                                    alt=""
                                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                                                />
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="font-medium text-white text-start">
                                                                {route.name}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className=" text-start text-white">{route.location}</TableCell>
                                                        <TableCell>
                                                            <div className=" flex items-center justify-start">
                                                                <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600">
                                                                    {route.category}
                                                                </Badge>
                                                            </div>
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
                                                                                onClick={() => handleDeleteRoute(route.did)}
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
                        <Form {...editForm}>
                            <form className="space-4 text-white gap-2 flex items-center justify-center" >
                                <div className=" flex gap-2 flex-col">
                                    <FormField
                                        control={editForm.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem className=' cursor-pointer'>
                                                <FormLabel className="flex justify-between">Location</FormLabel>
                                                <FormControl className="cursor-pointer">
                                                    <Select onValueChange={field.onChange}
                                                        value={field.value}>
                                                        <SelectTrigger id="source" className="w-full cursor-pointer text-white border-slate-600">
                                                            <SelectValue className=" text-white" placeholder="Select starting point" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-slate-700 cursor-pointer text-white border-slate-600">
                                                            {allStops.map((stop) => (
                                                                <SelectItem className="cursor-pointer" key={stop} value={stop}>
                                                                    <div>
                                                                        <div>{stop}</div>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={editForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-between">Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} type="text" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className=" flex gap-2 flex-col">
                                    <FormField
                                        control={editForm.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem className=' cursor-pointer'>
                                                <FormLabel>Category</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className='w-full cursor-pointer'>
                                                            <SelectValue className="cursor-pointer" placeholder="Select category" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-slate-700 text-white border-slate-600 cursor-pointer">
                                                            <SelectItem className="cursor-pointer" value="spiritual">Spiritual</SelectItem>
                                                            <SelectItem className="cursor-pointer" value="cultural">Cultural</SelectItem>
                                                            <SelectItem className="cursor-pointer" value="natural">Natural</SelectItem>
                                                            <SelectItem className="cursor-pointer" value="historical">Historical</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={editForm.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem className=' cursor-pointer'>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="file"
                                                        className='bg-white text-black cursor-pointer'
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                field.onChange(file.name);
                                                                // Create preview URL for new file
                                                                const previewUrl = URL.createObjectURL(file);
                                                                setEditImagePreview(previewUrl);
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                {editImagePreview && (
                                                    <div className="mt-2">
                                                        <img
                                                            src={editImagePreview}
                                                            alt="Preview"
                                                            className="h-20 w-20 object-cover rounded border border-slate-600"
                                                        />
                                                    </div>
                                                )}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </form>
                        </Form>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsEditDialogOpen(false);
                                    setEditImagePreview(""); // Clear preview when canceling
                                }}
                                className="border-slate-600 cursor-pointer text-slate-300 bg-slate-500 hover:bg-slate-700"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdateRoute}
                                className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
            <Footer />

        </div>
    )
}