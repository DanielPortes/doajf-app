import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const AuthLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-text-primary dark:text-gray-200">
            <Header />
            {}
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    className="flex-grow w-full"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        <Outlet />
                    </div>
                </motion.main>
            </AnimatePresence>
            <Footer />
        </div>
    );
};

export default AuthLayout;