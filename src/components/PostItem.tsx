import { FC } from "react";
import { Post } from "../App";
import classNames from "classnames/bind";
import styles from "../styles/PostItem.module.css";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

interface Props {
  post: Post;
}

const PostItem: FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cx("box", {
        bold: post.id === "ID",
        select: post.id !== "ID",
      })}
      onClick={() => {
        if (post.id !== "ID") {
          navigate(`/post/${post.id}`);
        }
      }}
    >
      <div className={cx("id")}>{post.id}</div>
      <div className={cx("title")}>{post.title}</div>
      <div className={cx("author")}>{post.author}</div>
      <div className={cx("view")}>{post.view}</div>
      <div className={cx("like")}>{post.likes}</div>
    </div>
  );
};

export default PostItem;
