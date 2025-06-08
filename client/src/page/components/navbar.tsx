
import { useState } from "react"
import { Menu, MapPin, Home, History, TrendingUp, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useNavigate } from "react-router-dom"



export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const isAdmin = localStorage.getItem("admin") === "true"; // ✅ read from localStorage

    const navItems = [
        {
            name: "Home",
            to: "/",
            icon: <Home className="text-white h-4 w-4" />
            ,
        },
        {
            name: "Popular Destinations",
            to: "/popular",
            icon: <TrendingUp className="text-white h-4 w-4" />,
        },
        ...(isAdmin
            ? [
                {
                    name: "Admin",
                    to: "/admin",
                    icon: <Settings className="text-white h-5 w-5" />,
                },
            ]
            : [{
                name: "History",
                to: "/history",
                icon: <History className=" text-white h-5 w-5" />,
            },]),
        {
            name: "Logout",
            to: null,
            icon: <LogOut className=" text-white h-5 w-5" />,
        },
    ]

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user_info");
        localStorage.removeItem("admin");
        localStorage.removeItem("location");
        setIsOpen(false);
        navigate("/login");
    }
    return (
        <header className="fixed top-0 lg:w-[1280px] md:w-full z-50 w-full text-white backdrop-blur bg-black/40">
            <div className="container flex h-16 items-center justify-between">
                <div className="mr-4 flex items-center h-full md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="pr-0 bg-black">
                            <div className="px-7 py-6">
                                <Link to="/" className="flex items-center justify-center" onClick={() => setIsOpen(false)}>
                                    <span className="font-bold text-xl text-white">Rapid Routes</span>
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-4 px-2 mt-8">
                                {navItems.map((item, index) => {
                                    const isLogout = item.name === "Logout";

                                    if (isLogout) {
                                        return (
                                            <button
                                                key={index}
                                                onClick={handleLogout}
                                                className="flex cursor-pointer items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white bg-transparent border-none w-full text-left"
                                                type="button"
                                            >
                                                {item.icon}
                                                <p className=" text-white">
                                                    {item.name}
                                                </p>
                                            </button>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={index}
                                            to={item.to as string}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white"
                                        >
                                            {item.icon}
                                            <p className=" text-white">
                                                {item.name}
                                            </p>
                                        </Link>
                                    );
                                })}

                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <MapPin className="h-6 w-6 hidden md:inline" />
                    <span className="text-white hidden md:inline">Rapid Routes</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 ml-10">
                    {navItems.map((item, index) => {
                        const isLogout = item.name === "Logout";

                        if (isLogout) {
                            return (
                                <button
                                    key={index}
                                    onClick={handleLogout}
                                    className="flex cursor-pointer items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white bg-transparent border-none"
                                    type="button"
                                >
                                    {item.icon}
                                    <p className=" text-white">
                                        {item.name}
                                    </p>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                to={item.to as string}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white"
                            >
                                {item.icon}
                                <p className=" text-white">
                                    {item.name}
                                </p>
                            </Link>
                        );
                    })}

                </nav>
            </div>
        </header>
    )
}

