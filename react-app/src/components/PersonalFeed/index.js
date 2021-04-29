import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getFollowingPosts } from "../../store/posts";
import { createLike, getLikes, unLike } from "../../store/likes";
import { getComments, createComment } from "../../store/comments";
import "../../index.css";

const PersonalFeed = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const posts = useSelector((state) => state?.posts?.personalPosts);
  const sessionUser = useSelector((state) => state?.session?.user);
  const likes = useSelector((state) => state?.likes);
  const comments = useSelector((state) => state?.comments?.commentsArray);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getFollowingPosts(sessionUser.id));
    }
    dispatch(getComments(comments));
    dispatch(getLikes());
  }, [dispatch, sessionUser]);

  const likePost = (id) => {
    dispatch(createLike({ userId: sessionUser.id, postId: id }));
  };

  const unlikePost = (id) => {
    dispatch(unLike({ userId: sessionUser.id, postId: id }));
  };

  const likeComment = (id) => {
    dispatch(createLike({ userId: sessionUser.id, commentId: id }));
  };

  const unlikeComment = (id) => {
    dispatch(unLike({ userId: sessionUser.id, commentId: id }));
  };

  const commentSubmitHandler = (e, id) => {
    e.preventDefault();
    e.target.reset();
    if (!comment) return alert("There is an error");
    const postId = id;
    const userId = sessionUser.id;
    const newComment = dispatch(createComment(userId, postId, comment));
    if (newComment) {
      // setComment("");
    }
  };

  // create a post component for each of the posts
  const followingPosts =
    posts && posts?.length ? (
      Object.values(posts).map((post) => {
        let commentCount = 0;
        let likeCount = 0;
        comments &&
          Object.values(comments).map((comment) => {
            if (comment.postId === post.id) commentCount += 1;
          });
        likes &&
          Object.values(likes).map((like) => {
            if (like.postId === post.id) likeCount += 1;
          });
        return (
          <div key={post.id} className="following-card">
            <div className="card-username">
              <img src={post.profileImage} alt="" className="photohere" />
              <Link to={`/${post.userName}`} className="Link">
                {post.userName}
              </Link>
            </div>
            <div className="card-photo">
              <img src={post.photoURL} alt={post.caption} />
            </div>
            <div className="card-bottom-content">
              <div className="btn-div">
                {Object.values(likes).find(
                  (like) =>
                    like.userId === sessionUser.id && like.postId === post.id
                ) ? (
                  <button
                    id="unlike-post"
                    className="like-btn"
                    onClick={() => unlikePost(post.id)}
                  ></button>
                ) : (
                  <button
                    id="like-post"
                    className="like-btn2"
                    onClick={() => likePost(post.id)}
                  ></button>
                )}
                <div className="lastdiv">
                  {likeCount} Likes &nbsp;&nbsp;
                  {commentCount} Comments
                </div>
                {/* <button id="like-comment" className="like-btn" onClick={() => likeComment(post.id)}>Like Comment</button> */}
              </div>
              <div className="card-likes"></div>
              <div className="card-caption">
                <div className="caption-user">{post.userName}</div>
                <div className="caption-string">{post.caption}</div>
              </div>
              <div className="card-comments">
                {comments &&
                  Object.values(comments).map((comment) => {
                    if (comment.postId === post.id) {
                      return (
                        <div className="comments69">
                          <p className="This420" >
                            {comment.userName}
                          </p>
                          <p className="This8008135" >
                            {comment.body}
                          </p>
                          <p>
                            {Object.values(likes).find(
                              (like) =>
                                like.userId === sessionUser.id &&
                                like.commentId === comment.id
                            ) ? (
                              <i
                                onClick={() => unlikeComment(comment.id)}
                                className="fas fa-heart"
                                style={{ color: "red" }}
                              ></i>
                            ) : (
                              <i
                                onClick={() => likeComment(comment.id)}
                                className="far fa-heart"
                                style={{ color: "black" }}
                              ></i>
                            )}
                          </p>
                        </div>
                      );
                    }
                  })}
              </div>
              <form
                className="comment_form"
                onSubmit={(e) => commentSubmitHandler(e, post.id)}
              >
                <input
                  placeholder="Add a comment.."
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Post</button>
              </form>
            </div>
          </div>
        );
      })
    ) : (
      <h2>
        <NavLink to="/discoveryfeed">Follow</NavLink> a user to see their posts!
      </h2>
    );

  return (
    <div className="personal-feed">
      <div className="LeftQuad3"></div>

      <div className="feed-container">
        <h1 className="title">keep</h1>
        <div className="user-info">
          <div className="username"></div>
          <div className="first-last">
            <div>{followingPosts}</div>
          </div>
        </div>
      </div>
      <div className="RightQuad3">
        <div className="suggestions">
          <div className="userspot">
            <div className="topside">
              <div className="leftside">
                <img
                  src={sessionUser?.profileImage}
                  alt=""
                  className="leftPhoto"
                />
              </div>
              <div className="usertitle">
                {sessionUser?.userName}
                <div className="undertitle">
                  {sessionUser?.firstName} {sessionUser?.lastName}
                </div>
              </div>
            </div>
          </div>
          <div className="headertext">Suggestions For You</div>
          <div className="person">
            Daniel Park
            <div className="github">
              <a
                href="https://github.com/dpxrk"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="linkedin">
              <a
                href="https://www.linkedin.com/in/danielpark0503/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="angel">
              <a
                href="https://angel.co/u/daniel-park-70"
                target="_blank"
                rel="noopener noreferrer"
              >
                AngelList
              </a>
            </div>
          </div>
          <div className="person">
            Keith Taylor
            <div className="github">
              <a
                href="https://github.com/keitay72"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="linkedin">
              <a
                href="https://www.linkedin.com/in/keith-taylor-16825311/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="person">
            Kevin Pitzer
            <div className="github">
              <a
                href="https://github.com/KevKodes"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="linkedin">
              <a
                href="https://www.linkedin.com/in/kevin-pitzer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="angel">
              <a
                href="https://angel.co/u/kevin-pitzer"
                target="_blank"
                rel="noopener noreferrer"
              >
                AngelList
              </a>
            </div>
          </div>
          <div className="person">
            Robert Vogtritter
            <div className="github">
              <a
                href="https://github.com/RobertVogue"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
            <div className="linkedin">
              <a
                href="www.linkedin.com/in/robertvogtritter"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="angel">
              <a
                href="https://angel.co/u/robert-c-vogtritter"
                target="_blank"
                rel="noopener noreferrer"
              >
                AngelList
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFeed;
