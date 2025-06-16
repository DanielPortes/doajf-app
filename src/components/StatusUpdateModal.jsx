import { useState, useEffect } from 'react';

const StatusUpdateModal = ({ isOpen, onClose, onUpdate, donation }) => {
    const [newStatus, setNewStatus] = useState('');
    const statusOptions = ['Aguardando Contato', 'Coletada', 'Entregue'];

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
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Alterar Status da Doação</h3>
                <p className="mb-1">Doador: <span className="font-semibold">{donation.donor_name}</span></p>
                <p className="mb-6">Quantidade: <span className="font-semibold">{donation.quantity} cesta(s)</span></p>

                <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Novo Status</label>
                    <select
                        id="status"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                        {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold">
                        Cancelar
                    </button>
                    <button onClick={handleUpdate} className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 font-semibold">
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusUpdateModal;