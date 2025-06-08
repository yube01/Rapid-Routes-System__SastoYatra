import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'



const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(3, {
        message: "Password must be at least 8 characters long"
    })
})


const Login: React.FC = () => {


    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [authLoading, setAuthLoading] = useState<boolean>(false)



    const [show, setShow] = useState(false);
    const navigate = useNavigate();




    const togglePassword = () => {
        setShow(!show);
    }



    const loginForm = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });




    const handleSubmitClick = loginForm.handleSubmit(async (data) => {
        const { email, password } = data;
        setIsLoading(false);
        // console.log(email, password);

        const response = await fetch(`http://localhost:5005/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })

        const datas = await response.json();
        if (datas.isAdmin) {
            localStorage.setItem("admin", datas.isAdmin)
            navigate("/admin")
            return;
        }
        if (datas.user) {
            localStorage.setItem("user_info", datas.id)
            navigate("/")
        } else {
            toast(datas.message)
        }
    });

    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        const query = window.location.search
        const url = new URLSearchParams(query)
        const codeP = url.get("code")

        if (codeP && (localStorage.getItem("accessToken") === null)) {
            const getAccessToken = async () => {
                // setAuthLoading(true)
                try {

                    const response = await fetch(`${import.meta.env.VITE_API}/auth/acc?code=` + codeP, {
                        method: "GET"
                    })
                    const data = await response.json()

                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token)
                        setRerender(!rerender)

                        try {
                            const response = await fetch(`${import.meta.env.VITE_API}/auth/getUser`, {
                                method: "GET",
                                headers: {
                                    "Authorization": "Bearer " + localStorage.getItem("accessToken")
                                }
                            })
                            const data = await response.json()
                            // setAuthLoading(false)

                            if (data.message === "User registered successfully" || data.message === "User signed in" || data.message === "User added with Github Sucessfully!") {
                                localStorage.setItem("userToken", data.userId)
                                navigate(`/${data.user}`)
                            }
                        } catch (error) {
                            console.log(error)
                        }

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getAccessToken()
        }
    }, [navigate, rerender])
    return (
        <div className="sm:py-8 md:py-[3.75rem]">

            <div className=" sm:w-[408px] sm:px-6 sm:py-8 ">
                <div className="space-y-9 w-[22rem] sm:w-[360px]  mx-auto">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-semibold text-2xl flex justify-between">Login</h1>
                            <div className=' flex justify-between'>
                                <p className="text-muted-foreground font-medium text-sm ">
                                    Don't have an account yet?{" "}
                                    <Link to={"/register"}>
                                        <span className=" text-primary-foreground">Register</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-4">
                                <Form {...loginForm}>
                                    <form className="space-y-4" >
                                        <FormField
                                            control={loginForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex justify-between">Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} type="email" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex justify-between">
                                                        Password{" "}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input {...field} type={show ? "text" : "password"} className="w-full" />
                                                            {
                                                                show ?
                                                                    <EyeOff onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                                    :
                                                                    <Eye onClick={togglePassword} className="absolute inset-y-2 right-4 text-muted-foreground" />
                                                            }

                                                        </div>
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
                                    <Button className="w-full py-[0.625rem] px-[0.875rem] bg-emerald-500 hover:bg-emerald-600" onClick={handleSubmitClick}>
                                        Sign In
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

export default Login