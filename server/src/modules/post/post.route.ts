import express from "express";
import { createPostHandler, likePostHandler } from "./post.controller";
import upload from "../../utils/fileUpload";
import { PostSchema } from "./post.schema";
import { processRequestBody } from "zod-express-middleware";

const router = express.Router();

router.post(
  "/",
  processRequestBody(PostSchema.body),
  upload.single("picture"),
  createPostHandler
);

router.patch("/", likePostHandler);

export default router;
