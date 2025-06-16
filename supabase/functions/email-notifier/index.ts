import { serve } from 'std/http/server.ts';
import { Resend } from 'resend';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const AGENT_EMAIL = 'email.do.agente@prefeitura.com';
const FROM_EMAIL = 'doajf@resend.dev';
const resend = new Resend(RESEND_API_KEY);

serve(async (req) => {
  try {
    const { record: donation } = await req.json();

    if (!donation) {
      throw new Error('No donation record found in payload');
    }

    // 1. Enviar e-mail de agradecimento para o Doador
    await resend.emails.send({
      from: `DoaJF <${FROM_EMAIL}>`,
      to: [donation.donor_contact], // Assumindo que o contato é um e-mail válido
      subject: 'Obrigado pela sua doação!',
      html: `
        <h1>Olá, ${donation.donor_name}!</h1>
        <p>Recebemos o registro da sua doação de <strong>${donation.quantity} cesta(s) básica(s)</strong>.</p>
        <p>Sua solidariedade faz a diferença. Em breve, um de nossos agentes entrará em contato para agendar a coleta.</p>
        <p>Muito obrigado!</p>
        <p><strong>Equipe DoaJF - Prefeitura de Juiz de Fora</strong></p>
      `
    });

    // 2. Enviar notificação para o Agente Social
    await resend.emails.send({
      from: `Sistema DoaJF <${FROM_EMAIL}>`,
      to: [AGENT_EMAIL],
      subject: `Nova doação registrada - ${donation.donor_name}`,
      html: `
        <h1>Nova Doação Registrada</h1>
        <p>Uma nova doação foi registrada no sistema:</p>
        <ul>
          <li><strong>Doador:</strong> ${donation.donor_name}</li>
          <li><strong>Contato:</strong> ${donation.donor_contact}</li>
          <li><strong>Quantidade:</strong> ${donation.quantity} cesta(s)</li>
        </ul>
        <p>Por favor, acesse o painel para gerenciar a doação.</p>
      `
    });

    return new Response(JSON.stringify({ message: 'Emails sent successfully' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})