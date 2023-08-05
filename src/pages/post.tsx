import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../App";
import classNames from "classnames/bind";
import styles from "../styles/post.module.css";

const cx = classNames.bind(styles);

interface Props {
  findById(id: number): Promise<Post | undefined>;
  addView(id: number): void;
  addLike(id: number): void;
  addDisLike(id: number): void;
}

const PostPage: FC<Props> = ({ findById, addView, addLike, addDisLike }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = parseInt(id || "0");

  const [post, setPost] = useState<Post | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [is404, setIs404] = useState(false);
  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);

  if (!isLoaded) {
    setIsLoaded(true);
    findById(postId).then((p) => {
      if (p) {
        setLike(p.likes as number);
        setDisLike(p.dislikes as number);
        setPost(p);
      } else {
        setIs404(true);
      }
    });
  }

  useEffect(() => {
    if (is404) return;
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
            setLike(like + 1);
            addLike(postId);
          }}
        >
          <div className={cx("like-value", "like")}>{like}</div>
          좋아요
        </button>
        <button
          className={cx("like-buttons", "dislike-btn")}
          onClick={() => {
            setDisLike(dislike + 1);
            addDisLike(postId);
          }}
        >
          <div className={cx("like-value", "dislike")}>{dislike}</div>
          싫어요
        </button>
      </div>
      <div className={cx("go-back-wrapper")}>
        <button
          className={cx("go-back-button")}
          onClick={() => {
            navigate(`/edit/${postId}`);
          }}
        >
          수정하기
        </button>
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
  ) : is404 ? (
    <h1>error 404</h1>
  ) : (
    <></>
  );
};

export default PostPage;
