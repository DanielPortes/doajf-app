import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../hooks/useAuth';
import { GiftIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Header = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {}
                    <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary-700">
                        <GiftIcon className="h-7 w-7" />
                        <span>DoaJF</span>
                    </Link>

                    {}
                    <div className="flex items-center gap-4">
                        {loading ? (
                            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                        ) : user ? (

                            <>
                                <div className="hidden sm:flex items-center gap-2 text-sm text-text-secondary">
                                    <UserCircleIcon className="h-5 w-5" />
                                    <span>{user.email}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-text-primary bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                                    Sair
                                </button>
                            </>
                        ) : (

                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-primary-700 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                <span>Acesso do Agente</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;