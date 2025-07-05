import clsx from 'clsx';
import {ArrowPathIcon} from '@heroicons/react/24/solid';
import {motion} from 'framer-motion';


const Button = ({
                    children,
                    variant = 'primary',
                    size = 'md',
                    icon: Icon = null,
                    loading = false,
                    className,
                    ...props
                }) => {
    const base = 'inline-flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 rounded-lg',
        secondary: 'bg-white border border-gray-300 text-text-primary hover:bg-gray-50 focus:ring-gray-200 rounded-lg',
        danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-400 rounded-lg',
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <motion.button

            whileHover={{scale: 1.05, transition: {duration: 0.1}}}

            whileTap={{scale: 0.95}}
            className={clsx(
                base,
                variants[variant],
                sizes[size],
                {'opacity-50 cursor-not-allowed': loading || props.disabled},
                className
            )}
            {...props}
        >
            {loading && <ArrowPathIcon className="h-5 w-5 animate-spin mr-2"/>}
            {!loading && Icon && <Icon className="h-5 w-5 mr-2"/>}
            {children}
        </motion.button>
    );
};

export default Button;