# Arquitetura da Solução

O DoaJF é uma aplicação web moderna que segue uma arquitetura JAMstack, separando o frontend da lógica de backend e dados.

## Frontend

-   **Framework:** **React 18** com **Vite** como ferramenta de build.
-   **Estilização:** **Tailwind CSS**, utilizando uma abordagem utility-first para criar uma interface consistente e responsiva.
-   **Roteamento:** **React Router DOM** gerencia a navegação entre as páginas (Pública, Login, Dashboard, Análises).
-   **Estado:** O estado global (como a sessão do usuário) é gerenciado através de hooks customizados (`useAuth`).

## Backend e Banco de Dados

-   **Backend as a Service (BaaS):** **Supabase** centraliza todas as operações de backend.
    -   **Banco de Dados:** Um banco de dados **PostgreSQL** provisionado pelo Supabase armazena as informações das doações.
    -   **Autenticação:** O serviço `Supabase Auth` gerencia o login e a sessão segura dos Agentes Sociais.
    -   **Edge Functions:** Uma função serverless (escrita em Deno/TypeScript) é acionada por um gatilho no banco de dados sempre que uma nova doação é inserida. Essa função é responsável por enviar e-mails de notificação.

## Fluxo de Dados

1.  Um **Doador** submete o formulário na página pública.
2.  O cliente React envia os dados para a API do Supabase, que os insere na tabela `donations`.
3.  O gatilho do banco de dados aciona a **Edge Function**, que envia e-mails.
4.  Um **Agente Social** logado no painel administrativo faz uma requisição à API do Supabase para buscar e exibir a lista de doações.