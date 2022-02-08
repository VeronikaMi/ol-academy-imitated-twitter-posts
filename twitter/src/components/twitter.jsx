import React, { useEffect, useState } from "react";
import "./twitter.scss";
import Post from "./posts/post";
import Comments from "./comments/comments";

function Twitter() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [clickedPostId, setClickedPostId] = useState(null);

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
      {showComments && (
        <Comments
          clickedPostId={clickedPostId}
          hideCommentsClick={() => {
            setShowComments(false);
          }}
        />
      )}
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post.id}
            data={post}
            showCommentsClick={() => {
              setClickedPostId(post.id);
              setShowComments(true);
            }}
          />
        ))}
    </div>
  );
}

export default Twitter;
