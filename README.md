# Refatoração da API de Agendamento de Consultas

## Contexto
A API foi desenvolvida em um momento inicial de aprendizado, utilizando Prisma, Sequelize, MongoDB, JWT, Nodemailer, Swagger, entre outras ferramentas.
Com o crescimento do projeto e a necessidade de alinhar com boas práticas de mercado, foi identificada a necessidade de uma refatoração completa da arquitetura e stack, visando escalabilidade, segurança e manutenibilidade.

---

## Objetivos da Refatoração
- Padronizar o stack, eliminando redundâncias (ex.: Prisma + Sequelize juntos) e adotando tecnologias mais atuais.
- Reestruturar a arquitetura em camadas claras (controllers, services, repositories, middlewares).
- Melhorar segurança: autenticação JWT com refresh tokens e rotação segura, criptografia com Argon2, Helmet, CORS, rate limiting.
- Adicionar validações robustas com Zod para inputs em todas as rotas.
- Garantir consistência nos agendamentos, evitando conflitos de horários com transações e validação de sobreposição.
- Aprimorar documentação com OpenAPI 3 e Swagger UI/Redoc.
- Melhorar observabilidade com logs estruturados, tratamento centralizado de erros e integração futura com Sentry/Prometheus.
- Automatizar qualidade: testes (unitários, integração e e2e), ESLint + Prettier, Husky, Commitlint e CI/CD.
- Preparar para deploy moderno com Docker, docker-compose, integração com Nginx e escalabilidade futura em Kubernetes/Cloud.

---

## Stack Atualizado
- Backend: Node.js + Express
- Banco de Dados: PostgreSQL + Prisma (ORM)
- Autenticação: JWT (access + refresh tokens com rotação)
- Criptografia: Argon2
- Validação: Zod
- Documentação: OpenAPI 3 + Swagger UI
- Logs: Pino
- Testes: Jest + Supertest
- CI/CD: GitHub Actions + Husky + Lint-staged + Commitlint
- Deploy: Docker + docker-compose (Nginx como proxy reverso em produção)
- Segurança: Helmet, CORS configurado, express-rate-limit, cookies HttpOnly/Secure

---

---

## Plano de Refatoração (Fases)
1. Banco & ORM
   - Remover Sequelize
   - Padronizar uso do Postgres + Prisma
   - Criar schema inicial com migrações

2. Arquitetura
   - Reestruturar pastas em camadas limpas
   - Isolar controllers, services e repositories

3. Autenticação
   - Implementar JWT (access + refresh) com rotação
   - Guardar hash de refresh tokens no banco
   - Logout seguro e expiração configurada

4. Validação
   - Adicionar middlewares de validação com Zod
   - Documentar schemas principais (User, Appointment, Availability)

5. Agendamento
   - Implementar regra de prevenção de sobreposição (transações e checagem de horários)

6. Erros & Logs
   - Middleware global de erros
   - Logger com Pino
   - Integração futura com Sentry

7. Documentação
   - Configurar Swagger (OpenAPI 3)
   - Documentar rotas críticas (auth, appointments, users)

8. Segurança
   - Helmet, CORS, rate limiting, cookies seguros
   - Validação de variáveis de ambiente

9. Testes
   - Unitários (services)
   - Integração (repositories)
   - E2E (rotas com Supertest)

10. CI/CD
    - ESLint + Prettier + Husky + Commitlint
    - GitHub Actions para testes e lint

11. Deploy
    - Configurar Dockerfile e docker-compose
    - Preparar ambiente para produção (Nginx, HTTPS)

---


