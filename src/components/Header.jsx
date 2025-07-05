import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import ThemeSwitcher from './ThemeSwitcher';
import {
    GiftIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    WrenchScrewdriverIcon,
    HomeIcon,
    Bars3Icon,
    XMarkIcon,
    ChatBubbleLeftRightIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';



const Header = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setMobileMenuOpen(false);
        navigate('/');
    };

    const noActionPages = ['/login', '/forgot-password', '/update-password'];


    const navLinks = [
        { name: 'Página Inicial', href: '/', icon: HomeIcon, public: true },
        { name: 'Mural', href: '/mural', icon: ChatBubbleLeftRightIcon, public: true },

        { name: 'Dashboard', href: '/admin/dashboard', icon: ClipboardDocumentListIcon, public: false, requiresAuth: true },
        { name: 'Acesso do Agente', href: '/login', icon: ArrowRightOnRectangleIcon, public: true, requiresAuth: false },
    ];

    return (
        <header
            className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Lado Esquerdo - Itens de Navegação Desktop */}
                    <div className="flex-1 flex justify-start items-center gap-6">
                        <Link
                            to="/"
                            className="hidden sm:inline-flex items-center text-sm font-semibold text-text-secondary dark:text-gray-300 hover:text-primary-600 dark:hover:text-white transition-colors"
                        >
                            <HomeIcon className="h-5 w-5 mr-2" />
                            Página Inicial
                        </Link>
                        <Link
                            to="/mural"
                            className="hidden sm:inline-flex items-center text-sm font-semibold text-text-secondary dark:text-gray-300 hover:text-primary-600 dark:hover:text-white transition-colors"
                        >
                            Mural
                        </Link>
                    </div>

                    {/* Centro - Logo */}
                    <div className="flex-1 flex justify-center">
                        <Link to={user ? "/admin/dashboard" : "/"}
                              className="flex items-center gap-2 text-2xl font-extrabold text-primary-700 dark:text-primary-500">
                            <GiftIcon className="h-7 w-7" />
                            <span>DoaJF</span>
                        </Link>
                    </div>

                    {/* Lado Direito - Ações e Menu Móvel */}
                    <div className="flex-1 flex justify-end items-center gap-2 sm:gap-4">
                        <ThemeSwitcher />

                        {/* Ações do usuário em Desktop */}
                        <div className="hidden sm:flex items-center gap-4">
                            {loading ? (
                                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            ) : user ? (
                                <>
                                    <div className="flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
                                        <UserCircleIcon className="h-5 w-5" />
                                        <span>{user.email}</span>
                                    </div>
                                    <Link
                                        to="/admin/dashboard"
                                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-100 dark:bg-primary-800/20 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/40 rounded-lg transition-colors"
                                        title="Acessar Painel"
                                    >
                                        <WrenchScrewdriverIcon className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-sm font-semibold text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                        title="Sair"
                                    >
                                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                                    </button>
                                </>
                            ) : (
                                !noActionPages.includes(location.pathname) && (
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-100 dark:bg-primary-800/20 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/40 rounded-lg transition-colors"
                                    >
                                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                        <span>Acesso do Agente</span>
                                    </Link>
                                )
                            )}
                        </div>

                        {/* Botão Hambúrguer para Telas Pequenas */}
                        <div className="sm:hidden">
                            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 rounded-full text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700"
                                    aria-label="Abrir menu">
                                {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menu Móvel Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="sm:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700"
                    >
                        <div className="p-4 space-y-2">
                            {navLinks.filter(link => {
                                if (link.requiresAuth === true) return !!user;
                                if (link.requiresAuth === false) return !user;
                                return true;
                            }).map(link => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium",
                                        location.pathname === link.href
                                            ? "bg-primary-100 dark:bg-primary-800/30 text-primary-700 dark:text-primary-300"
                                            : "text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    )}
                                >
                                    <link.icon className="h-6 w-6" />
                                    {link.name}
                                </Link>
                            ))}
                            {user && (
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-text-secondary dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red-500" />
                                    Sair
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;