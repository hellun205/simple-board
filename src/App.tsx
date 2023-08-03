import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Write from "./pages/write";
import PostPage from "./pages/post";
import Header from "./components/Header";

export interface Post {
  id: number | string;
  title: string;
  content: string;
  author: string;
  view: number | string;
  like: number | string;
  dislike: number | string;
}

function App() {
  const [post, setPost] = useState<Post[]>([
    {
      id: 0,
      title: "test",
      content: "asdf",
      author: "sky",
      view: 0,
      like: 0,
      dislike: 0,
    },
    {
      id: 1,
      title: "hello world",
      content: "hi!",
      author: "askdjald",
      view: 152,
      like: 7,
      dislike: 2,
    },
  ]);

  const [nextId, setNextId] = useState(post.length);

  const getNextId = () => {
    const id = nextId;
    setNextId(nextId + 1);
    return id;
  };

  const findById = (id: number): Post | undefined => {
    return post.find((value) => value.id === id);
  };

  const writePost = (title: string, content: string, author: string) => {
    setPost([
      ...post,
      {
        id: getNextId(),
        title,
        content,
        author,
        dislike: 0,
        like: 0,
        view: 0,
      },
    ]);
  };

  const addView = (id: number) => {
    setPost([
      ...post.filter((p) => p.id !== id),
      {
        ...post.filter((p) => p.id === id)[0],
        view: (post.filter((p) => p.id === id)[0].view as number) + 1,
      },
    ]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Index posts={post} />}></Route>
            <Route
              path="/write"
              element={<Write writePost={writePost} />}
            ></Route>
            <Route
              path="/post/:id"
              element={<PostPage findById={findById} addView={addView} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
