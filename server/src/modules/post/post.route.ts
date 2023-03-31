import express from "express";
import requireUser from "../../middlewares/requireUser";
import upload from "../../utils/fileUpload";
import { postSchema, likePostParams } from "./post.schema";
import {
  createPostHandler,
  getFeedPostsHandler,
  getUserPostsHandler,
  likePostHandler,
} from "./post.controller";
import {
  processRequestBody,
  processRequestParams,
} from "zod-express-middleware";

const router = express.Router();

//? Get all posts for feed
router.get("/", requireUser, getFeedPostsHandler);

//? Get all posts by a specific user
router.get("/:userId/posts", requireUser, getUserPostsHandler);

//? Create a new post
router.post(
  "/",
  requireUser,
  upload.single("picture"),
  processRequestBody(postSchema),
  createPostHandler
);

//? Like or dislike a post
router.patch(
  "/like/:postId",
  requireUser,
  processRequestParams(likePostParams),
  likePostHandler
);

export default router;
