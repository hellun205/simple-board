import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../App";
import classNames from "classnames/bind";
import styles from "../styles/post.module.css";

const cx = classNames.bind(styles);

interface Props {
  findById(id: number): Post | undefined;
  addView(id: number): void;
  addLike(id: number): void;
  addDisLike(id: number): void;
}

const PostPage: FC<Props> = ({ findById, addView, addLike, addDisLike }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = parseInt(id || "0");
  const post = findById(postId);

  useEffect(() => {
    if (!post) return;
    addView(postId);
  }, []);

  return post ? (
    <div>
      <div className={cx("title-wrapper")}>
        <h2 className={cx("title")}>{post.title}</h2>
        <div className={cx("view")}>조회수: {post.view}</div>
      </div>
      <div className={cx("author")}>작성자: {post.author}</div>
      <hr className={cx("line")}></hr>
      <div className={cx("content-text")}>{post.content}</div>
      <hr className={cx("line")}></hr>
      <div className={cx("like-wrapper")}>
        <button
          className={cx("like-buttons", "like-btn")}
          onClick={() => {
            addLike(postId);
          }}
        >
          <div className={cx("like-value", "like")}>{post.like}</div>
          좋아요
        </button>
        <button
          className={cx("like-buttons", "dislike-btn")}
          onClick={() => {
            addDisLike(postId);
          }}
        >
          <div className={cx("like-value", "dislike")}>{post.dislike}</div>
          싫어요
        </button>
      </div>
      <div className={cx("go-back-wrapper")}>
        <button
          className={cx("go-back-button")}
          onClick={() => {
            navigate("/");
          }}
        >
          목록으로
        </button>
      </div>
    </div>
  ) : (
    <h1>error</h1>
  );
};

export default PostPage;
