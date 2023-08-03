import { FC } from "react";
import styles from "../styles/index.module.css";
import classNames from "classnames/bind";
import { Post } from "../App";
import PostItem from "../components/PostItem";

const cx = classNames.bind(styles);

interface Props {
  posts: Post[];
}

const Index: FC<Props> = ({ posts }) => {
  return (
    <>
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
      {posts.map((value, index) => {
        return <PostItem key={index} post={value}></PostItem>;
      })}
    </>
  );
};

export default Index;
