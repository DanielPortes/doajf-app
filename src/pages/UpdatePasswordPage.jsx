import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Alert from '../components/Alert';
import Button from '../components/Button';
import { ArrowPathIcon, CheckCircleIcon, KeyIcon } from '@heroicons/react/24/solid';

const UpdatePasswordPage = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Este useEffect garante que a sessão de recuperação seja ativada
    // assim que o componente é montado, tratando tanto o clique no link
    // quanto o recarregamento da página.
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === "PASSWORD_RECOVERY") {
                setMessage({ type: 'info', text: 'Sessão de recuperação ativa. Por favor, defina sua nova senha.' });
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage({ type: '', text: '' });

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError('Não foi possível atualizar a senha. O link pode ter expirado ou a senha é muito fraca.');
        } else {
            setMessage({ type: 'success', text: 'Senha atualizada com sucesso! Redirecionando para o login...' });
            setTimeout(() => navigate('/login'), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-left">
                <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">Definir Nova Senha</h2>
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">Nova Senha</label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <KeyIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Pelo menos 6 caracteres"
                                className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" loading={loading} icon={loading ? ArrowPathIcon : CheckCircleIcon} className="w-full">
                        {loading ? 'Salvando...' : 'Salvar Nova Senha'}
                    </Button>
                </form>
                {error && <Alert type="error" message={error} />}
                {message.text && <Alert type={message.type} message={message.text} />}
            </div>
        </div>
    );
};

export default UpdatePasswordPage;