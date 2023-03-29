import jwt, {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
import { privateKey, publicKey } from "../../utils/pemToString";

type JwtPayload = Object | Buffer | string;

export class JWTService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor() {
    try {
      // Load the keys from files and store them in memory
      this.privateKey = Buffer.from(privateKey).toString();
      this.publicKey = Buffer.from(publicKey).toString();
    } catch (error: any) {
      throw new Error(
        `Failed to load JWT key files: ${error.message}. \nPlease generate public and private key pairs.`
      );
    }
  }

  generateToken(payload: JwtPayload): string {
    try {
      const EXPIRES_IN = process.env.EXPIRES_IN;
      const options: jwt.SignOptions = {
        algorithm: "RS256",
        expiresIn: EXPIRES_IN,
      };
      return jwt.sign(payload, this.privateKey, options);
    } catch (err) {
      throw new Error("Failed to generate JWT token.");
    }
  }

  verifyToken(token: string): JwtPayload {
    try {
      const options: jwt.VerifyOptions = {
        algorithms: ["RS256"],
      };
      return jwt.verify(token, this.publicKey, options) as JwtPayload;
    } catch (err) {
      if (err instanceof JsonWebTokenError) {
        throw new Error("Invalid JWT token.");
      } else if (err instanceof NotBeforeError) {
        throw new Error("JWT token not yet valid.");
      } else if (err instanceof TokenExpiredError) {
        throw new Error("JWT token has expired.");
      } else {
        throw new Error("Failed to verify JWT token.");
      }
    }
  }
}

export default JWTService;
