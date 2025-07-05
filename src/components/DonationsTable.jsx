// Arquivo: src/components/DonationsTable.jsx

import StatusBadge from './StatusBadge';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const DonationsTable = ({ donations, onOpenModal }) => {
    if (donations.length === 0) {
        return <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center text-gray-500 dark:text-gray-400">Nenhuma doação encontrada para os filtros selecionados.</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-slate-100 dark:bg-gray-700/50">
                    {/* CORREÇÃO: Adicionados os cabeçalhos que estavam faltando */}
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Doador</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Contato</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Qtde.</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Ação</th>
                    </tr>
                    </thead>
                    <motion.tbody
                        className="divide-y divide-gray-200 dark:divide-gray-700"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {donations.map((donation, index) => (
                            <motion.tr
                                key={donation.id}
                                variants={itemVariants}
                                className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{donation.donor_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{donation.donor_contact}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400 text-center">{donation.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <StatusBadge status={donation.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <div className="relative flex justify-center group">
                                        <button onClick={() => onOpenModal(donation)} className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800/20 text-primary-600 dark:text-primary-400 transition-colors">
                                            <PencilSquareIcon className="h-5 w-5" />
                                        </button>
                                        <div className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded-md">
                                            Editar Status
                                        </div>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationsTable;