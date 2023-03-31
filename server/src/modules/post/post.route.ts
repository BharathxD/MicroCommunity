import express from "express";
import requireUser from "../../middlewares/requireUser";
import upload from "../../utils/fileUpload";
import { PostSchema, LikePostSchema } from "./post.schema";
import {
  createPostHandler,
  getFeedPostsHandler,
  getUserPostsHandler,
  likePostHandler,
} from "./post.controller";
import { processRequestBody } from "zod-express-middleware";

const router = express.Router();

// Get all posts for feed
router.get("/", requireUser, getFeedPostsHandler);

// Get all posts by a specific user
router.get("/:userId/posts", requireUser, getUserPostsHandler);

// Create a new post
router.post(
  "/",
  requireUser,
  upload.single("picture"),
  processRequestBody(PostSchema.body),
  createPostHandler
);

// Like or dislike a post
router.patch(
  "/:postId",
  requireUser,
  processRequestBody(LikePostSchema.body),
  likePostHandler
);

export default router;
