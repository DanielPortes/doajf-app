import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Button from './Button';
import Alert from './Alert';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/solid';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (error) {
            setError('E-mail ou senha inválidos.');
        } else {
            navigate('/admin/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-left">
            <h2 className="text-3xl font-bold text-center text-primary-700 dark:text-primary-500 mb-8">Acesso Restrito</h2>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-1">E-mail</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="email" id="email" name="email" onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-1">Senha</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <KeyIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="password" id="password" name="password" onChange={handleChange} className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required />
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <Link to="/forgot-password"
                          className="text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                        Esqueceu a senha?
                    </Link>
                </div>
                <Button type="submit" loading={loading} className="w-full">
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>
            </form>
            {error && <Alert type="error" message={error} />}
        </div>
    );
};

export default LoginForm;