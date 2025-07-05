import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import Alert from '../components/Alert';
import Button from '../components/Button';
import { PaperAirplaneIcon, ArrowPathIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const redirectTo = `${window.location.origin}/update-password`;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: redirectTo,
        });

        if (error) {
            setMessage({ type: 'error', text: 'Erro ao enviar e-mail. Verifique o endereço e tente novamente.' });
        } else {
            setMessage({ type: 'success', text: 'E-mail de recuperação enviado! Verifique sua caixa de entrada.' });
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center">
            {}
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-left">
                <h2 className="text-3xl font-bold text-center text-primary-700 dark:text-primary-500 mb-2">Recuperar Senha</h2>
                <p className="text-center text-text-secondary dark:text-gray-400 mb-8">
                    Digite seu e-mail para receber um link de redefinição de senha.
                </p>
                <form onSubmit={handlePasswordReset} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-1">E-mail</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                placeholder="seu.email@pjf.gov.br"
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" loading={loading} icon={loading ? ArrowPathIcon : PaperAirplaneIcon} className="w-full">
                        {loading ? 'Enviando...' : 'Enviar Link'}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-sm font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
                        Voltar para o Login
                    </Link>
                </div>
                {message.text && <Alert type={message.type} message={message.text} />}
            </div>
            {}
        </div>
    );
};

export default ForgotPasswordPage;