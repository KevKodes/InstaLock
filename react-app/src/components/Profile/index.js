import React from "react";
import { getAllPosts, updatePostVault } from "../../store/posts";
import { getAllFollowers, getAllFollowedBy } from "../../store/follow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { newFollowUser, newUnfollowUser } from "../../store/follow";

function Profile() {
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

  // check if the profile is the sessionUser's profile
  useEffect(() => {
    if (sessionUser?.userName === userName) {
      setIsOwnProfile(true);
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
    if (followers?.length) {
      const followingBoolean = checkFollowing(followers);
      setIsFollowing(followingBoolean);
    }
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

  // Get the profile user, posts, followers, and following
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
    }
  }, [dispatch, user.id, userName, sessionUser]);

  // Handle vaulting and unvaulting
  const handleVaultClick = (e) => {
    const postId = e.target.value;
    // update the post with the new value for vaulted
    dispatch(updatePostVault(postId));
  };

  const postComponents =
    posts &&
    Object.values(posts).map((post) => {
      return (
        <div className="boxxy" key={post.id}>
          {isOwnProfile && (
            <div className="vault-option">
              vault div
              {post.vaulted ? (
                <button value={post.id} onClick={handleVaultClick}>
                  Unvault Photo
                </button>
              ) : (
                <button value={post.id} onClick={handleVaultClick}>
                  Vault Photo
                </button>
              )}
            </div>
          )}
          <img src={post.photoURL} className="allImages" alt="photoURL" />
          <div className="left">Likes</div>
          <div className="right">Comments</div>
        </div>
      );
    });

  // const vaultComponent = isOwnProfile && (
  //   <div className="vault-option">
  //     vault div
  //     { post.vaulted ? (
  //       <p>vaulted true</p>
  //     ):(
  //       <p>vaulted false</p>
  //     )}
  //   </div>
  // )

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
              <button type="submit" className="fbutton">
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
