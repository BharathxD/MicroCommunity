import { Router } from "express";
import {
  connectionHandler,
  getAllUsersHandler,
  getUserConnectionsHandler,
  getUserHandler,
  registerUserHandler,
} from "./user.controller";
import upload from "../../utils/fileUpload";
import { processRequestBody } from "zod-express-middleware";
import { RegisterSchema } from "./user.schema";
import requireUser from "../../middlewares/requireUser";

const router = Router();

router.get("/", requireUser, (req, res) => {
  res.send(res.locals.user);
});

router.post(
  "/",
  upload.single("picture"),
  processRequestBody(RegisterSchema.body),
  registerUserHandler
);

router.get("/all", requireUser, getAllUsersHandler);

router.get("/search/:userId", requireUser, getUserHandler);

router.get("/connections/:userId", requireUser, getUserConnectionsHandler);

router.patch("/connections/:connectionId", requireUser, connectionHandler);

export default router;
