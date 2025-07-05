import {NavLink} from 'react-router-dom';
import {ChartBarIcon, ClipboardDocumentListIcon, UserGroupIcon} from '@heroicons/react/24/solid';
import {useAuth} from '../hooks/useAuth';

const AdminSidebar = () => {
    const {user} = useAuth();


    const commonClasses = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";


    const inactiveClass = "text-text-secondary dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-text-primary dark:hover:text-gray-200";


    const activeClass = "bg-primary-100 dark:bg-primary-800/30 text-primary-700 dark:text-primary-300 font-bold";

    return (

        <aside
            className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
            <nav className="flex flex-col gap-2">
                <NavLink
                    to="/admin/dashboard"
                    className={({isActive}) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
                >
                    <ClipboardDocumentListIcon className="h-6 w-6"/>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/admin/analytics"
                    className={({isActive}) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
                >
                    <ChartBarIcon className="h-6 w-6"/>
                    <span>Análises</span>
                </NavLink>

                {user?.role === 'admin' && (
                    <NavLink
                        to="/admin/users"
                        className={({isActive}) => `${commonClasses} ${isActive ? activeClass : inactiveClass}`}
                    >
                        <UserGroupIcon className="h-6 w-6"/>
                        <span>Gerenciar Agentes</span>
                    </NavLink>
                )}
            </nav>
        </aside>
    );
};

export default AdminSidebar;