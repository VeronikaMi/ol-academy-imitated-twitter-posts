import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./comments.scss";
import Comment from "./comment/comment";

function Comments(props) {
  const commentRef = useRef();
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    const commentsUrl = `https://jsonplaceholder.typicode.com/comments?postId=${props.clickedPostId}`;

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
      props.hideCommentsClick();
    }
  };

  return (
    <div
      className="comment-overlay"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className="comment-container" ref={commentRef}>
        <button className="btn-close" onClick={props.hideCommentsClick}>
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
