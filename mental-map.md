# API de Gerenciamento de Tarefas

## 1. Usuários
- Cadastro
  - Endpoint: `POST /users`
  - Campos: Nome, E-mail, Senha
- Login
  - Endpoint: `POST /auth/login`
  - Retorno: Token JWT
- Perfil
  - Endpoint: `GET /users/@me`
  - Requer autenticação

## 2. Tarefas
- Criar tarefa
  - Endpoint: `POST /tasks`
  - Campos: Título, Descrição, Status (pendente/concluída)
  - Requer autenticação
- Listar tarefas
  - Endpoint: `GET /tasks`
  - Parâmetros: Filtro por status, Paginação
  - Requer autenticação
- Atualizar tarefa
  - Endpoint: `PUT /tasks/:id`
  - Requer autenticação
- Deletar tarefa
  - Endpoint: `DELETE /tasks/:id`
  - Requer autenticação

## 3. Banco de Dados
- Tabelas:
  - `users`
    - Campos: id, name, email, password_hash, created_at
  - `tasks`
    - Campos: id, title, description, status, user_id, created_at

## 4. Tecnologias
- Backend: Fastify ou Express.js
- Banco de Dados: PostgreSQL (com Prisma ou Sequelize)
- Autenticação: JWT
- Testes: Jest

## 5. Extensões
- Logs de atividades (auditoria)
- Notificações por e-mail (ao criar ou concluir uma tarefa)
- Documentação com Swagger