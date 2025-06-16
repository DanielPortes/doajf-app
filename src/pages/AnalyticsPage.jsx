import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Spinner from '../components/Spinner';

const AnalyticsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const { data, error } = await supabase.rpc('get_donations_stats').single();
            if (error) {
                console.error('Error fetching analytics:', error);
            } else {
                const { data: statusData } = await supabase
                    .from('donations')
                    .select('status, quantity');

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
            }
            setLoading(false);
        };

        fetchAnalytics();
    }, []);

    if (loading) return <Spinner />;
    if (!stats) return <p>Não foi possível carregar os dados.</p>;

    const COLORS = {
        'Aguardando Contato': '#FBBF24', // yellow-400
        'Coletada': '#60A5FA', // blue-400
        'Entregue': '#34D399', // green-400
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Análise de Doações</h1>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-text-secondary">Total de Cestas Doadas</h3>
                    <p className="text-4xl font-bold text-primary-700 mt-2">{stats.totals.total_quantity}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-text-secondary">Total de Doações Registradas</h3>
                    <p className="text-4xl font-bold text-primary-700 mt-2">{stats.totals.total_donations}</p>
                </div>
            </div>

            {/* Gráficos */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Distribuição por Status</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie data={stats.pieChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                {stats.pieChart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;