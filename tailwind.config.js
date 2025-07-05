/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
    darkMode: 'class', // Habilita o modo escuro baseado em classe
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                success: {
                    100: '#d1fae5',
                    500: '#10b981',
                    800: '#047857'
                },
                danger: {
                    100: '#fee2e2',
                    500: '#ef4444',
                    800: '#b91c1c'
                },
                warning: {
                    100: '#fef3c7',
                    500: '#f59e0b',
                    800: '#b45309'
                },
                'text-primary': '#1f2937', // gray-800
                'text-secondary': '#6b7280', // gray-500
            }
        },
    },
    plugins: [require('@tailwindcss/forms')],
}