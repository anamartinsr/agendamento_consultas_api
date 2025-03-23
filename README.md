# API de Gestão de Consultas

## Descrição

Uma API construída com **Node.js** para gerenciar cadastro de clientes e profissionais, agendamento de consultas, gerenciamento de disponibilidade, cancelamentos e histórico de consultas. Utilizando **Prisma** como ORM e seguindo os princípios de **Arquitetura Limpa**, separando a lógica de negócios da lógica de banco de dados.

## Tecnologias Utilizadas

### Linguagens e Frameworks
- **Node.js**
- **Express**

### Gerenciamento de Banco de Dados
- **Prisma**
- **MongoDB**

### Ferramentas de Desenvolvimento
- **ESLint** e **@eslint/js** para linting
- **Nodemon** para recarregamento automático
- **Sucrase** para suporte a ES Modules
- **Husky** para padronização do código

### Outras Dependências
- **bcryptjs**: Para hashing de senhas
- **cors**: Para configurar o acesso CORS
- **dotenv**: Para gerenciar variáveis de ambiente
- **jsonwebtoken**: Para autenticação com JWT

## Estrutura do Projeto

```plaintext
src/
├── controllers/    
├── service/      
├── middlewares/    
├── routes/        
```

## Funcionalidades

### 1. Cadastro e Associação
- **Administrador** cadastra clientes e profissionais.
- Identificação do tipo de usuário via `tipoUser`.

### 2. Agendamento de Consultas
- Clientes podem agendar consultas preenchendo um formulário com:
  - `descricao`
  - `profissional`
  - `especialidade`
  - `procedimento`
  - `valor`
  - `data`
  - `recomendacao`

### 3. Disponibilidade do Profissional
- Gerenciamento de horários disponíveis.
- Status `DISPONIVEL` para horários livres e `RESERVADA` para agendamentos confirmados.

### 4. Cancelamento de Consultas
- Regras de cancelamento:
  - Cliente: até 2 dias antes.
  - Profissional: até 4 dias antes.
- Atualização do status da consulta para `CANCELADA`.

### 5. Histórico de Consultas
- Visualização do histórico de consultas para clientes e profissionais.

### 6. Perfil do Usuário
- Edição de informações pessoais de clientes e profissionais.

## Como Rodar o Projeto

### Requisitos
- Node.js (versão 18+)
- MongoDB

### Configuração
1. Clone o repositório:
   ```bash
   git clone https://github.com/ribbeiroana/agendamento_consultas_api.git
   cd agendamento_consultas_api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   DATABASE_URL=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<database>
   JWT_SECRET=sua-chave-secreta
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Scripts Disponíveis
- `npm run dev`: Inicia o servidor em modo de desenvolvimento com **nodemon**.
- `npm run lint`: Verifica a formatação do código com **ESLint**.
- `npm run build`: Compila o código para produção com **Sucrase**.

## Contribuição
Contribuições são bem-vindas! Por favor, siga as diretrizes do projeto e mantenha a padronização do código utilizando **Husky** e **ESLint**.
