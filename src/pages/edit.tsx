import { FC, useState } from "react";
import classNames from "classnames/bind";
import styles from "../styles/edit.module.css";
import { Post } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const cx = classNames.bind(styles);

interface Props {
  findById: (id: number) => Promise<Post | undefined>;
  editPost: (id: number, title: string, content: string) => void;
}

const Edit: FC<Props> = ({ findById, editPost }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = parseInt(id || "0");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [post, setPost] = useState<Post | undefined>(undefined);
  const [is404, setIs404] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    findById(postId).then((p) => {
      setIsLoaded(true);
      if (p) {
        setTitle(p.title);
        setContent(p.content);
        setPost(p);
      } else {
        setIs404(true);
      }
    });
  }

  return post ? (
    <>
      <div className={cx("title-wrapper")}>
        <input
          className={cx("title")}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <div className={cx("view")}>조회수: {post.view}</div>
      </div>
      <div className={cx("author")}>작성자: {post.author}</div>
      <hr></hr>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <hr></hr>
      <div className={cx("edit-button-wrapper")}>
        <button
          className={cx("edit-button")}
          onClick={() => {
            editPost(postId, title as string, content as string);
            navigate(`/post/${postId}`);
          }}
        >
          수정하기
        </button>
      </div>
    </>
  ) : is404 ? (
    <h2>error: 404</h2>
  ) : (
    <></>
  );
};

export default Edit;
