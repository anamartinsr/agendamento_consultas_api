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
- **jsonwebtoken**: Para autenticação com JWT

## Estrutura do Projeto

```plaintext
src/
├── controllers/    
├── service/      
├── middlewares/    
├── routes/        
```
