import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers":
                    "authorization, x-client-info, apikey, content-type",
            },
        });
    }

    try {
        const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SERVICE_ROLE_KEY") ?? "",
        );

        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return createCorsResponse(
                { error: "Missing authorization header" },
                401,
            );
        }
        const { data: { user: adminUser }, error: userError } =
            await supabaseAdmin.auth.getUser(authHeader.replace("Bearer ", ""));
        if (userError) {
            return createCorsResponse({ error: userError.message }, 401);
        }
        if (adminUser.user_metadata?.role !== "admin") {
            return createCorsResponse({ error: "Não autorizado" }, 403);
        }

        const { email } = await req.json();
        if (!email) {
            return createCorsResponse({ error: "E-mail é obrigatório" }, 400);
        }

        const { data: inviteData, error: inviteError } = await supabaseAdmin
            .auth.admin
            .inviteUserByEmail(email, {
                data: { role: "agente" },
            });

        if (inviteError) throw inviteError;

        const newUserId = inviteData?.user?.id;
        if (!newUserId) {
            throw new Error(
                "O convite foi enviado, mas não foi possível obter o ID do novo usuário.",
            );
        }

        const { error: profileError } = await supabaseAdmin
            .from("profiles")
            .upsert({
                id: newUserId,
                role: "agente",
            });

        if (profileError) {
            console.error(
                `Aviso: O convite para ${email} foi enviado, mas houve um problema ao criar/atualizar o perfil:`,
                profileError.message,
            );
        }

        return createCorsResponse(inviteData, 200);
    } catch (error) {
        console.error("Erro crítico na função invite-user:", error);
        return createCorsResponse({ error: error.message }, 500);
    }
});
