// src/stories/AnalyticsPage.stories.jsx

import AnalyticsPage from './AnalyticsPage.jsx';
import { DONATION_STATUS } from '../constants/index.js';

export default {
    title: 'Cenário 3: Agente/Página de Análises',
    component: AnalyticsPage,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

// Dados de exemplo que simulam a resposta da API
const mockStats = {
    totals: {
        total_quantity: 176,
        total_donations: 5,
    },
    pieChart: [
        { name: DONATION_STATUS.PENDING, value: 2 },
        { name: DONATION_STATUS.COLLECTED, value: 1 },
        { name: DONATION_STATUS.DELIVERED, value: 2 },
    ],
};

// História principal, passando os dados de exemplo como 'args'
export const VisaoGeral = {
    args: {
        initialStats: mockStats,
        isLoading: false,
    },
};

// História que mostra o estado de loading
export const Carregando = {
    args: {
        initialStats: null,
        isLoading: true,
    },
};

// História que mostra o estado de erro (quando os dados não puderam ser carregados)
export const EstadoDeErro = {
    args: {
        initialStats: null,
        isLoading: false,
    },
};