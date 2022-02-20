import React, { useState, useEffect, useRef } from "react";
import "./post.scss";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import SvgHeart from "../../utils/svgHeart/SvgHeart";
import { getColor } from "../../utils/Utils";

function Post(props) {
  const dots = useRef();
  const heart = useRef();
  const list = useRef();

  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState({});
  const [avatarLetter, setAvatarLetter] = useState("");
  const [color, setColor] = useState("");
  const [showList, setShowList] = useState(false);

  const [isLiked, setIsLiked] = useState(
    JSON.parse(localStorage.getItem("likedPosts"))
      ? JSON.parse(localStorage.getItem("likedPosts"))[props.data.id - 1][
          "likeState"
        ]
      : false
  );

  useEffect(() => {
    const userUrl = `https://jsonplaceholder.typicode.com/users?id=${props.data.userId}`;

    fetch(userUrl)
      .then((response) => response.json())
      .then((user) => {
        setUser(user[0]);
        setAvatarLetter(user[0].name.substr(0, 1));
        setColor(getColor());
      });
  }, []);

  useEffect(() => {
    const photoUrl = `https://jsonplaceholder.typicode.com/photos?id=${props.data.id}`;

    fetch(photoUrl)
      .then((response) => response.json())
      .then((photo) => {
        setPhoto(photo[0]);
      });
  }, []);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    let likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    let filteredPosts = likedPosts.filter(
      (obj) => obj.postId === props.data.id
    );
    if (filteredPosts.length) {
      filteredPosts[0]["likeState"] = isLiked;
    } else {
      likedPosts.push({ postId: props.data.id, likeState: isLiked });
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [isLiked]);

  const handleClick = (e) => {
    if (showList && !list.current.contains(e.target)) {
      setShowList(false);
    }

    if (
      !dots.current.contains(e.target) &&
      !heart.current.contains(e.target) &&
      !showList
    ) {
      props.showCommentsClick();
    }
  };

  const handleSeeTweet = () => {
    if (props.isSeeOnePost) {
      props.setToOnePost(false);
    } else {
      props.tweetId(props.data.id);
      props.setToOnePost(true);
    }

    setShowList(false);
  };

  useOnClickOutside(list, () => setShowList(false));

  return (
    <div className="post" onClick={handleClick}>
      <div className="pic-div">
        <div className="pic" style={{ backgroundColor: color }}>
          <span>{avatarLetter}</span>
        </div>
      </div>
      <div className="main">
        <div className="first-line">
          <div className="author-info">
            <span className="name">{user.name}</span>
            <span className="mail">{user.email}</span>
          </div>
          <div className="right" ref={dots} onClick={() => setShowList(true)}>
            ...
          </div>
        </div>
        <div className="content">
          {showList && (
            <div className="select-list" ref={list}>
              <ul>
                <li
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setShowList(false);
                  }}
                >
                  {isLiked ? "Unlike" : "Like"}
                </li>
                <li onClick={handleSeeTweet}>
                  {props.isSeeOnePost ? "See All Tweets" : "See Tweet"}
                </li>
              </ul>
            </div>
          )}
          <p>{props.data.body}</p>
          <img src={photo.url} alt={photo.title} />
        </div>
        <div className="like" ref={heart}>
          <SvgHeart handleLikeClick={handleLikeClick} isLiked={isLiked} />
        </div>
      </div>
    </div>
  );
}

export default Post;
