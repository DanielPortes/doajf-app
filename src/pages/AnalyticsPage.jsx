import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Spinner from '../components/Spinner';
import { useTheme } from '../hooks/useTheme';
import { CHART_COLORS } from '../constants';

const AnalyticsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchAnalytics = async () => {

            setStats(null);
            setLoading(true);



            await new Promise(resolve => setTimeout(resolve, 300));

            try {
                const { data, error } = await supabase.rpc('get_donations_stats').single();
                if (error) throw error;

                const { data: statusData, error: statusError } = await supabase
                    .from('donations')
                    .select('status, quantity');
                if (statusError) throw statusError;

                const statusDistribution = statusData.reduce((acc, curr) => {
                    acc[curr.status] = (acc[curr.status] || 0) + 1;
                    return acc;
                }, {});

                const pieData = Object.keys(statusDistribution).map(key => ({
                    name: key,
                    value: statusDistribution[key]
                }));

                setStats({
                    totals: data,
                    pieChart: pieData,
                });
            } catch (error) {
                console.error('Error fetching analytics:', error);

            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? '#f9fafb' : '#1f2937',
        border: '1px solid #374151',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Análise de Doações</h1>

            {}
            {/* Bloco condicional para o conteúdo principal */}
            {loading ? (

                <div className="flex justify-center items-center h-[60vh] bg-white dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                    <Spinner />
                </div>
            ) : !stats ? (

                <div className="flex justify-center items-center h-[60vh] bg-red-50 dark:bg-red-900/20 rounded-lg border border-dashed border-red-400 dark:border-red-500">
                    <p className="text-red-600 dark:text-red-400 font-medium">Não foi possível carregar os dados de análise.</p>
                </div>
            ) : (

                <>
                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-text-secondary dark:text-gray-400">Total de Cestas Doadas</h3>
                            <p className="text-4xl font-bold text-primary-700 dark:text-primary-400 mt-2">{stats.totals.total_quantity}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-medium text-text-secondary dark:text-gray-400">Total de Doações Registradas</h3>
                            <p className="text-4xl font-bold text-primary-700 dark:text-primary-400 mt-2">{stats.totals.total_donations}</p>
                        </div>
                    </div>

                    {/* Gráfico */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Distribuição por Status</h3>
                        <div style={{ width: '100%', height: 300 }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie data={stats.pieChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" labelLine={false} label>
                                        {stats.pieChart.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[entry.name]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={tooltipStyle} />
                                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
            {}
        </div>
    );
};

export default AnalyticsPage;