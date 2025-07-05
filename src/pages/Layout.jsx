import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-text-primary dark:text-gray-200">
            <Header />
            <div className="flex-grow w-full container mx-auto flex">
                <AdminSidebar />
                <AnimatePresence mode="wait">
                    <motion.main
                        key={location.pathname}
                        className="flex-grow p-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.main>
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;