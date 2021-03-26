import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

    dispatch(unLike({ userId: sessionUser.id, postId: id }))

  }

  const likeComment = (id) => {
    dispatch(createLike({ userId: sessionUser.id, commentId: id }));
  };

  const unlikeComment = (id) => {

    dispatch(unLike({ userId: sessionUser.id, commentId: id }))

  }

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

            {Object.values(likes).find((like) => like.userId === sessionUser.id && like.postId === post.id) ?
              (<button id="unlike-post" className="like-btn" onClick={() => unlikePost(post.id)}>Unlike Post</button>) :
              (<button id="like-post" className="like-btn" onClick={() => likePost(post.id)}>Like Post</button>)}

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
                      {Object.values(likes).find((like) => like.userId === sessionUser.id && like.commentId === comment.id) ?
                        <i onClick={() => unlikeComment(comment.id)} className="fas fa-heart" style={{ color: 'red' }}></i> :
                        <i onClick={() => likeComment(comment.id)} className="far fa-heart" style={{ color: 'white' }}></i>}
                    </p>
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
            <button type="submit">Post Comment</button>
          </form>
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
