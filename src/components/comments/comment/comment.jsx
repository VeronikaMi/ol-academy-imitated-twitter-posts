import React from "react";
import "./comment.scss";

function Comment({ comment }) {
  const commentNameToUpperCase = () => {
    return comment.name.substr(0, 1).toUpperCase();
  };

  return (
    <div className="comment">
      <div className="pic-div">
        <div className="pic">
          <span>{commentNameToUpperCase()}</span>
        </div>
      </div>
      <div className="main">
        <div className="first-line">
          <div className="author-info">
            <span className="name">{comment.name}</span>
            <span className="mail">{comment.email}</span>
          </div>
          <div className="right">...</div>
        </div>
        <div className="content">
          <p>{comment.body}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
