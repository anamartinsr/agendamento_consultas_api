# Refatoração da API de Agendamento de Consultas

## Contexto
A API foi desenvolvida em um momento inicial de aprendizado, utilizando Prisma, MongoDB, JWT, Nodemailer, Swagger, entre outras ferramentas.
Com o crescimento do projeto e a necessidade de alinhar com boas práticas de mercado, foi identificada a necessidade de uma refatoração completa da arquitetura e stack, visando escalabilidade, segurança e manutenibilidade.

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

## 🔄 Atualização de Modelagem

Durante a etapa de análise e modelagem, o esquema inicial foi **refatorado** após identificar inconsistências relacionadas ao armazenamento de documentos e à flexibilidade da agenda dos profissionais.

As principais mudanças foram:

- **Remoção do campo de documento de identificação (CPF/RG)**, pois o envio físico ocorre presencialmente.
- **Implementação de upload para documentos médicos**, como **exames, receitas e relatórios**.
- **Substituição do campo `password` por `passwordHash`**, garantindo **criptografia de senhas**.
- **Ajuste no controle de agenda**, permitindo:
  - **dias fixos de atendimento** (agenda semanal padrão);
  - **exceções de disponibilidade** (férias, ausência, bloqueio temporário).
- **Manutenção do escopo para uma única clínica/hospital**, mas com estrutura flexível para expansão futura.

---

## Regras de Negócio

### Usuário (Paciente)
- Realiza o cadastro e pode atualizar seu perfil com dados básicos e médicos.
- As senhas são **armazenadas de forma criptografada** (`passwordHash`).
- Pode **agendar consultas presenciais** apenas em horários disponíveis.
- Pode **enviar documentos médicos** (exames, receitas, relatórios) associados às consultas.
- Pode **cancelar consultas** enquanto estiverem nos status `PENDING` ou `ACCEPTED`.
- Visualiza:
  - **Consultas futuras** (status diferente de `COMPLETED`)
  - **Histórico de consultas concluídas**

---

### Profissional (Médico)
- Possui uma **agenda fixa semanal** definida no banco (`Availability`).
- Pode ter **exceções** de atendimento (`ScheduleException`), como:
  - férias;
  - afastamentos;
  - bloqueios temporários.
- Recebe solicitações de agendamento com status inicial `PENDING`.
- Pode:
  - **Aceitar** (`ACCEPTED`);
  - **Recusar** (`REJECTED`);
  - **Concluir** consultas (`COMPLETED`).
- Todas as ações são registradas em **histórico de agendamentos** (`AppointmentHistory`).

---

### Agendamento de Consultas
**Fluxo de criação:**
1. O paciente seleciona o profissional e o horário desejado.  
2. O sistema valida:
   - se o profissional existe e está ativo;
   - se o horário pertence à sua disponibilidade semanal;
   - se não há **exceções de ausência**;
   - se não existe outro agendamento no mesmo horário.
3. Cria a consulta com status inicial `PENDING`.
4. O profissional recebe a solicitação e pode **aceitar** ou **rejeitar**.

**Atualizações:**
- Mudanças de status (aceite, cancelamento, conclusão) geram um novo registro em `AppointmentHistory`, com:
  - autor da ação (usuário ou profissional),
  - status anterior e novo status,
  - data e hora da alteração.

---

### Documentos Médicos
- São armazenados em `MedicalDocument`, vinculados ao usuário e, opcionalmente, a uma consulta específica.
- Cada documento possui:
  - título;
  - tipo (`EXAM`, `PRESCRIPTION`, `REPORT`);
  - URL do arquivo;
  - data de upload.
- O backend armazena apenas o **link do arquivo**, não o binário, seguindo boas práticas de segurança e armazenamento em nuvem.

---

##  Segurança e Boas Práticas
- **Senhas criptografadas**: nunca armazenadas em texto puro.  
- **Controle de acesso baseado em papéis** (`ADMIN`, `USER`, `PROFESSIONAL`).  
- **Histórico auditável**: toda mudança de status é registrada.  
- **Uploads protegidos**: validação de formato e tamanho de arquivo.  
- **Escalabilidade futura**: o modelo permite expansão para múltiplas clínicas sem grandes alterações estruturais.

---

##  Estrutura de Entidades

| Entidade | Finalidade | Relações principais |
|-----------|-------------|--------------------|
| `User` | Todos os tipos de usuário (paciente, profissional, admin) | `Professional`, `Appointment`, `MedicalDocument` |
| `Professional` | Dados e agenda do médico | `User`, `Specialty`, `Availability`, `ScheduleException` |
| `Specialty` | Especialidades médicas | `Professional` |
| `Availability` | Agenda fixa semanal | `Professional` |
| `ScheduleException` | Períodos de ausência/férias | `Professional` |
| `Appointment` | Consulta agendada | `User`, `Professional`, `AppointmentHistory` |
| `AppointmentHistory` | Registro de ações e mudanças de status | `Appointment`, `User`, `Professional` |
| `MedicalDocument` | Exames, receitas e relatórios digitais | `User`, `Appointment` |

---



---


