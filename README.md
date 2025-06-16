# DoaJF - Aplicativo de Gerenciamento de Doações

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-2.39-green?logo=supabase)

**DoaJF** é uma aplicação web desenvolvida como parte da disciplina de **DCC174 - Interação Humano-Computador** da Universidade Federal de Juiz de Fora (UFJF). O projeto visa otimizar o processo de doação de cestas básicas para a Prefeitura de Juiz de Fora, criando uma ponte digital entre doadores e a Secretaria de Assistência Social.

---

## 🚀 Deploy & Acesso

A aplicação está disponível publicamente e pode ser acessada através do link abaixo:

**[https://doajf-app.vercel.app/](https://doajf-app.vercel.app/)**

---

## Índice

- [Deploy & Acesso](#-deploy--acesso)
- [Contexto do Projeto](#contexto-do-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Credenciais para Teste](#-credenciais-para-teste-área-administrativa)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)
- [Documentação](#-documentação)
- [Automação (CI/CD)](#-automação-cicd)
- [Autores](#autores)

---

## Contexto do Projeto

Este projeto atende ao **Tema 5: "Aplicativo de Gerenciamento de Doações da Prefeitura de Juiz de Fora"**. O principal desafio identificado foi a falta de um canal centralizado e eficiente para registrar e gerenciar doações, o que gerava alta carga cognitiva para os agentes sociais e barreiras para os doadores.

## Funcionalidades Principais

### 🧍‍♂️ Para Doadores (Página Pública)

- **Formulário de Doação Simplificado:** Registro rápido de nome, contato e quantidade.
- **Feedback Imediato e Motivador:** Mensagem de sucesso com estatísticas gerais.
- **Design Responsivo:** Acesso facilitado em qualquer dispositivo.

### 👮 Para Agentes Sociais (Painel Administrativo)

- **Acesso Restrito:** Autenticação segura por e-mail e senha.
- **Dashboard Centralizado:** Visualização, busca e filtro de todas as doações.
- **Gerenciamento de Status:** Atualização do ciclo de vida da doação (`Aguardando Contato`, `Coletada`, `Entregue`).
- **Painel de Análise:** Gráficos e métricas para tomada de decisão.

## 🔑 Credenciais para Teste (Área Administrativa)

Para facilitar a avaliação, um usuário de teste para o Agente Social (Persona André) já foi cadastrado no sistema.

**Acesse a página de login em: [https://doajf-app.vercel.app/login](https://doajf-app.vercel.app/login)**

| Email                     | Senha      |
| ------------------------- | ---------- |
| `andre.agente@pjf.gov.br` | `12345678` |

## Tecnologias Utilizadas

- **Frontend:** React, Vite
- **Estilização:** Tailwind CSS
- **Roteamento:** React Router DOM
- **Backend as a Service (BaaS):** Supabase (Auth, PostgreSQL, Edge Functions)
- **Gráficos:** Recharts

## Estrutura do Projeto
```
doajf-app/
├── .github/workflows/   # Workflows do GitHub Actions (CI)
├── docs/                # Arquivos fonte da documentação (Markdown)
├── src/                 # Código fonte da aplicação React
├── mkdocs.yml           # Arquivo de configuração do MkDocs
├── package.json
└── README.md
```

## Como Executar o Projeto Localmente
Siga os passos no [Guia de Desenvolvimento](https://danielportes.github.io/doajf-app/getting-started/) da documentação oficial.

## 📖 Documentação
A documentação completa do projeto, incluindo arquitetura e guias de uso, foi criada com MkDocs e está hospedada no GitHub Pages:

**[Acessar Documentação do Projeto](https://danielportes.github.io/doajf-app/)**

## 🤖 Automação (CI/CD)
- **Integração Contínua (CI):** Um workflow do [GitHub Actions](./.github/workflows/ci.yml) é executado a cada push ou pull request para o branch `main`. Ele instala as dependências, executa o linter (ESLint) e o build de produção para garantir a integridade do código.
- **Deploy Contínuo (CD):** O deploy da aplicação é gerenciado pela integração nativa do **Vercel** com o GitHub, publicando automaticamente qualquer alteração no branch `main`.

## Autores
- Daniel Fagundes - [GitHub](https://github.com/DanielPortes/)
