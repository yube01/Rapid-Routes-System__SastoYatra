import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-auto">
            <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
                <p>© 2025 Route Finder. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                    <Link to="/" className="hover:text-emerald-400">
                        Terms
                    </Link>
                    <Link to="/" className="hover:text-emerald-400">
                        Privacy
                    </Link>
                    <Link to="/" className="hover:text-emerald-400">
                        Help
                    </Link>
                </div>
            </div>
        </footer>)
}

export default Footer