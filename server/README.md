# MicroCommunity Server

This has been built with scalability in mind

### Routes

| Routes      | Path           |
| ----------- | -------------- |
| Users Route | `/api/user`    |
| Posts Route | `/api/post`    |
| Auth Routes | `/api/auth`    |
| HealthCheck | `/healthcheck` |

### Backend Dependencies

```bash
    npm install --save express @typegoose/typegoose@10.3.0 argon2 express@4.18.2 zod zod-express-middleware cors dotenv helmet http-status-codes jsonwebtoken lodash cookie-parser pino multer
```

### Backend Development Dependencies

```bash
    npm install --save-dev @types/express @types/node @types/cors @types/jsonwebtoken @types/lodash pino-pretty @types/cookie-parser ts-node-dev typescript @types/multer
```
