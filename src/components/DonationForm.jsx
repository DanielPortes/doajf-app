import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import Alert from './Alert';
import Button from './Button';
import Confetti from './Confetti';
import { UserIcon, EnvelopeIcon, GiftIcon } from '@heroicons/react/24/solid';

import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

const DonationForm = () => {
    const [formData, setFormData] = useState({ name: '', contact: '', quantity: '1' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showConfetti, setShowConfetti] = useState(false);

    const [errors, setErrors] = useState({});
    const [isTouched, setIsTouched] = useState(false);

    const validate = (data) => {
        const newErrors = {};

        if (!data.name || data.name.trim().length < 3) {
            newErrors.name = 'O nome deve ter pelo menos 3 caracteres.';
        }

        if (!data.contact) {
            newErrors.contact = 'O contato é obrigatório.';
        } else if (!/(@|(\d{5,}))/.test(data.contact)) {
            newErrors.contact = 'Por favor, insira um e-mail ou telefone válido.';
        }

        if (!data.quantity || Number(data.quantity) < 1) {
            newErrors.quantity = 'A quantidade mínima é 1.';
        }

        return newErrors;
    };

    useEffect(() => {
        if (isTouched) {
            setErrors(validate(formData));
        }
    }, [formData, isTouched]);

    const handleBlur = () => {
        setIsTouched(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsTouched(true);

        const formErrors = validate(formData);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });
        setShowConfetti(false);

        await new Promise(resolve => setTimeout(resolve, 500));

        const { error } = await supabase.rpc('create_donation', {
            donation_data: {
                donor_name: formData.name,
                donor_contact: formData.contact,
                quantity: Number(formData.quantity)
            }
        });

        if (error) {
            console.error('Erro ao registrar doação:', error);
            setMessage({ type: 'error', text: 'Erro ao registrar doação. Verifique os dados e tente novamente.' });
        } else {
            setShowConfetti(true);
            setMessage({ type: 'success', text: 'Doação registrada com sucesso! Agradecemos imensamente sua contribuição e solidariedade.' });
            setFormData({ name: '', contact: '', quantity: '1' });
            setErrors({});
            setIsTouched(false);
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-left">
            {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
            <h2 className="text-3xl font-bold text-center text-primary-700 dark:text-primary-500 mb-8">Registre sua Doação</h2>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-1">Nome ou Empresa</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={clsx(
                                "block w-full rounded-md pl-10 shadow-sm sm:text-sm",
                                "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                errors.name
                                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                                    : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                            )}
                            placeholder="Ex: Cláudia da Silva"
                            required
                        />
                    </div>
                    <AnimatePresence>
                        {errors.name && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-xs text-danger-600 dark:text-danger-400">{errors.name}</motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {}
                <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-1">E-mail ou Telefone</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={clsx(
                                "block w-full rounded-md pl-10 shadow-sm sm:text-sm",
                                "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                errors.contact
                                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                                    : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                            )}
                            placeholder="claudia@empresa.com"
                            required
                        />
                    </div>
                    <AnimatePresence>
                        {errors.contact && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-xs text-danger-600 dark:text-danger-400">{errors.contact}</motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {}
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-1">Quantidade de Cestas Básicas</label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <GiftIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            value={formData.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={clsx(
                                "block w-full rounded-md pl-10 shadow-sm sm:text-sm",
                                "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                                errors.quantity
                                    ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                                    : "border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500"
                            )}
                            required
                        />
                    </div>
                    <AnimatePresence>
                        {errors.quantity && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-xs text-danger-600 dark:text-danger-400">{errors.quantity}</motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <Button type="submit" loading={loading} icon={GiftIcon} className="w-full">
                    {loading ? 'Enviando...' : 'Quero Doar Agora'}
                </Button>
            </form>

            <AnimatePresence>
                {message.text && <Alert type={message.type} message={message.text} />}
            </AnimatePresence>
        </div>
    );
};

export default DonationForm;