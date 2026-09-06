import { useState } from "react"
import { Menu, MapPin, Home, History, TrendingUp, Settings, LogOut, Navigation, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, useLocation, useNavigate } from "react-router-dom"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const isAdmin = localStorage.getItem("admin") === "true"
    const isLoggedIn = !!localStorage.getItem("user_info") || isAdmin

    const navItems = [
        {
            name: "Home",
            to: "/",
            icon: <Home className="h-4 w-4" />,
        },
        {
            name: "Find Routes",
            to: "/routes",
            icon: <Navigation className="h-4 w-4" />,
        },
        {
            name: "Popular Destinations",
            to: "/popular",
            icon: <TrendingUp className="h-4 w-4" />,
        },
        ...(isLoggedIn
            ? isAdmin
                ? [
                    {
                        name: "Admin",
                        to: "/admin",
                        icon: <Settings className="h-4 w-4" />,
                    },
                ]
                : [
                    {
                        name: "History",
                        to: "/history",
                        icon: <History className="h-4 w-4" />,
                    },
                ]
            : []),
    ]

    const handleLogout = () => {
        localStorage.removeItem("user_info")
        localStorage.removeItem("admin")
        localStorage.removeItem("location")
        setIsOpen(false)
        navigate("/login")
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                
                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-white hover:opacity-90 transition">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-950/50">
                        <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col text-left leading-none">
                        <span className="font-extrabold text-white text-base sm:text-lg">Rapid Routes</span>
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400">Sasto Yatra</span>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.to
                        return (
                            <Link
                                key={index}
                                to={item.to}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                        : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-3">
                    {isLoggedIn ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-950/30 border border-slate-800 hover:border-rose-900/50 cursor-pointer"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-200 hover:text-white hover:bg-slate-800/80 cursor-pointer flex items-center gap-1.5"
                                >
                                    <LogIn className="h-4 w-4" />
                                    <span>Sign In</span>
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    size="sm"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold shadow-md shadow-emerald-950/40 cursor-pointer flex items-center gap-1.5"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    <span>Register</span>
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Trigger */}
                <div className="flex md:hidden items-center">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-slate-300 hover:text-white hover:bg-slate-800/60"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px] bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
                            <div>
                                <Link to="/" className="flex items-center gap-2.5 font-bold text-xl text-white mb-8" onClick={() => setIsOpen(false)}>
                                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex flex-col text-left leading-none">
                                        <span className="font-extrabold text-white text-base">Rapid Routes</span>
                                        <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400">Sasto Yatra</span>
                                    </div>
                                </Link>

                                <nav className="flex flex-col space-y-2">
                                    {navItems.map((item, index) => {
                                        const isActive = location.pathname === item.to
                                        return (
                                            <Link
                                                key={index}
                                                to={item.to}
                                                onClick={() => setIsOpen(false)}
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                                                    isActive
                                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                                        : "text-slate-300 hover:text-white hover:bg-slate-900"
                                                }`}
                                            >
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>

                            {/* Mobile Auth actions */}
                            <div className="border-t border-slate-800/80 pt-4 flex flex-col gap-2.5">
                                {isLoggedIn ? (
                                    <Button
                                        variant="outline"
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 text-rose-400 border-rose-900/40 hover:bg-rose-950/30 bg-transparent"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </Button>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                                            <Button variant="outline" className="w-full border-slate-700 text-slate-200 hover:bg-slate-800 bg-transparent flex items-center justify-center gap-2">
                                                <LogIn className="h-4 w-4" />
                                                <span>Sign In</span>
                                            </Button>
                                        </Link>
                                        <Link to="/register" onClick={() => setIsOpen(false)} className="w-full">
                                            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold flex items-center justify-center gap-2">
                                                <UserPlus className="h-4 w-4" />
                                                <span>Register</span>
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
