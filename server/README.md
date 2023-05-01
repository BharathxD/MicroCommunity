# MicroCommunity Server

This has been built with scalability in mind

### Routes

| Routes      | Path        |
| ----------- | ----------- |
| Users Route | `/api/user` |
| Posts Route | `/api/post` |
| Auth Routes | `/api/auth` |
| HealthCheck | `/`         |

## File Structure

Click [`here`](./FileStructure.md) to view the file structure for the Server

## Generate Encryption Keys

Change to the project's root directory and execute the following bash command

```bash
    cd server && mkdir certs && cd certs && openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096 && openssl rsa -in private_key.pem -pubout -out public_key.pem
```

### Backend Dependencies

```bash
    npm install --save express @typegoose/typegoose@10.3.0 argon2 express@4.18.2 zod zod-express-middleware cors dotenv helmet http-status-codes jsonwebtoken lodash cookie-parser pino multer
```

```bash
    npm install --save-dev @types/express @types/node @types/cors @types/jsonwebtoken @types/lodash pino-pretty @types/cookie-parser ts-node-dev typescript @types/multer
```
