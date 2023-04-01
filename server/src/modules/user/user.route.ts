import { Router } from "express";
import {
  connectionHandler,
  getUserConnectionsHandler,
  getUserHandler,
  registerUserHandler,
} from "./user.controller";
import upload from "../../utils/fileUpload";
import { processRequestBody } from "zod-express-middleware";
import { RegisterSchema } from "./user.schema";
import requireUser from "../../middlewares/requireUser";

const router = Router();

router.post(
  "/",
  processRequestBody(RegisterSchema.body),
  upload.single("picture"),
  registerUserHandler
);

router.get("/search/:userId", requireUser, getUserHandler);

router.get("/connections", requireUser, getUserConnectionsHandler);

router.get("/connections/:connectionId", requireUser, connectionHandler);

export default router;
