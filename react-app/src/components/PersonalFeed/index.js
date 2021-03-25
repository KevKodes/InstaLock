import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFollowingPosts } from "../../store/posts";
import { getComments, createComment } from "../../store/comments";
import { createLike, getLikes } from "../../store/likes";
import "../../index.css";

const PersonalFeed = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const posts = useSelector((state) => state?.posts?.personalPosts);
  const sessionUser = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => state?.comments?.commentsArray);

  const likes = useSelector((state) => state?.likes);

  useEffect(() => {
    dispatch(getFollowingPosts(sessionUser?.id));
    dispatch(getComments(comments));
    dispatch(getLikes());
  }, [dispatch, sessionUser]);

  const likePost = (id) => {
    dispatch(createLike({ userId: sessionUser.id, postId: id }));
  };

  const unlikePost = (id) => {
    console.log("----> This is unlikePost <----");
  };

  const likeComment = (id) => {
    dispatch(createLike({ userId: sessionUser.id, commentId: id }));
  };

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    if (!comment) return alert("There is an error");
    const postId = e.target.value;
    const userId = sessionUser.id;
    dispatch(createComment(userId, postId, comment));
  };

  // create a post component for each of the posts
  const followingPosts =
    posts &&
    Object.values(posts).map((post) => (
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
            {/* Add click handler */}

            {Object.values(likes).find(
              (like) =>
                like.userId === sessionUser.id && like.postId === post.id
            ) ? (
              <button
                id="unlike-post"
                className="like-btn"
                onClick={() => unlikePost(post.id)}
              >
                Unlike Post
              </button>
            ) : (
              <button
                id="like-post"
                className="like-btn"
                onClick={() => likePost(post.id)}
              >
                Like Post
              </button>
            )}

            {/* <button id="like-comment" className="like-btn" onClick={() => likeComment(post.id)}>Like Comment</button> */}
          </div>
          <div className="card-likes">add likes</div>
          <div className="card-caption">
            <div className="caption-user">{post.userName}</div>
            <div className="caption-string">{post.caption}</div>
          </div>
          <div className="card-comments">
            {comments &&
              Object.values(comments).map((comment) => {
                if (comment.postId === post.id) {
                  return (
                    <p key={comment.id}>
                      {comment.userName} {comment.body}
                    </p>
                  );
                }
              })}
          </div>
          <form className="comment_form">
            <input
              placeholder="Add a comment.."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
          <button type="submit" value={post.id} onClick={commentSubmitHandler}>
            Post Comment
          </button>
        </div>
      </div>
    ));

  return (
    <div className="personal-feed">
      <div className="feed-container">
        <h1 className="title">keep</h1>
        <div className="user-info">
          <div className="username"></div>
          <div className="first-last">
            <div>{followingPosts}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFeed;
