# DoaJF - Aplicativo de Gerenciamento de Doações

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-2.39-green?logo=supabase)

**DoaJF** é uma aplicação web desenvolvida como parte da disciplina de **DCC174 - Interação Humano-Computador** da Universidade Federal de Juiz de Fora (UFJF). O projeto visa otimizar o processo de doação de cestas básicas para a Prefeitura de Juiz de Fora, criando uma ponte digital entre doadores e a Secretaria de Assistência Social.

A plataforma oferece uma interface pública para o registro de doações e um painel administrativo seguro para que os agentes sociais gerenciem o ciclo de vida de cada doação, desde o registro até a entrega.

---

## Índice

- [Contexto do Projeto](#contexto-do-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Personas e Metas de Design](#personas-e-metas-de-design)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)
    - [Pré-requisitos](#pré-requisitos)
    - [Configuração do Backend (Supabase)](#configuração-do-backend-supabase)
    - [Instalação e Execução](#instalação-e-execução)
- [Autores](#autores)

---

## Contexto do Projeto

Este projeto atende ao **Tema 5: "Aplicativo de Gerenciamento de Doações da Prefeitura de Juiz de Fora"**, proposto na disciplina DCC174. O principal desafio identificado foi a falta de um canal centralizado e eficiente para registrar e gerenciar doações, o que gerava alta carga cognitiva para os agentes sociais e barreiras para os doadores.

A solução foi projetada com base em princípios de IHC para:
- **Reduzir a carga cognitiva** dos agentes.
- **Aumentar a eficiência** no processo de doação.
- **Fornecer feedback claro** e transparente aos usuários.
- **Prevenir erros operacionais** através de uma interface intuitiva.

## Funcionalidades Principais

A aplicação é dividida em duas grandes áreas, cada uma focada em um perfil de usuário.

### 🧍‍♂️ Para Doadores (Página Pública)

- **Formulário de Doação Simplificado:** Permite que pessoas físicas ou jurídicas registrem a intenção de doar cestas básicas informando nome, contato e quantidade.
- **Feedback Imediato:** O sistema exibe mensagens de sucesso ou erro instantaneamente após a submissão.
- **Design Responsivo:** A interface se adapta a dispositivos móveis e desktops para facilitar o acesso.

### 👮 Para Agentes Sociais (Painel Administrativo)

- **Acesso Restrito:** Autenticação segura por e-mail e senha para garantir que apenas pessoal autorizado acesse o painel.
- **Dashboard Centralizado:** Visualização de todas as doações registradas, ordenadas por data.
- **Busca e Filtragem:** Ferramentas para buscar doações por nome do doador e filtrar por status (`Aguardando Contato`, `Coletada`, `Entregue`).
- **Gerenciamento de Status:** Funcionalidade para atualizar o status de cada doação através de um modal, facilitando o acompanhamento do fluxo logístico.
- **Logout Seguro:** Permite encerrar a sessão de forma segura.

## Personas e Metas de Design

O design da solução foi guiado por duas personas principais, extraídas da fase de levantamento de requisitos:

> ### 👤 Cláudia, 35 anos (Empresária Doadora)
> **Cenário:** "Minha empresa quer fazer uma doação mensal. O processo atual por telefone é confuso. Eu só queria um formulário online rápido para preencher e ter a certeza de que a prefeitura recebeu meu registro."
> **Solução:** Uma página pública com um formulário limpo, direto e que fornece confirmação imediata.

> ### 👤 André, 45 anos (Agente Social)
> **Cenário:** "Trabalho há 10 anos na secretaria e passo o dia entre planilhas e o telefone. Gostaria de uma ferramenta simples onde eu pudesse ver todas as doações e gerenciar o status delas, tudo em um só lugar."
> **Solução:** Um painel de controle protegido por senha com uma tabela clara, filtros e a capacidade de atualizar o status de cada item com poucos cliques.

## Tecnologias Utilizadas

- **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Roteamento:** [React Router DOM](https://reactrouter.com/)
- **Backend as a Service (BaaS):** [Supabase](https://supabase.io/) (para Autenticação e Banco de Dados PostgreSQL)
- **Ícones:** [Heroicons](https://heroicons.com/)
- **Utilitários:** [clsx](https://github.com/lukeed/clsx) para classes condicionais.

## Estrutura do Projeto

```
doajf-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/      # Componentes reutilizáveis (Button, Alert, Forms, etc.)
│   ├── pages/           # Páginas da aplicação (PublicPage, LoginPage, DashboardPage)
│   ├── services/        # Configuração do cliente Supabase
│   ├── App.jsx          # Roteamento principal
│   ├── main.jsx         # Ponto de entrada da aplicação
│   └── input.css        # Arquivo de entrada do Tailwind CSS
├── .env.local.example   # Exemplo de variáveis de ambiente
├── package.json
└── README.md
```

## Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação em seu ambiente de desenvolvimento.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma conta gratuita no [Supabase](https://supabase.io/).

### Configuração do Backend (Supabase)

1.  **Crie um novo projeto no Supabase.**
2.  No seu projeto Supabase, vá para **Table Editor** e crie uma nova tabela chamada `donations`.
3.  Adicione as seguintes colunas à tabela `donations`:
    - `id` (int8, is identity, primary key) - *criado por padrão*
    - `created_at` (timestamptz, default: `now()`) - *criado por padrão*
    - `donor_name` (text)
    - `donor_contact` (text)
    - `quantity` (int4)
    - `status` (text, default: `'Aguardando Contato'`)
4.  Certifique-se de que a **Row Level Security (RLS)** esteja **desabilitada** para a tabela `donations` para este projeto de teste. Para um ambiente de produção, políticas de segurança adequadas seriam necessárias.
5.  Vá para **Project Settings > API**. Copie a **URL do Projeto** e a chave **anon public**.

### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Crie o arquivo de variáveis de ambiente:**
    Crie um arquivo chamado `.env.local` na raiz do projeto e adicione as chaves que você copiou do Supabase:
    ```
    VITE_SUPABASE_URL=SUA_URL_DO_SUPABASE
    VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLIC
    ```

4.  **Execute a aplicação:**
    ```bash
    npm run dev
    ```

5.  Abra seu navegador e acesse `http://localhost:5173`.

> **Nota sobre autenticação:** Para testar a área administrativa, você precisa criar um usuário. Vá para **Authentication > Users** no seu painel do Supabase e adicione um novo usuário com um e-mail e senha. Use essas credenciais para fazer login na página `/login` da aplicação.

## Autores

- Daniel Fagundes - [GitHub](https://github.com/DanielPortes/)