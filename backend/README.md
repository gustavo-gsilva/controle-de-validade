# Informações do Back-End

## Padrões adotados

O backend do projeto segue uma separação de responsabilidades baseada em camadas, com o objetivo de manter o código mais organizado, legível e fácil de manter.

### Controllers
Os controllers são responsáveis por lidar diretamente com as requisições HTTP. Eles recebem os dados da request, chamam os serviços necessários e retornam a resposta adequada ao cliente.

Nesta camada ficam:
- Leitura de `req` e escrita de `res`
- Definição de status HTTP
- Tratamento de erros e mensagens de resposta

### Services
Os services concentram a lógica de negócio da aplicação. Eles são responsáveis por executar as regras do sistema e realizar a comunicação com o banco de dados através do Prisma.

Nesta camada ficam:
- Regras de negócio
- Operações de criação, leitura, atualização e remoção de dados
- Interação com o ORM Prisma

### Validators
Os validators são responsáveis por validar e sanitizar os dados recebidos antes que eles sejam processados pela aplicação. Essa camada ajuda a garantir que apenas dados válidos cheguem aos services.

Nesta camada ficam:
- Validação de campos obrigatórios
- Verificação de tipos e formatos
- Normalização de dados (ex: `trim` em strings)

## Modelo de dados

O sistema é estruturado em dois modelos principais: **Product** e **Batch**, responsáveis por representar os produtos e seus respectivos lotes.

### Product
Representa o produto em si, contendo as informações principais utilizadas para identificação e organização.

Campos principais:
- `id` – Identificador único do produto
- `name` – Nome do produto
- `brand` – Marca do produto
- `category` – Categoria do produto
- `code` – Código opcional do produto
- `created_at` – Data de criação do registro
- `updated_at` – Data da última atualização

### Batch
Representa os lotes de um produto, permitindo o controle individual de validade e entrada no estoque.

Campos principais:
- `id` – Identificador único do lote
- `product_id` – Referência ao produto
- `batch_code` – Código do lote
- `expiration_date` – Data de validade
- `entry_date` – Data de entrada do lote
- `status` – Status do lote
- `created_at` – Data de criação do registro
- `updated_at` – Data da última atualização

### Relacionamento
- Um **Product** pode possuir vários **Batch**
- Cada **Batch** pertence a apenas um **Product**

Esse modelo permite um controle mais preciso da validade dos produtos, já que um mesmo produto pode possuir múltiplos lotes com datas de vencimento diferentes.

## Estrutura de pastas

A estrutura do backend foi organizada seguindo a separação de responsabilidades, facilitando a manutenção, leitura e evolução do código.

```text
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── validators/
│   ├── routes/
│   ├── utils/
│   └── lib/
│       └── prisma.ts
├── package.json
└── tsconfig.json
```
- facilita testes futuros
- evita controllers inchados
- deixa claro onde cada responsabilidade deve ficar
- ajuda qualquer pessoa a entender o projeto rapidamente

## Como rodar o backend localmente

### Pré-requisitos
Antes de iniciar o projeto, é necessário ter instalado na máquina:
- Node.js
- PostgreSQL
- npm ou yarn

### Passos para execução

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
```

2. Acesse a pasta do backend:
```bash
cd backend
```

3. Instale as dependências:
```bash
npm install
```

4. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do backend e configure a conexão com o banco de dados:
```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

5. Execute as migrations do Prisma:
```bash
npx prisma migrate dev
```

6. Inicie o servidor:
```bash
npm run dev
```

