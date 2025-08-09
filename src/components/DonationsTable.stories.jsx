// src/stories/DonationsTable.stories.jsx

import DonationsTable from '../components/DonationsTable';
import { DONATION_STATUS } from '../constants'; // Importe seus status

export default {
    title: 'Cenário 2: Agente/Tabela de Doações',
    component: DonationsTable,
    tags: ['autodocs'],
    parameters: {
        // Layout de tela cheia para ver a tabela completa
        layout: 'fullscreen',
    },
};

// Dados de exemplo para popular a tabela
const mockDonations = [
    { id: 1, donor_name: 'Empresa Solidária Ltda.', donor_contact: 'contato@solidaria.com', quantity: 50, status: DONATION_STATUS.PENDING, created_at: '2025-06-10T10:00:00Z' },
    { id: 2, donor_name: 'Cláudia da Silva (Empresária)', donor_contact: 'claudia.silva@exemplo.com', quantity: 20, status: DONATION_STATUS.PENDING, created_at: '2025-06-10T09:30:00Z' },
    { id: 3, donor_name: 'André o Organizador', donor_contact: 'andre.agente@pjf.gov.br', quantity: 5, status: DONATION_STATUS.COLLECTED, created_at: '2025-06-09T15:00:00Z' },
    { id: 4, donor_name: 'Supermercado Preço Bom', donor_contact: '(32) 99999-8888', quantity: 100, status: DONATION_STATUS.DELIVERED, created_at: '2025-06-08T11:00:00Z' },
    { id: 5, donor_name: 'Anônimo', donor_contact: 'Não informado', quantity: 1, status: DONATION_STATUS.DELIVERED, created_at: '2025-06-07T18:00:00Z' },
];

// História da tabela com dados
export const ComDados = {
    args: {
        donations: mockDonations,
        onOpenModal: () => alert('Ação "Editar Status" clicada!'), // Simula a ação do botão
    },
};

// História da tabela vazia (importante para UX!)
export const EstadoVazio = {
    args: {
        donations: [],
        onOpenModal: () => {},
    },
};