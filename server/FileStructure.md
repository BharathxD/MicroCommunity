## Server Side Folder Structure

``` bash
|-- server
    |-- .env
    |-- README.md
    |-- package-lock.json
    |-- package.json
    |-- tsconfig.json
    |-- certs
    |   |-- README.md
    |   |-- private_key.pem
    |   |-- public_key.pem
    |-- public
    |   |-- assets
    |       |-- ...
    |-- src
        |-- index.ts
        |-- routes.ts
        |-- config
        |   |-- config.ts
        |   |-- gracefulShutdown.ts
        |-- middlewares
        |   |-- deserializeUser.ts
        |   |-- requireUser.ts
        |-- modules
        |   |-- auth
        |   |   |-- auth.controller.ts
        |   |   |-- auth.route.ts
        |   |   |-- auth.schema.ts
        |   |   |-- auth.utils.ts
        |   |-- post
        |   |   |-- post.controller.ts
        |   |   |-- post.model.ts
        |   |   |-- post.route.ts
        |   |   |-- post.schema.ts
        |   |   |-- post.service.ts
        |   |-- user
        |       |-- user.controller.ts
        |       |-- user.model.ts
        |       |-- user.route.ts
        |       |-- user.schema.ts
        |       |-- user.service.ts
        |-- utils
            |-- connect.ts
            |-- fileUpload.ts
            |-- logger.ts
            |-- pemToString.ts
```