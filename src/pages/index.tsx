import { FC, useState } from "react";
import styles from "../styles/index.module.css";
import classNames from "classnames/bind";
import { Post } from "../App";
import PostItem from "../components/PostItem";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

interface Props {
  getPosts: () => Promise<Post[]>;
}

const Index: FC<Props> = ({ getPosts }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!isLoaded) {
    setIsLoaded(true);
    getPosts()
      .then((p) => setPosts(p))
      .catch(() => setPosts([]));
  }

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
          likes: "좋아요",
          dislikes: 0,
          content: "",
          view: "조회수",
        }}
      ></PostItem>
      {posts
        ? posts
            .sort((a, b) => (b.id as number) - (a.id as number))
            .map((value, index) => {
              return <PostItem key={index} post={value}></PostItem>;
            })
        : undefined}
    </>
  );
};

export default Index;
