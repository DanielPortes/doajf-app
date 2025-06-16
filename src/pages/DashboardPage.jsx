
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../services/supabaseClient';
import DonationsTable from '../components/DonationsTable';
import StatusUpdateModal from '../components/StatusUpdateModal';
import Spinner from '../components/Spinner';
import { MagnifyingGlassIcon, FunnelIcon, InboxIcon, CheckCircleIcon, CubeIcon } from '@heroicons/react/24/solid';

const DashboardPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDonation, setCurrentDonation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    const fetchDonations = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('donations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching donations:', error);
        else setDonations(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]);

    const filteredDonations = useMemo(() => {
        return donations
            .filter(d => statusFilter === 'Todos' || d.status === statusFilter)
            .filter(d => d.donor_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [donations, statusFilter, searchTerm]);


    const summaryStats = useMemo(() => {
        return {
            pending: donations.filter(d => d.status === 'Aguardando Contato').length,
            collected: donations.filter(d => d.status === 'Coletada').length,
            delivered: donations.filter(d => d.status === 'Entregue').length,
        };
    }, [donations]);



    const handleOpenModal = (donation) => {
        setCurrentDonation(donation);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentDonation(null);
    };

    const handleUpdateStatus = async (id, newStatus) => {
        const { error } = await supabase.from('donations').update({ status: newStatus }).eq('id', id);
        if (error) {
            console.error('Error updating status:', error);
        } else {
            fetchDonations();
        }
        handleCloseModal();
    };

    const statusOptions = ['Todos', 'Aguardando Contato', 'Coletada', 'Entregue'];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Painel de Doações</h1>

            </div>

            {}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => setStatusFilter('Aguardando Contato')} className="p-4 bg-white rounded-lg shadow-sm border border-yellow-300 flex items-center gap-4 cursor-pointer hover:bg-yellow-50">
                    <InboxIcon className="h-8 w-8 text-yellow-500"/>
                    <div>
                        <p className="text-2xl font-bold text-yellow-800">{summaryStats.pending}</p>
                        <p className="text-sm font-medium text-text-secondary">Aguardando Contato</p>
                    </div>
                </div>
                <div onClick={() => setStatusFilter('Coletada')} className="p-4 bg-white rounded-lg shadow-sm border border-blue-300 flex items-center gap-4 cursor-pointer hover:bg-blue-50">
                    <CubeIcon className="h-8 w-8 text-blue-500"/>
                    <div>
                        <p className="text-2xl font-bold text-blue-800">{summaryStats.collected}</p>
                        <p className="text-sm font-medium text-text-secondary">Coletadas</p>
                    </div>
                </div>
                <div onClick={() => setStatusFilter('Entregue')} className="p-4 bg-white rounded-lg shadow-sm border border-green-300 flex items-center gap-4 cursor-pointer hover:bg-green-50">
                    <CheckCircleIcon className="h-8 w-8 text-green-500"/>
                    <div>
                        <p className="text-2xl font-bold text-green-800">{summaryStats.delivered}</p>
                        <p className="text-sm font-medium text-text-secondary">Entregues</p>
                    </div>
                </div>
            </div>

            {}
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar por doador</label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" placeholder="Ex: André o Organizador"/>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Filtrar por status</label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FunnelIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                                {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? <Spinner /> : <DonationsTable donations={filteredDonations} onOpenModal={handleOpenModal} />}

            <StatusUpdateModal isOpen={isModalOpen} onClose={handleCloseModal} onUpdate={handleUpdateStatus} donation={currentDonation} />
        </div>
    );
};

export default DashboardPage;