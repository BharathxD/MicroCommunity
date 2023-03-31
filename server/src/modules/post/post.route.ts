import express from "express";
import { createPostHandler, likePostHandler } from "./post.controller";
import upload from "../../utils/fileUpload";
import { LikePostSchema, PostSchema } from "./post.schema";
import { processRequestBody } from "zod-express-middleware";

const router = express.Router();

router.post(
  "/",
  processRequestBody(PostSchema.body),
  upload.single("picture"),
  createPostHandler
);

router.patch("/", processRequestBody(LikePostSchema.body), likePostHandler);

export default router;
