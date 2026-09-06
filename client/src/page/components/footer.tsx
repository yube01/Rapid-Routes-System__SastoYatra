import { Link } from "react-router-dom"
import { MapPin, Navigation, TrendingUp, History, Shield, Github } from "lucide-react"

const Footer = () => {
    return (
        <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    
                    {/* Brand column */}
                    <div className="md:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-white">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white">
                                <MapPin className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col text-left leading-none">
                                <span className="font-extrabold text-white text-base">Rapid Routes</span>
                                <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400">Sasto Yatra</span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            Smart public transit routing and fare transparency platform for Kathmandu Valley. Powered by Dijkstra's shortest path algorithm.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                                <Shield className="h-3.5 w-3.5 text-emerald-400" />
                                Fair Transit Engine
                            </span>
                            <span>•</span>
                            <span>Kathmandu, Nepal</span>
                        </div>
                    </div>

                    {/* Navigation Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Quick Navigation</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                                    Home Overview
                                </Link>
                            </li>
                            <li>
                                <Link to="/routes" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                                    <Navigation className="h-3.5 w-3.5 text-emerald-400" />
                                    Route Navigator
                                </Link>
                            </li>
                            <li>
                                <Link to="/popular" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                                    <TrendingUp className="h-3.5 w-3.5 text-teal-400" />
                                    Popular Hubs
                                </Link>
                            </li>
                            <li>
                                <Link to="/history" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                                    <History className="h-3.5 w-3.5 text-cyan-400" />
                                    Commute History
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources & Account */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Account & System</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/login" className="hover:text-emerald-400 transition">
                                    Sign In to Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-emerald-400 transition">
                                    Register New Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin" className="hover:text-emerald-400 transition">
                                    Admin Dashboard
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/yube01/Rapid-Routes-System__SastoYatra"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-emerald-400 transition flex items-center gap-1.5"
                                >
                                    <Github className="h-3.5 w-3.5" />
                                    GitHub Repository
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Rapid Routes (Sasto Yatra). Built with React & TypeScript.</p>
                    <p className="text-slate-500">Empowering everyday commuters with open transit routing.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer