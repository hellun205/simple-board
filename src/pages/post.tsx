import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../App";

interface Props {
  findById(id: number): Post | undefined;
  addView(id: number): void;
}

const PostPage: FC<Props> = ({ findById, addView }) => {
  const { id } = useParams();
  const postId = parseInt(id || "0");
  const post = findById(postId);

  useEffect(() => {
    if (!post) return;
    addView(postId);
  }, []);

  return post ? (
    <div>
      <div>
        <h2>{post.title}</h2>
        <div>{post.view}</div>
      </div>
      <div>{post.author}</div>
      <div>{post.content}</div>
      <div>
        <div>{post.like}</div>
        <div>{post.dislike}</div>
      </div>
    </div>
  ) : (
    <h1>error</h1>
  );
};

export default PostPage;
