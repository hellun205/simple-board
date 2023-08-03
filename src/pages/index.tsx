import { FC } from "react";
import styles from "../styles/index.module.css";
import classNames from "classnames/bind";
import { Post } from "../App";
import PostItem from "../components/PostItem";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

interface Props {
  posts: Post[];
}

const Index: FC<Props> = ({ posts }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("/write");
        }}
      >
        작성하기
      </button>
      <PostItem
        post={{
          id: "ID",
          title: "제목",
          author: "작성자",
          like: "좋아요",
          dislike: 0,
          content: "",
          view: "조회수",
        }}
      ></PostItem>
      {posts
        .sort((a, b) => (b.id as number) - (a.id as number))
        .map((value, index) => {
          return <PostItem key={index} post={value}></PostItem>;
        })}
    </>
  );
};

export default Index;
