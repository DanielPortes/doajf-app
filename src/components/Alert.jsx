import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const Alert = ({ type, message }) => {

    const config = {
        success: {
            bgColor: 'bg-green-100 dark:bg-green-800/20',
            textColor: 'text-green-800 dark:text-green-300',
            Icon: CheckCircleIcon,
        },
        error: {
            bgColor: 'bg-red-100 dark:bg-red-800/20',
            textColor: 'text-red-800 dark:text-red-300',
            Icon: XCircleIcon,
        },
        info: {
            bgColor: 'bg-blue-100 dark:bg-blue-800/20',
            textColor: 'text-blue-800 dark:text-blue-300',
            Icon: InformationCircleIcon,
        },
    };


    const { bgColor, textColor, Icon } = config[type] || config.info;


    if (!message) return null;

    return (

        <motion.div
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className={`p-4 mt-4 rounded-md ${bgColor} flex items-center shadow-md`}
        >
            {/* O ícone é renderizado dinamicamente aqui. */}
            <Icon className={`h-6 w-6 ${textColor} mr-3 flex-shrink-0`} />
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </motion.div>
    );
};

export default Alert;