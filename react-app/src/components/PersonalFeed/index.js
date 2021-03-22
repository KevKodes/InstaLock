import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../../store/posts"
import './PersonalFeed.css'

const PersonalFeed = ({ sessionUser }) => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state?.posts)

  // set the state with the user's following posts
  useEffect(() => {
    dispatch(getFollowingPosts(sessionUser.id))
  },[dispatch, sessionUser.id])

  // create a post component for each of the posts
  const followingPosts = posts && (
    Object.values(posts).map(post => (
      <div key={post.id} className="following-card">
        <div className="card-username">
          {post.userName}
        </div>
        <div className="card-photo">
          <img src={post.photoURL} alt={post.caption} />
        </div>
        <div className="card-bottom-content">
          <div className="card-likes">
            add likes
          </div>
          <div className="card-caption">
            <div className="caption-user">
              {post.userName}
            </div>
            <div className="caption-string">
              {post.caption}
            </div>
          </div>
          <div className="card-comments">
            <p>View all # comments</p>
            add comments
          </div>
        </div>
      </div>
    ))
  )


  return (
    <div className="personal-feed">
      <h1>Personal Feed!</h1>
      <div className="user-info">
        <div className="username">
          {sessionUser.userName}
        </div>
        <div className="first-last">
          {sessionUser.firstName}
          {sessionUser.lastName}
        </div>
      </div>
      <div className="feed-container">
        {followingPosts}
      </div>
    </div>
  );
};

export default PersonalFeed;
