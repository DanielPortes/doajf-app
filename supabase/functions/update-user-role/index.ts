// update-user-role.js
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// IMPORTANTE: Use a chave de serviço para operações de admin
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Crie um cliente com privilégios de administrador
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// ID do usuário que você quer modificar (pegue do dashboard)
const USER_ID_TO_UPDATE = '29d4f9dd-d9bf-4137-8420-9ac07d420ad5'; // ID do agente@pjf.gov.br
const NEW_ROLE = 'agente';

async function updateUserRole() {
    console.log(`Tentando atualizar o usuário ${USER_ID_TO_UPDATE} para o papel "${NEW_ROLE}"...`);

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
        USER_ID_TO_UPDATE,
        { user_metadata: { role: NEW_ROLE } }
    );

    if (error) {
        console.error('Erro ao atualizar o usuário:', error.message);
        return;
    }

    console.log('Usuário atualizado com sucesso!');
    console.log(data.user.user_metadata);
}

updateUserRole();