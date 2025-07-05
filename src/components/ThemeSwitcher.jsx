import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../hooks/useTheme';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Mudar para o modo ${theme === 'light' ? 'escuro' : 'claro'}`}
        >
            {theme === 'light' ? (
                <MoonIcon className="h-6 w-6" />
            ) : (
                <SunIcon className="h-6 w-6 text-yellow-400" />
            )}
        </button>
    );
};

export default ThemeSwitcher;