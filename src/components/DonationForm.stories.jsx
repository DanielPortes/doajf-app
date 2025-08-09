// src/stories/DonationForm.stories.jsx

import DonationForm from '../components/DonationForm';
import { userEvent, within, fn } from '@storybook/test';

export default {
    title: 'Cenário 1: Doador/Formulário de Doação',
    component: DonationForm,
    tags: ['autodocs'], // Gera documentação automática
    parameters: {
        // Simula uma tela de 700px de largura
        viewport: { defaultViewport: 'responsive' },
        layout: 'centered',
    },
};

// História para o estado padrão do formulário
export const EstadoInicial = {};

// História que simula o preenchimento e envio com sucesso
export const EnvioComSucesso = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Simula o usuário digitando nos campos
        await userEvent.type(canvas.getByLabelText(/Nome ou Empresa/i), 'Cláudia da Silva (Empresária)', { delay: 50 });
        await userEvent.type(canvas.getByLabelText(/E-mail ou Telefone/i), 'claudia.silva@exemplo.com', { delay: 50 });
        await userEvent.type(canvas.getByLabelText(/Quantidade de Cestas/i), '20', { delay: 50 });

        // Simula o clique no botão
        await userEvent.click(canvas.getByRole('button', { name: /Quero Doar Agora/i }));
    },
};

// História que simula uma tentativa de envio com campos vazios
export const ErrosDeValidacao = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        // Simula o clique no botão sem preencher nada
        await userEvent.click(canvas.getByRole('button', { name: /Quero Doar Agora/i }));
    },
};