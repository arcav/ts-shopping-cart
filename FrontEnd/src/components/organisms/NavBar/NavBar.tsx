import React from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon, ArrowRightOnRectangleIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type Props = {
    setCartOpen: (open: boolean) => void;
    badgeContent: number;
    onSearch: (query: string) => void;
};

const NavBar: React.FC<Props> = ({ setCartOpen, badgeContent, onSearch }) => {
    const { user, logout, isAuthenticated } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/');
    };

    return (
        <nav className="sticky top-0 z-40 bg-[#1e3a8a] shadow-md border-b border-blue-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo (Simulated Condor Style) */}
                    {/*   <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => history.push('/')}>
                        <div className="bg-white px-4 py-1 skew-x-[-12deg] rounded-sm transform group-hover:scale-105 transition-transform duration-200">
                            <span className="block text-2xl font-black text-[#1e3a8a] italic tracking-tight skew-x-[12deg]">
                                Condor
                                <div className="h-0.5 w-full bg-red-600 mt-0.5"></div>
                            </span>
                        </div>
                    </div> */}

                    {/* Search Bar */}
                    <div className="flex-1 max-w-3xl mx-8 hidden lg:block">
                        <div className="relative">
                            <input
                                type="text"
                                className="block w-full pl-6 pr-12 sm:text-sm text-gray-700 bg-white border-none rounded-full py-2.5 focus:ring-0 shadow-sm placeholder-gray-400"
                                placeholder="Leite, arroz, pão, vinho, frutas..."
                                onChange={(e) => onSearch(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                                <span className="border-l h-5 border-gray-300 mx-1"></span>
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-[#1e3a8a]" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side Icons & Links */}
                    <div className="flex items-center gap-6 text-white text-sm font-medium">
                        {/* New Brand Links */}
                        <div className="hidden xl:flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100">
                            <span className="bg-white/10 p-1.5 rounded-md"><ArrowRightOnRectangleIcon className="h-5 w-5" /></span>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[10px] uppercase opacity-75">Solicite seu</span>
                                <span>Cartão</span>
                            </div>
                        </div>

                        {/* Auth Buttons */}
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col text-right leading-tight hidden md:block">
                                    <span className="text-[10px] opacity-75">Bem-vindo,</span>
                                    <span>{user?.username}</span>
                                </div>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="p-2 rounded-full hover:bg-white/10" title="Dashboard">
                                        <ChartBarIcon className="h-6 w-6" />
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full hover:bg-white/10 hover:text-red-300 transition-colors"
                                    title="Logout"
                                >
                                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
                                <UserIcon className="h-6 w-6" />
                                <div className="flex flex-col leading-tight hidden md:flex">
                                    <span className="text-[11px] opacity-75">Entre ou</span>
                                    <span>Cadastre-se</span>
                                </div>
                            </Link>
                        )}

                        <button
                            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none ring-2 ring-white/20"
                            onClick={() => setCartOpen(true)}
                        >
                            <ShoppingCartIcon className="h-6 w-6" />
                            {badgeContent > 0 && (
                                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-white transform bg-red-600 rounded-full border-2 border-[#1e3a8a]">
                                    {badgeContent}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar (visible on small screens) */}
            <div className="lg:hidden px-4 pb-4">
                <div className="relative rounded-md shadow-sm">
                    <input
                        type="text"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 sm:text-sm border-gray-300 rounded-full bg-white py-2"
                        placeholder="Buscar produtos..."
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
