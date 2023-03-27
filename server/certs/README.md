## Generate Encryption Keys

Change to the project's root directory and execute the following bash command

```bash
    cd server && mkdir certs && cd certs && openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096 && openssl rsa -in private_key.pem -pubout -out public_key.pem
```
