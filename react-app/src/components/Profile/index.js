import React from "react";
import { NavLink } from "react-router-dom";
import { getAllPosts, updatePostVault } from "../../store/posts";
import { getAllFollowers, getAllFollowedBy } from "../../store/follow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../../index.css";
import { newFollowUser, newUnfollowUser } from "../../store/follow";
import { getComments } from "../../store/comments";
import { getLikes } from "../../store/likes";
import { deleteSinglePost } from "../../store/posts";

function Profile() {
  const history = useHistory();
  const { userName } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const posts = useSelector((state) => state?.posts?.personalPosts);
  const sessionUser = useSelector((state) => state?.session?.user);
  const followers = useSelector((state) => state?.follow?.followers);
  const following = useSelector((state) => state?.follow?.following);
  const comments = useSelector((state) => state?.comments?.commentsArray);
  const likes = useSelector((state) => state?.likes);

  // check if the profile is the sessionUser's profile
  useEffect(() => {
    if (sessionUser?.userName === userName) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [sessionUser, userName]);

  // check if the session user follows the visited profile
  useEffect(() => {
    const checkFollowing = (list) => {
      if (!list) return false;
      let returnBool = false;
      list.forEach((eachUser) => {
        if (eachUser.id === sessionUser.id) {
          returnBool = true;
        }
      });
      return returnBool;
    };
    const followingBoolean = checkFollowing(followers);
    setIsFollowing(followingBoolean);
  }, [followers, sessionUser]);

  // update the numFollowers and numFollowing
  useEffect(() => {
    setNumFollowers(followers?.length);
    setNumFollowing(following?.length);
  }, [followers, following]);

  const follow = async (e) => {
    e.preventDefault();
    dispatch(newFollowUser(sessionUser?.id, user?.id));
    setIsFollowing(true);
  };

  const unfollow = async (e) => {
    e.preventDefault();
    dispatch(newUnfollowUser(sessionUser?.id, user?.id));
    setIsFollowing(false);
  };

  // Get the profile user, posts, followers, followings, comments, likes
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/users/${userName}`);
      const data = await response.json();
      setUser(data);
    };
    getUser();
    if (user.id) {
      dispatch(getAllFollowers(user.id));
      dispatch(getAllFollowedBy(user.id));
      dispatch(getAllPosts(user.id));
      dispatch(getComments());
      dispatch(getLikes());
    }
  }, [dispatch, user.id, userName, sessionUser]);

  // Handle vaulting and unvaulting
  const handleVaultClick = (e) => {
    const postId = e.target.value;
    // update the post with the new value for vaulted
    dispatch(updatePostVault(postId));
  };

  const handleDeletePostButton = (e) => {
    const postId = e.target.value;
    dispatch(deleteSinglePost(postId));
    history.go(0);
  };

  const postComponents =
    posts && posts?.length ? (
      Object.values(posts).map((post) => {
        let commentCount = 0;
        let likeCount = 0;
        comments &&
          comments.map((comment) => {
            if (comment.postId === post.id) commentCount += 1;
          });
        likes &&
          Object.values(likes).map((like) => {
            if (like.postId === post.id) likeCount += 1;
          });
        return (
          <div className="boxxy" key={post.id}>
            {isOwnProfile ? (
              <>
                <div className="vault-option">
                  {post.vaulted ? (
                    <button
                      className="ultra"
                      value={post.id}
                      onClick={handleVaultClick}
                    >
                      Unvault Post
                    </button>
                  ) : (
                    <button
                      className="ultra"
                      value={post.id}
                      onClick={handleVaultClick}
                    >
                      Vault Post
                    </button>
                  )}
                </div>
                <div>
                  <button
                    className="ultra"
                    value={post.id}
                    onClick={handleDeletePostButton}
                  >
                    Delete Post
                  </button>
                </div>
                <img src={post.photoURL} className="allImages" alt="photoURL" />
                <div className="left">{likeCount}: Likes</div>
                <div className="right">{commentCount}: Comments</div>
              </>
            ) : (
              <div className="visitor">
                {post.vaulted ? (
                  <></>
                ) : (
                  <>
                    <img
                      src={post.photoURL}
                      className="allImages"
                      alt="photoURL"
                    />
                    <div className="left">{likeCount}: Likes</div>
                    <div className="right">{commentCount}: Comments</div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })
    ) : (
      <h2>
        <NavLink to="/upload">Add</NavLink> a post to your profile!
      </h2>
    );

  return (
    <div className="OuterMost">
      <div className="outerTop2">
        <div className="nameandphoto">
          <img src={user.profileImage} alt="" className="photohere" />
          {user.userName}
          <div>{numFollowing ? numFollowing : 0} Following</div>
          <div>{numFollowers ? numFollowers : 0} Follows</div>
          <div>{posts ? posts.length : 0} Posts</div>
        </div>
        <div className="followbuttons">
          <form onSubmit={isFollowing ? unfollow : follow}>
            {!isOwnProfile && (
              <button type="submit" className="fbutton ultra">
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </form>
        </div>
      </div>
      <div className="outerBottom">
        <div className="LeftQuad"></div>
        <div className="MiddleQuad">{postComponents}</div>

        <div className="RightQuad2"></div>
      </div>
    </div>
  );
}

export default Profile;
