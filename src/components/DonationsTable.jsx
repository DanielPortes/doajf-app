import StatusBadge from './StatusBadge';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

const DonationsTable = ({ donations, onOpenModal }) => {
    if (donations.length === 0) {
        return <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">Nenhuma doação encontrada para os filtros selecionados.</div>;
    }

    return (
        <div className="bg-white shadow rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Doador</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contato</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Qtd.</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {donations.map((donation, index) => (
                        <tr key={donation.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donation.donor_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{donation.donor_contact}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">{donation.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                <StatusBadge status={donation.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                {}
                                <div className="relative flex justify-center group">
                                    <button onClick={() => onOpenModal(donation)} className="p-2 rounded-full hover:bg-primary-100 text-primary-600 hover:text-primary-800 transition-colors">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </button>
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-gray-800 text-white text-xs rounded-md">
                                        Editar Status
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationsTable;