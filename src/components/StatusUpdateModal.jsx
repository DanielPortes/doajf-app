import {useState, useEffect} from 'react';
import {DONATION_STATUS} from '../constants';
import Button from './Button';

const StatusUpdateModal = ({isOpen, onClose, onUpdate, donation}) => {
    const [newStatus, setNewStatus] = useState('');

    const statusOptions = [DONATION_STATUS.PENDING, DONATION_STATUS.COLLECTED, DONATION_STATUS.DELIVERED];

    useEffect(() => {
        if (donation) {
            setNewStatus(donation.status);
        }
    }, [donation]);

    if (!isOpen || !donation) return null;

    const handleUpdate = () => {
        onUpdate(donation.id, newStatus);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Alterar Status da Doação</h3>
                <p className="mb-1 text-gray-700 dark:text-gray-300">Doador: <span
                    className="font-semibold text-text-primary dark:text-white">{donation.donor_name}</span></p>
                <p className="mb-6 text-gray-700 dark:text-gray-300">Quantidade: <span
                    className="font-semibold text-text-primary dark:text-white">{donation.quantity} cesta(s)</span></p>

                <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Novo
                        Status</label>
                    <select
                        id="status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                        {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-4">
                    {}
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdate}>
                        Salvar Alterações
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StatusUpdateModal;