import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./comments.scss";
import Comment from "./comment/comment";

function Comments({ clickedPostId, hideCommentsClick }) {
  const commentRef = useRef();
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${clickedPostId}`;

    axios
      .get(commentsUrl)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleClick = (e) => {
    if (!commentRef.current.contains(e.target)) {
      hideCommentsClick();
    }
  };

  return (
    <div className="comment-overlay" onClick={handleClick}>
      <div className="comment-container" ref={commentRef}>
        <button className="btn-close" onClick={hideCommentsClick}>
          X
        </button>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default Comments;
