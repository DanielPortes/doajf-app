import { serve } from "";
import { createClient } from "";
import { Resend } from "resend";

function createCorsResponse(body: any, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
    },
  });
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const FROM_EMAIL = "doajf@resend.dev";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const { record: donation } = await req.json();

    if (!donation) {
      throw new Error("Nenhum registro de doação encontrado no payload");
    }
    if (!RESEND_API_KEY) {
      throw new Error(
        "A chave da API do Resend (RESEND_API_KEY) não está configurada como um secret.",
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    if (donation.donor_contact && donation.donor_contact.includes("@")) {
      await resend.emails.send({
        from: `DoaJF <${FROM_EMAIL}>`,
        to: [donation.donor_contact],
        subject: "Obrigado pela sua doação!",
        html:
          `<h1>Olá, ${donation.donor_name}!</h1><p>Recebemos o registro da sua doação de <strong>${donation.quantity} cesta(s) básica(s)</strong>. Sua solidariedade faz a diferença. Em breve, um de nossos agentes entrará em contato para agendar a coleta. Muito obrigado!</p><p><strong>Equipe DoaJF - Prefeitura de Juiz de Fora</strong></p>`,
      });
    }

    const supabaseAdminClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SERVICE_ROLE_KEY") ?? "",
    );

    const { data: users, error: userError } = await supabaseAdminClient.auth
      .admin.listUsers();
    if (userError) throw userError;

    const recipientEmails = users.users
      .filter((user) =>
        user.user_metadata?.role === "admin" ||
        user.user_metadata?.role === "agente"
      )
      .map((user) => user.email)
      .filter((email) => email);

    if (recipientEmails.length > 0) {
      await resend.emails.send({
        from: `Sistema DoaJF <${FROM_EMAIL}>`,
        to: recipientEmails,
        subject: `Nova doação registrada - ${donation.donor_name}`,
        html:
          `<h1>Nova Doação Registrada</h1><p>Uma nova doação foi registrada no sistema:</p><ul><li><strong>Doador:</strong> ${donation.donor_name}</li><li><strong>Contato:</strong> ${donation.donor_contact}</li><li><strong>Quantidade:</strong> ${donation.quantity} cesta(s)</li></ul><p>Por favor, acesse o painel para gerenciar a doação.</p>`,
      });
    }

    const postTitle = `Agradecimento a ${donation.donor_name}`;
    const postContent =
      `Agradecemos a generosa doação de ${donation.quantity} cesta(s) básica(s) feita por ${donation.donor_name}. Gestos como este fortalecem nossa comunidade e levam esperança para quem mais precisa.`;

    const { error: postError } = await supabaseAdminClient.from("posts").insert(
      {
        title: postTitle,
        content: postContent,
      },
    );

    if (postError) {
      console.error("Erro ao criar post no mural:", postError);
    }

    return createCorsResponse({
      message: "E-mails e post no mural processados com sucesso.",
    }, 200);
  } catch (error) {
    console.error("Erro crítico na função email-notifier:", error);
    return createCorsResponse({ error: error.message }, 500);
  }
});
