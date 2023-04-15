import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/state/auth";
import PostWidget from "./PostWidget";
import { Post, ReduxState } from "@/types/state.types";
import { getPosts } from "@/api/post.api";

type Props = {
  userId?: string;
  isProfile?: boolean;
};

const PostsWidget = ({ userId, isProfile = false }: Props) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: ReduxState) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts: Post[] | null = await (isProfile
          ? getPosts(userId)
          : getPosts());
        dispatch(setPosts({ posts }));
      } catch (error) {
        console.error(error);
        // TODO: handle the error, for example by displaying an error message to the user
      }
    };
    fetchPosts();
  }, [dispatch, isProfile, userId]);
  return (
    <Fragment>
      {posts &&
        posts.length >= 0 &&
        posts.map((post: Post) => (
          <PostWidget
            key={post._id}
            postId={post._id}
            postUserId={post.userId}
            name={`${post.fname} ${post.lname}`}
            description={post.description}
            location={post.location}
            picturePath={post.picturePath}
            userPicturePath={post.userPicturePath}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
    </Fragment>
  );
};

export default PostsWidget;
