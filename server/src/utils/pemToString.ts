import fs from "fs";

export const privateKey = fs.readFileSync("./certs/private_key.pem");
export const publicKey = fs.readFileSync("./certs/public_key.pem");
