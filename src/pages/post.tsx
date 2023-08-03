import { FC } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../App";

interface Props {
  findById(id: number): Post | undefined;
}

const PostPage: FC<Props> = ({ findById }) => {
  const { id } = useParams();
  const postId = parseInt(id || "0");
  const post = findById(postId);

  if (!post) {
    return <h1>error 404</h1>;
  }

  return (
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
  );
};

export default PostPage;
