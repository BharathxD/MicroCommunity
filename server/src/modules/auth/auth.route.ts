import { Router } from "express";
import { processRequestBody } from "zod-express-middleware";
import { LoginSchema } from "./auth.schema";
import { loginUserHandler } from "./auth.controller";

const router = Router();

router.post("/", processRequestBody(LoginSchema.body), loginUserHandler);

export default router;
