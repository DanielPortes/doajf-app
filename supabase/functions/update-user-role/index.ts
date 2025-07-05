

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

        const { userId, role } = await req.json();
        if (!userId || !role) return createCorsResponse({ error: 'ID do usuário e papel são obrigatórios' }, 400);

        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
            user_metadata: { role }
        });

        if (error) throw error;
        return createCorsResponse(data.user, 200);

    } catch (error) {
        console.error('Erro na função update-user-role:', error);
        return createCorsResponse({ error: error.message }, 500);
    }
});