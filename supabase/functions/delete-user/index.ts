// supabase/functions/delete-user/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

function createCorsResponse(body, status) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        },
    });
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
            }});
    }

    try {
        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SERVICE_ROLE_KEY') ?? ''
        );

        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return createCorsResponse({ error: 'Missing authorization header' }, 401);
        }

        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
            authHeader.replace('Bearer ', '')
        );

        if (userError) return createCorsResponse({ error: userError.message }, 401);
        if (user.user_metadata?.role !== 'admin') {
            return createCorsResponse({ error: 'Não autorizado' }, 403);
        }

        const { userId } = await req.json();
        if (!userId) return createCorsResponse({ error: 'ID do usuário é obrigatório' }, 400);

        const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (error) throw error;
        return createCorsResponse({ message: 'Usuário removido com sucesso' }, 200);

    } catch (error) {
        console.error('Erro na função delete-user:', error);
        return createCorsResponse({ error: error.message }, 500);
    }
});