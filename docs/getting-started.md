# Primeiros Passos

Este guia descreve como configurar e executar o projeto em um ambiente de desenvolvimento local.

## Pré-requisitos

-   Node.js (versão 18 ou superior)
-   npm ou yarn
-   Uma conta gratuita no [Supabase](https://supabase.io/)

## Configuração do Backend (Supabase)

1.  Crie um novo projeto no Supabase.
2.  No editor de tabelas, crie a tabela `donations` com as colunas `donor_name`, `donor_contact`, `quantity` e `status`.
3.  Vá para **Authentication > Users** e crie um usuário para testar o painel.
4.  Vá para **Project Settings > API** e copie a **URL** e a chave **anon public**.

## Instalação e Execução

1.  Clone o repositório:
    ```bash
    git clone https://github.com/DanielPortes/doajf-app.git
    cd doajf-app
    ```

2.  Crie um arquivo `.env.local` na raiz do projeto e adicione as chaves do Supabase:
    ```
    VITE_SUPABASE_URL=SUA_URL_DO_SUPABASE
    VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
    ```

3.  Instale as dependências:
    ```bash
    npm install
    ```

4.  Execute a aplicação em modo de desenvolvimento:
    ```bash
    npm run dev
    ```
A aplicação estará disponível em `http://localhost:5173`.