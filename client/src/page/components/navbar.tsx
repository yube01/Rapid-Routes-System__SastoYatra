
import { useState } from "react"
import { Menu, MapPin, Clock, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

const navItems = [
    {
        name: "Home",
        to: "/",
        icon: <MapPin className=" text-white h-5 w-5" />,
    },
    {
        name: "Popular Destinations",
        to: "/popular",
        icon: <Compass className=" text-white h-5 w-5" />,
    },
    {
        name: "History",
        to: "/history",
        icon: <Clock className=" text-white h-5 w-5" />,
    },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full text-white">
            <div className="container flex h-16 items-center justify-between">
                <div className="mr-4 flex items-center md:hidden">
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
                        <SheetContent side="left" className="pr-0">
                            <div className="px-7">
                                <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                                    <span className="font-bold text-xl text-white">Rapid Routes</span>
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-4 px-2 mt-8">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.to}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 text-lg font-medium rounded-md hover:bg-accent",
                                        )}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <MapPin className="h-6 w-6" />
                    <span className="text-white">Rapid Routes</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 ml-10">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.to}
                            className={cn(
                                "flex items-center gap-2 text-inherit text-sm font-medium",
                            )}
                        >
                            {item.icon}
                            <p className=" text-white">{item.name}</p>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    )
}

