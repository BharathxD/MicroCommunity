import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/state/auth";
import PostWidget from "./PostWidget";
import { Post, ReduxState } from "@/types/state.types";
import { getPosts } from "@/api/post.api";

type Props = {
  userId: string;
  isProfile: boolean;
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
    <>
      {posts.map(
        ({
          _id,
          userId,
          fname,
          lname,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${fname} ${lname}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
