import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Write from "./pages/write";
import Post from "./pages/post";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route path="/" element={<Index />}></Route>
            <Route path="/write" element={<Write />}></Route>
            <Route path="/post" element={<Post />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
