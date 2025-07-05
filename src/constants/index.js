export const DONATION_STATUS = {
    PENDING: 'Aguardando Contato',
    COLLECTED: 'Coletada',
    DELIVERED: 'Entregue',
};

export const USER_ROLES = {
    ADMIN: 'admin',
    AGENT: 'agente',
};

export const STATUS_OPTIONS = [
    'Todos',
    DONATION_STATUS.PENDING,
    DONATION_STATUS.COLLECTED,
    DONATION_STATUS.DELIVERED,
];

export const STATUS_COLORS = {
    [DONATION_STATUS.PENDING]: 'bg-yellow-200 text-yellow-800',
    [DONATION_STATUS.COLLECTED]: 'bg-blue-200 text-blue-800',
    [DONATION_STATUS.DELIVERED]: 'bg-green-200 text-green-800',
    default: 'bg-gray-200 text-gray-800',
};

export const CHART_COLORS = {
    [DONATION_STATUS.PENDING]: '#FBBF24', // yellow-400
    [DONATION_STATUS.COLLECTED]: '#60A5FA', // blue-400
    [DONATION_STATUS.DELIVERED]: '#34D399', // green-400
};