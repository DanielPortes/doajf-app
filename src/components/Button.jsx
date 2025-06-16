import clsx from 'clsx';

const Button = ({
                    children,
                    variant = 'primary',   // primary | secondary | danger
                    size = 'md',            // sm | md | lg
                    icon: Icon = null,
                    loading = false,
                    ...props
                }) => {
    const base = 'inline-flex items-center justify-center font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition';
    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-white border border-gray-300 text-text-primary hover:bg-gray-50 focus:ring-gray-200',
        danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-400',
    };
    const sizes = {
        sm: 'px-3 py-1.5 text-sm rounded-lg',
        md: 'px-4 py-2 text-base rounded-xl',
        lg: 'px-6 py-3 text-lg rounded-2xl',
    };

    return (
        <button
            className={clsx(base, variants[variant], sizes[size], {
                'opacity-50 cursor-not-allowed': loading || props.disabled,
            })}
            {...props}
        >
            {loading && <Icon className="h-5 w-5 animate-spin mr-2" />}
            {!loading && Icon && <Icon className="h-5 w-5 mr-2" />}
            {children}
        </button>
    );
};

export default Button;
