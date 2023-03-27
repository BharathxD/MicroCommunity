import Jwt, { SignOptions } from "jsonwebtoken";

export const signJwt = (
  payload: Buffer | object | string,
  options?: SignOptions
) => {
  const expiresIn = process.env.EXPIRES_IN;
  return Jwt.sign(payload, "signingKey", {
    ...(options && options),
    algorithm: "RS256",
    expiresIn: expiresIn,
  });
};
