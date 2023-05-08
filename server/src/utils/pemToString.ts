import fs from "fs";
import path from "path";
import logger from "./logger";

const certsDir = path.join(__dirname, "..", "..", "certs");

let privateKey: Buffer;
let publicKey: Buffer;

try {
    privateKey = fs.readFileSync(path.join(certsDir, "private_pekey.pem"));
    publicKey = fs.readFileSync(path.join(certsDir, "public_key.pem"));
} catch (err) {
    logger.error(err, "Failed to read certificate files");
    process.exit(1);
}

export { privateKey, publicKey };
