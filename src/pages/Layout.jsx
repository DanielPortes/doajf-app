import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    Bars3Icon,
} from '@heroicons/react/24/solid';
const Layout = () => {
    const location = useLocation();

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-text-primary dark:text-gray-200">
            {}
            <Header />

            <div className="flex-grow w-full container mx-auto flex relative">
                {}
                <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

                {}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    ></div>
                )}

                <div className="flex-1 flex flex-col">
                    <AnimatePresence mode="wait">
                        <motion.main
                            key={location.pathname}
                            className="flex-grow p-4 sm:p-6 lg:p-8 w-full"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="md:hidden mb-4">
                                <button onClick={toggleSidebar} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600">
                                    <Bars3Icon className="h-5 w-5" />
                                    Menu do Painel
                                </button>
                            </div>
                            <Outlet />
                        </motion.main>
                    </AnimatePresence>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;