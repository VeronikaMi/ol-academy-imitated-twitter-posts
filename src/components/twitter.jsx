import React, { useEffect, useState } from "react";
import "./twitter.scss";
import Post from "./posts/post";
import Comments from "./comments/comments";

function Twitter() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [clickedPostId, setClickedPostId] = useState(null);
  const [isSeeOnePost, setIsSeeOnePost] = useState(false);
  const [tweetId, setTweetId] = useState();

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
          hideCommentsClick={() => setShowComments(false)}
        />
      )}
      {isSeeOnePost
        ? posts
            .filter((post) => post.id === tweetId)
            .map((post) => (
              <Post
                isSeeOnePost={isSeeOnePost}
                setToOnePost={(value) => setIsSeeOnePost(value)}
                tweetId={(id) => setTweetId(id)}
                key={post.id}
                data={post}
                showCommentsClick={() => {
                  setClickedPostId(post.id);
                  setShowComments(true);
                }}
              />
            ))
        : posts.length > 0 &&
          posts.map((post) => (
            <Post
              isSeeOnePost={isSeeOnePost}
              setToOnePost={() => setIsSeeOnePost(true)}
              tweetId={(id) => setTweetId(id)}
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
