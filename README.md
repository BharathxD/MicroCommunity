# Community

### Backend Dependencies

```bash
    npm install --save express @typegoose/typegoose@10.3.0 argon2 express@4.18.2 zod zod-express-middleware cors dotenv helmet http-status-codes jsonwebtoken lodash cookie-parser pino
```

## Backend Development Dependencies

```bash
    npm install --save-dev @types/express @types/node @types/cors @types/jsonwebtoken @types/lodash pino-pretty @types/cookie-parser ts-node-dev typescript
```
## Generate Encryption Keys

Change to project's root directory and execute the following command

```bash
    cd server && mkdir certss && cd certss && openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096 && openssl rsa -in private_key.pem -pubout -out public_key.pem
```