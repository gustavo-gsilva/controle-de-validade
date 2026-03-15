# Informações do Front-End

## Padrões adotados

O frontend do projeto segue uma organização baseada em componentização e separação de responsabilidades, com o objetivo de manter o código mais organizado, reutilizável e fácil de evoluir.

A aplicação é construída utilizando React com TypeScript, consumindo a API do backend para exibir e gerenciar os dados do sistema de controle de validades.

## Pages

As pages representam as páginas principais da aplicação e geralmente estão associadas às rotas do sistema.

Nesta camada ficam:

- Estrutura geral da página

- Organização dos componentes

- Chamadas para hooks ou serviços responsáveis por buscar dados

## Components

Os components são partes reutilizáveis da interface. Eles representam elementos da UI que podem ser utilizados em diferentes partes da aplicação.

Nesta camada ficam:

- Componentes visuais reutilizáveis

- Estruturas de layout

- Componentes de interface como cards, tabelas, botões e inputs

## Services

Os services são responsáveis por centralizar as chamadas para a API do backend. Essa camada evita que as requisições HTTP fiquem espalhadas pelo projeto.

Nesta camada ficam:

- Configuração do cliente HTTP

- Funções para consumir endpoints da API

- Organização das requisições por recurso (ex: products, batches)

## Hooks

Os hooks são responsáveis por encapsular lógicas reutilizáveis da aplicação, principalmente relacionadas a estado e comunicação com a API.

Nesta camada ficam:

- Lógica de busca de dados

- Controle de estados de carregamento

- Tratamento de erros

- Reutilização de lógica entre componentes

## Utils

A pasta utils contém funções auxiliares utilizadas em diferentes partes do projeto.

Nesta camada ficam:

- Funções de formatação de datas

- Helpers de manipulação de dados

- Funções utilitárias gerais

## Integração com o Backend

O frontend se comunica com o backend através de uma API REST responsável por gerenciar os dados do sistema.

As principais entidades consumidas pela aplicação são:

- Product – Representa os produtos cadastrados no sistema

- Batch – Representa os lotes associados aos produtos

Esses dados são utilizados para construir funcionalidades como:

- Cadastro de produtos

- Cadastro de lotes

- Visualização de produtos

- Monitoramento de validade de lotes

- Dashboard com informações gerais do sistema

## Estrutura de pastas

A estrutura do frontend foi organizada buscando manter separação clara entre interface, lógica e comunicação com a API.

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── assets/
├── public/
├── package.json
└── tsconfig.json
```

Essa organização ajuda a:

- Manter componentes reutilizáveis

- Evitar lógica duplicada

- Separar interface de regras de dados

- Facilitar manutenção e crescimento do projeto

## Como rodar o frontend localmente

Pré-requisitos

Antes de iniciar o projeto, é necessário ter instalado na máquina:

- Node.js

- npm ou yarn

Passos para execução

Clone o repositório:

```bash
git clone <https://github.com/gustavo-gsilva/controle-de-validade>
```

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Configure a URL da API:

Crie um arquivo .env na raiz do frontend e configure a URL do backend:

- VITE_API_URL=http://localhost:3000

Inicie o projeto:

npm run dev


Após iniciar o servidor de desenvolvimento, a aplicação poderá ser acessada no navegador através do endereço exibido no terminal.