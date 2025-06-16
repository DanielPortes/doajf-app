import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import Alert from './Alert';
import { ArrowPathIcon, UserIcon, EnvelopeIcon, GiftIcon } from '@heroicons/react/24/solid';

const DonationForm = () => {
    const [formData, setFormData] = useState({ name: '', contact: '', quantity: '1' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });


        await new Promise(resolve => setTimeout(resolve, 500));

        const { data: donationData, error } = await supabase.from('donations').insert({
            donor_name: formData.name,
            donor_contact: formData.contact,
            quantity: Number(formData.quantity),
        }).select().single();

        if (error) {
            setMessage({ type: 'error', text: 'Erro ao registrar doação. Verifique os dados e tente novamente.' });
        } else {

            const { data: stats, error: statsError } = await supabase.rpc('get_donations_stats').single();

            if (statsError) {

                setMessage({ type: 'success', text: 'Doação registrada com sucesso! Agradecemos imensamente sua contribuição.' });
            } else {

                const successMessage = `Sua doação de ${donationData.quantity} cesta(s) foi registrada! Você se juntou a uma comunidade que já doou um total de ${stats.total_quantity} cestas. Muito obrigado!`;
                setMessage({ type: 'success', text: successMessage });
            }

            setFormData({ name: '', contact: '', quantity: '1' });
        }
        setLoading(false);
    };
    return (
        <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-left">
            <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">Registre sua Doação</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">Nome ou Empresa</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                               className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                               placeholder="Ex: Cláudia da Silva"
                               required />
                    </div>
                </div>

                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-text-primary mb-1">E-mail ou Telefone</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange}
                               className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                               placeholder="claudia@empresa.com"
                               required />
                    </div>
                </div>

                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-text-primary mb-1">Quantidade de Cestas Básicas</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <GiftIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="number" id="quantity" name="quantity" min="1" value={formData.quantity}
                               onChange={handleChange}
                               className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                               required />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105">
                    {loading ? <ArrowPathIcon className="h-5 w-5 animate-spin" /> : <GiftIcon className="h-5 w-5" />}
                    <span>{loading ? 'Enviando...' : 'Quero Doar Agora'}</span>
                </button>
            </form>

            {message.text && <Alert type={message.type} message={message.text} />}
        </div>
    );
};

export default DonationForm;