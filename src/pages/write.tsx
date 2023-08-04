import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../styles/write.module.css";

const cx = classNames.bind(styles);

interface Props {
  writePost: (title: string, content: string, author: string) => void;
}

const Write: FC<Props> = ({ writePost }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  return (
    <div className={cx("wrapper")}>
      <div>
        <input
          className={cx("author")}
          placeholder="작성자"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        ></input>
        <input
          className={cx("title")}
          placeholder="제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </div>

      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <button
        onClick={() => {
          writePost(title, content, author);
          navigate("/");
        }}
      >
        작성
      </button>
    </div>
  );
};

export default Write;
