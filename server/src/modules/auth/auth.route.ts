import { Router } from "express";
import { processRequestBody } from "zod-express-middleware";
import { LoginSchema } from "./auth.schema";
import { loginUserHandler, logoutHandler } from "./auth.controller";

const router = Router();

router.post("/login", processRequestBody(LoginSchema.body), loginUserHandler);

router.post("/logout", logoutHandler);

export default router;
