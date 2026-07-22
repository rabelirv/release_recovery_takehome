import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-black text-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-2xl font-bold tracking-wide">FRESH START</h1>
                        <nav className="flex gap-6">
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                                    isActive('/dashboard')
                                        ? 'bg-white/20'
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <Home size={20} />
                                <span>Dashboard</span>
                            </Link>
                            <Link
                                to="/coach"
                                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                                    isActive('/coach')
                                        ? 'bg-white/20'
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <Users size={20} />
                                <span>Coach View</span>
                            </Link>
                            <Link
                                to="/history"
                                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                                    isActive('/history')
                                        ? 'bg-white/20'
                                        : 'hover:bg-white/10'
                                }`}
                            >
                                <Calendar size={20} />
                                <span>History</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
