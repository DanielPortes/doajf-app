-- supabase/migrations/0001_create_donation_function.sql

-- Cria a função que irá receber os dados da doação
create or replace function create_donation(
  donor_name text,
  donor_contact text,
  quantity int
)
returns void -- A função não precisa retornar nada para o front-end
language plpgsql
-- SECURITY DEFINER executa a função com os privilégios do usuário que a criou (o admin),
-- ignorando as RLS para a operação de INSERT dentro dela. Isso é seguro.
security definer set search_path = public as
$$
begin
  -- Insere os dados na tabela de doações
insert into public.donations (donor_name, donor_contact, quantity)
values (donor_name, donor_contact, quantity);
end;
$$;

-- Concede permissão para que usuários anônimos (public) possam executar esta função
grant execute on function public.create_donation(text, text, int) to anon;
grant execute on function public.create_donation(text, text, int) to authenticated;