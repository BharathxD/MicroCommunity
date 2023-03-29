import { Router } from "express";
import { registerUserHandler } from "./user.controller";
import upload from "../../utils/fileUpload";
import { processRequestBody } from "zod-express-middleware";
import { RegisterSchema } from "./user.schema";

const router = Router();

router.post(
  "/",
  processRequestBody(RegisterSchema.body),
  upload.single("picture"),
  registerUserHandler
);

export default router;
