# mini-projeto

Node + TypeScript + Express + MongoDB + JWT
Arquitetura: controllers / services / models / middlewares / routes / database

## Como usar

1. Copie `.env.example` para `.env` e ajuste `MONGO_URI` e `JWT_SECRET`.
2. `npm install`
3. `npm run dev`
4. Teste as rotas pelo Insomnia/Postman usando `requests/requests.yaml`.

Rotas:
- POST /register
- POST /login
- GET /protected (Authorization: Bearer <token>)
