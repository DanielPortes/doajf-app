// set-admin-role.js

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; // Para carregar as variáveis de .env

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// 👇👇👇 ATENÇÃO: SUBSTITUA COM SEU E-MAIL E SENHA DE AGENTE SOCIAL 👇👇👇
const ADMIN_EMAIL = 'fagundes.daniel191@gmail.com';
const ADMIN_PASSWORD = '12345678'; // Coloque aqui a senha que você cadastrou

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setAdminRole() {
    console.log('Tentando fazer login como admin...');

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
    });

    if (loginError) {
        console.error('Erro no login:', loginError.message);
        return;
    }

    if (loginData.user) {
        console.log('Login bem-sucedido. Atualizando metadados...');

        const { data: updateData, error: updateError } = await supabase.auth.updateUser({
            data: { role: 'admin' }
        });

        if (updateError) {
            console.error('Erro ao atualizar o usuário:', updateError.message);
        } else {
            console.log('Usuário atualizado com sucesso para ter o papel de "admin":');
            console.log(updateData.user.user_metadata);
        }

        await supabase.auth.signOut();
        console.log('Logout efetuado.');
    }
}

setAdminRole();