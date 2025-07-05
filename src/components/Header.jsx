import {Link, useNavigate, useLocation} from 'react-router-dom';
import {supabase} from '../services/supabaseClient';
import {useAuth} from '../hooks/useAuth';
import ThemeSwitcher from './ThemeSwitcher';
import {
    GiftIcon,
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    WrenchScrewdriverIcon,
    HomeIcon
} from '@heroicons/react/24/solid';

const Header = () => {
    const {user, loading} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };


    const noActionPages = ['/login', '/forgot-password', '/update-password'];

    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <header
            className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {}
                    <div className="flex-1 flex justify-start">
                        {isAdminRoute ? (
                            <Link
                                to="/"
                                className="inline-flex items-center text-sm font-semibold text-text-secondary dark:text-gray-300 hover:text-primary-600 dark:hover:text-white transition-colors"
                            >
                                <HomeIcon className="h-5 w-5 mr-2"/>
                                Página Inicial
                            </Link>
                        ) : (
                            <Link
                                to="/mural"
                                className="inline-flex items-center text-sm font-semibold text-text-secondary dark:text-gray-300 hover:text-primary-600 dark:hover:text-white transition-colors"
                            >
                                Mural de Agradecimentos
                            </Link>
                        )}
                    </div>

                    {}
                    <div className="flex-1 flex justify-center">
                        <Link to={user ? "/" : "/"}
                              className="flex items-center gap-2 text-2xl font-extrabold text-primary-700 dark:text-primary-500">
                            <GiftIcon className="h-7 w-7"/>
                            <span>DoaJF</span>
                        </Link>
                    </div>

                    {}
                    <div className="flex-1 flex justify-end items-center gap-4">
                        <ThemeSwitcher/>

                        {loading ? (
                            <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : user ? (

                            <>
                                <div
                                    className="hidden sm:flex items-center gap-2 text-sm text-text-secondary dark:text-gray-400">
                                    <UserCircleIcon className="h-5 w-5"/>
                                    <span>{user.email}</span>
                                </div>
                                {!isAdminRoute && (
                                    <Link
                                        to="/admin/dashboard"
                                        className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-100 dark:bg-primary-800/20 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/40 rounded-lg transition-colors"
                                        title="Acessar Painel"
                                    >
                                        <WrenchScrewdriverIcon className="h-5 w-5"/>
                                        <span>Painel</span>
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 p-2 text-sm font-semibold text-text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    title="Sair"
                                >
                                    <ArrowLeftOnRectangleIcon className="h-5 w-5"/>
                                </button>
                            </>
                        ) : (

                            !noActionPages.includes(location.pathname) && (
                                <Link
                                    to="/login"
                                    className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-100 dark:bg-primary-800/20 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800/40 rounded-lg transition-colors"
                                >
                                    <ArrowRightOnRectangleIcon className="h-5 w-5"/>
                                    <span>Acesso do Agente</span>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;