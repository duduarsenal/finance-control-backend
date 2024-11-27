# Finance Control - Backend

## Descrição
**Finance Control** é uma API desenvolvida em **Node.js** com **Express** e **TypeScript**. O projeto tem como objetivo principal gerenciar e controlar um sistema de controle finance pessoal, oferecendo uma solução robusta e segura para armazenamento e manipulação dos dados.

---

## Tecnologias
### Linguagens e Frameworks
- **Node.js**
- **Express**
- **TypeScript**

### Banco de Dados e ORM
- **MongoDB Atlas**
- **Prisma ORM**

### Segurança
- **JWT**: Para autenticação e geração de tokens.
- **BCrypt**: Para criptografia e validação de senhas.
- **ROLES**: Camada extra de segurança para proteger algumas rotas.

## Validação e Tratamento de Erros
- **Zod**: Para validações de entrada e tratamento de erros estruturados.
- Utilitários para capturar e manipular exceptions (como as **JWT**, **Zod** e **outras do sistema**).

---

## Estrutura do Projeto
O projeto possui a seguinte arquitetura junto das seguintes camadas:
- **Controllers**: Gerenciam as requisições e respostas.
- **Services**: Implementam a lógica do sistema (validações, manipulações nos dados).
- **Business**: Validam mais minuciosamente todos dados recebidos.
- **Repositories**: Manipulação dos dados no banco.
- **Middlewares**: Interceptam requisições para autenticação, validação de roles e manipulação de erros do sistema.

---

## Foco Principal
O foco do projeto é:
- Criar uma API com uma estrutura limpa.
- Implementar boas práticas de desenvolvimento desde a primeira linha de código.
- Garantir o máximo de segurança no armazenamento e manipulação de dados financeiros e dados de login.

---

## Instalação do Projeto
1. Clone o repositório:
   ```bash
   git clone https://github.com/duduarsenal/finance-control-backend.git

   cd finance-control-backend
2. Instalação das dependências
    ```bash
    npm install
3. Configure as variaveis de ambiente
    ```bash
    Crie um arquivo .env com as configurações necessárias (exemplo disponível no repositório)
4. Inicialização do banco de dados, com suas tabelas e relações
    ```bash
    npx prisma db push
5. Inicialização da Aplicação
    ```bash
    npm run dev
