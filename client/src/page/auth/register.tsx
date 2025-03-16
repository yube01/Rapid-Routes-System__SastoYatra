import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from "zod";
// import { onRegisterSubmit } from '@/api/RegisterUser'
const RegisterSchema = z.object({
    fullName: z.string().min(1, {
        message: "Full name cannot be empty"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters long"
    })
})
const Register: React.FC = () => {

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const navigate = useNavigate()



    const registrationForm = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const togglePassword = () => {
        setShow(!show);
    }



    const handleSubmitClick = registrationForm.handleSubmit(async (data) => {
        const { fullName, email, password } = data;
        console.log(fullName, email, password);
        setIsLoading(false);
        // await onRegisterSubmit(
        //     { fullName, email, password },
        //     setIsLoading,
        //     setIsRegistered,
        //     navigate
        // );
    });


    return (
        <div className="space-y-9 w-[360px] mx-auto py-8 md:py-[3.75rem]">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="font-semibold text-2xl flex justify-between">Register</h1>
                    <div className=' flex justify-between'>
                        <p className="text-muted-foreground font-medium text-sm">
                            Already have an account?{" "}
                            <Link to={"/login"}>
                                <span className="text-foreground">Login</span>
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-4">
                        <Form {...registrationForm}>
                            <form
                                className="space-y-4"
                            >
                                <FormField
                                    control={registrationForm.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-between">Full Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" />
                                            </FormControl>
                                            <FormMessage className="flex justify-between" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={registrationForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-between">Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" />
                                            </FormControl>
                                            <FormMessage className="flex justify-between" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={registrationForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex justify-between">Password </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input {...field} type={show ? "text" : "password"} autoComplete='new-password' className="w-full" />
                                                    {
                                                        show ?
                                                            <EyeOff onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                            :
                                                            <Eye onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                    }
                                                </div>
                                            </FormControl >
                                            <FormMessage className="flex justify-between" />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>

                    <div className="space-y-5">
                        <div>
                            {isLoading ?
                                <Button className="w-full py-[0.625rem] px-[0.875rem]">
                                    <Loader className="h-6 animate-spin" />
                                </Button> :
                                <Button className="w-full py-[0.625rem] px-[0.875rem]"
                                    onClick={handleSubmitClick}
                                >
                                    Register
                                </Button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register