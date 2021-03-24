import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../../store/posts";
import "./PersonalFeed.css";
import { Link } from "react-router-dom";
import { getComments } from '../../store/comments'


const PersonalFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts?.personalPosts);
  const sessionUser = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => state?.comments?.allComments)
  console.log('THESE ARE THE COMMENTS', comments)
  // set the state with the user's following posts
  useEffect(() => {
    dispatch(getFollowingPosts(sessionUser?.id));
    dispatch(getComments(comments))
  }, [dispatch, sessionUser, comments]);

  // create a post component for each of the posts
  const followingPosts =
    posts &&
    Object.values(posts).map((post) => (
      <div key={post.id} className="following-card">
        <div className="card-username">
          <Link to={`/${post.userName}`} className="Link">
            {post.userName}
          </Link>
        </div>
        <div className="card-photo">
          <img src={post.photoURL} alt={post.caption} />
        </div>
        <div className="card-bottom-content">
          <div className="card-likes">add likes</div>
          <div className="card-caption">
            <div className="caption-user">{post.userName}</div>
            <div className="caption-string">{post.caption}</div>
          </div>
          <div className="card-comments">
            <p>View all # comments</p>
            add comments
          </div>
        </div>
      </div>
    ));

  return (
    <div className="personal-feed">
      <div className="feed-container">
        <h1 className="title">Personal Feed!</h1>
        <div className="user-info">
          <div className="username"></div>
          <div className="first-last">
            <div>{followingPosts}</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFeed;
