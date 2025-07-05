import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getFullUser = (sessionUser) => {
        if (!sessionUser) return null;

        // O papel (role) está nos metadados do usuário
        const role = sessionUser.user_metadata?.role || 'agente';

        return { ...sessionUser, role };
    };

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const fullUser = getFullUser(session?.user);
            setUser(fullUser);
            setLoading(false);
        };

        fetchSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const fullUser = getFullUser(session?.user);
            setUser(fullUser);
            if (_event === 'SIGNED_IN' || _event === 'PASSWORD_RECOVERY') {
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return { user, loading };
}