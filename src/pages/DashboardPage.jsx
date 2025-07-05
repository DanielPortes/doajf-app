import {useState, useEffect, useCallback, useMemo} from 'react';
import {supabase} from '../services/supabaseClient';
import DonationsTable from '../components/DonationsTable';
import StatusUpdateModal from '../components/StatusUpdateModal';
import Spinner from '../components/Spinner';
import {MagnifyingGlassIcon, FunnelIcon, InboxIcon, CheckCircleIcon, CubeIcon} from '@heroicons/react/24/solid';
import {DONATION_STATUS, STATUS_OPTIONS} from '../constants';
import clsx from 'clsx';

const DashboardPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDonation, setCurrentDonation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Todos');

    const fetchDonations = useCallback(async () => {
        setLoading(true);


        const {data, error} = await supabase
            .from('donations')
            .select('*')
            .order('created_at', {ascending: false});

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
            pending: donations.filter(d => d.status === DONATION_STATUS.PENDING).length,
            collected: donations.filter(d => d.status === DONATION_STATUS.COLLECTED).length,
            delivered: donations.filter(d => d.status === DONATION_STATUS.DELIVERED).length,
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
        const {error} = await supabase.from('donations').update({status: newStatus}).eq('id', id);
        if (error) {
            console.error('Error updating status:', error);
        } else {
            fetchDonations();
        }
        handleCloseModal();
    };

    const handleFilterClick = (status) => {
        if (statusFilter === status) {
            setStatusFilter('Todos');
        } else {
            setStatusFilter(status);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Painel de Doações</h1>

            {}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                    onClick={() => handleFilterClick(DONATION_STATUS.PENDING)}
                    className={clsx(
                        'p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 flex items-center gap-4 cursor-pointer transition-all hover:scale-105',
                        {'ring-2 ring-yellow-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900': statusFilter === DONATION_STATUS.PENDING}
                    )}
                >
                    <InboxIcon className="h-8 w-8 text-yellow-500"/>
                    <div>
                        <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-400">{summaryStats.pending}</p>
                        <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Aguardando Contato</p>
                    </div>
                </div>
                <div
                    onClick={() => handleFilterClick(DONATION_STATUS.COLLECTED)}
                    className={clsx(
                        'p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 flex items-center gap-4 cursor-pointer transition-all hover:scale-105',
                        {'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900': statusFilter === DONATION_STATUS.COLLECTED}
                    )}
                >
                    <CubeIcon className="h-8 w-8 text-blue-500"/>
                    <div>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-400">{summaryStats.collected}</p>
                        <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Coletadas</p>
                    </div>
                </div>
                <div
                    onClick={() => handleFilterClick(DONATION_STATUS.DELIVERED)}
                    className={clsx(
                        'p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 flex items-center gap-4 cursor-pointer transition-all hover:scale-105',
                        {'ring-2 ring-green-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900': statusFilter === DONATION_STATUS.DELIVERED}
                    )}
                >
                    <CheckCircleIcon className="h-8 w-8 text-green-500"/>
                    <div>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-400">{summaryStats.delivered}</p>
                        <p className="text-sm font-medium text-text-secondary dark:text-gray-400">Entregues</p>
                    </div>
                </div>
            </div>

            {}
            <div
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Buscar
                            por doador</label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input type="text" id="search" value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                   placeholder="Ex: André o Organizador"/>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="statusFilter"
                               className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filtrar por
                            status</label>
                        <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FunnelIcon className="h-5 w-5 text-gray-400"/>
                            </div>
                            <select id="statusFilter" value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white pl-10 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {}
            {}
            <div className="rounded-lg min-h-[60vh] flex flex-col">
                {loading ? (

                    <div
                        className="flex-grow w-full flex items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                    >
                        <Spinner/>
                    </div>
                ) : (
                    <DonationsTable
                        key={`${statusFilter}-${searchTerm}`}
                        donations={filteredDonations}
                        onOpenModal={handleOpenModal}
                    />
                )}
            </div>

            <StatusUpdateModal isOpen={isModalOpen} onClose={handleCloseModal} onUpdate={handleUpdateStatus}
                               donation={currentDonation}/>
        </div>
    );
};

export default DashboardPage;