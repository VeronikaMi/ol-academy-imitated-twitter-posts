import React, { useEffect, useState } from "react";
import "./twitter.scss";
import Post from "./posts/post";

function Twitter() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  return (
    <div className="container">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post.id} data={post} />)}
    </div>
  );
}

export default Twitter;
