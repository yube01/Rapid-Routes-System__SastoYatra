import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input'
import { Loader } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'



const LocationSchema = z.object({
    location: z.string().min(1, { message: "Location is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    image: z.string().min(1, { message: "Image is required" })
});


const Admin: React.FC = () => {


    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [authLoading, setAuthLoading] = useState<boolean>(false)



    const navigate = useNavigate();



    const locationForm = useForm({
        resolver: zodResolver(LocationSchema),
        defaultValues: {
            location: "",
            name: "",
            category: "",
            image: "",
        },
    });




    const handleSubmitClick = locationForm.handleSubmit(async (data) => {
        const { location, name, category, image } = data;
        setIsLoading(false);

        const response = await fetch(`http://localhost:5005/location/addLocation`, {
            method: "POST",
            body: JSON.stringify({ location, name, category, image }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const datas = await response.json();
        if (datas.user) {
            navigate("/")
        } else {
            toast(datas.msg)
        }
    });

    return (
        <div className="sm:py-8 md:py-[3.75rem]">

            <div className="sm:px-6 sm:py-8 ">
                <div className="space-y-9  mx-auto">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl flex justify-between">Add Destination</h1>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-4">
                                <Form {...locationForm}>
                                    <form className="space-y-4" >
                                        <FormField
                                            control={locationForm.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex justify-between">Location</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="text" />
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
                                        <FormField
                                            control={locationForm.control}
                                            name="category"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <SelectTrigger className='w-full'>
                                                                <SelectValue placeholder="Select category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="spiritual">Spiritual</SelectItem>
                                                                <SelectItem value="cultural">Cultural</SelectItem>
                                                                <SelectItem value="natural">Natural</SelectItem>
                                                                <SelectItem value="historical">Historical</SelectItem>
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
                                                <FormItem>
                                                    <FormLabel className="flex justify-between">Image</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="text" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </form>
                                </Form>
                            </div>

                            <div>
                                {isLoading ?
                                    <Button className="w-full py-[0.625rem] px-[0.875rem]">
                                        <Loader className="h-6 animate-spin" />
                                    </Button>
                                    :
                                    <Button className="w-full cursor-pointer py-[0.625rem] px-[0.875rem] bg-emerald-500 hover:bg-emerald-600" onClick={handleSubmitClick}>
                                        Add
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin