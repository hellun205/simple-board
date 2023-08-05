import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Write from "./pages/write";
import PostPage from "./pages/post";
import Header from "./components/Header";
import Edit from "./pages/edit";
import axios from "axios";

export interface Post {
  id: number | string;
  title: string;
  content: string;
  author: string;
  view: number | string;
  likes: number | string;
  dislikes: number | string;
}

function App() {
  const callApi = () => {
    axios.get("/api").then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  const findById = (id: number): Promise<Post | undefined> => {
    return new Promise<Post | undefined>((resolve) => {
      axios
        .post("/api/post/find-by-id", {
          id,
        })
        .then((res) => resolve(res.data.data.post))
        .catch(() => resolve(undefined));
    });
  };

  const getPosts = (): Promise<Post[]> => {
    return new Promise<Post[]>((resolve) => {
      axios
        .get("/api/post/get")
        .then((res) => resolve(res.data.data.posts))
        .catch(() => resolve([]));
    });
  };

  const writePost = (
    title: string,
    content: string,
    author: string
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      axios
        .post("/api/post/write", {
          author,
          title,
          content,
        })
        .then((res) => resolve())
        .catch(() => reject());
    });
  };

  const addView = (id: number) => {
    axios.post("/api/post/view", {
      id,
    });
  };

  const addLike = (id: number) => {
    axios.post("/api/post/like", {
      id,
    });
  };

  const addDisLike = (id: number) => {
    axios.post("/api/post/dislike", {
      id,
    });
  };

  const editPost = (id: number, title: string, content: string) => {
    axios.post("/api/post/update", {
      id,
      title,
      content,
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Index getPosts={getPosts} />}></Route>
            <Route
              path="/write"
              element={<Write writePost={writePost} />}
            ></Route>
            <Route
              path="/post/:id"
              element={
                <PostPage
                  findById={findById}
                  addView={addView}
                  addDisLike={addDisLike}
                  addLike={addLike}
                />
              }
            ></Route>
            <Route
              path="/edit/:id"
              element={<Edit findById={findById} editPost={editPost} />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
