import React, { useState, useEffect, useRef } from "react";
import "./post.scss";
import useOnClickOutside from "../../hooks/useOnClickOutside";

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

  const colors = [
    "rgb(170, 71, 188)",
    "rgb(92, 107, 192)",
    "rgb(0, 136, 122)",
    "rgb(236, 64, 122)",
    "rgb(245, 81, 30)",
    "rgb(240, 215, 11)",
  ];

  const getColor = () => {
    return Math.floor((Math.random() * 10) % 6);
  };

  useEffect(() => {
    const userUrl = `https://jsonplaceholder.typicode.com/users?id=${props.data.userId}`;

    fetch(userUrl)
      .then((response) => response.json())
      .then((user) => {
        setUser(user[0]);
        setAvatarLetter(user[0].name.substr(0, 1));
        setColor(colors[getColor()]);
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
    if (props.seeOne) {
      props.one(false);
    } else {
      props.twID(props.data.id);
      props.one(true);
    }

    setShowList(false);
  };

  useOnClickOutside(list, () => setShowList(false));

  return (
    <div
      className="post"
      onClick={(e) => {
        handleClick(e);
      }}
    >
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
                  {props.seeOne ? "See All Tweets" : "See Tweet"}
                </li>
              </ul>
            </div>
          )}
          <p>{props.data.body}</p>
          <img src={photo.url} alt={photo.title} />
        </div>
        <div className="like">
          <svg
            ref={heart}
            onClick={handleLikeClick}
            className={isLiked ? "active" : "default"}
          >
            {!isLiked && (
              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
            )}
            {isLiked && (
              <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Post;
