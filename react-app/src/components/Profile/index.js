import React from "react";
import { getAllPosts } from "../../store/posts";
import { getAllFollowers, getAllFollowedBy } from "../../store/follow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { userName } = useParams();
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const posts = useSelector((state) => state.posts);
  const sessionUser = useSelector((state) => state?.session?.user);
  const followers = useSelector((state) => state.follow?.followers);
  const following = useSelector((state) => state?.follow?.following);
  console.log("THESE ARE THE FOLLOWERS", followers);
  console.log("THESE ARE THE FOLLOWING", following);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/users/${userName}`);
      const data = await response.json();
      setUser(data);
    };
    getUser();
    dispatch(getAllFollowers(user.id));
    dispatch(getAllFollowedBy(user.id));
    dispatch(getAllPosts(user.id));
  }, [dispatch, user.id, userName, sessionUser]);

  const postComponents =
    posts &&
    Object.values(posts).map((post) => {
      return (
        <li>
          <img className="image" src={post.photoURL} alt="photoURL" />
        </li>
      );
    });

  return (
    <div className="MainPage">
      <div className="TopLess">
        <h1>{user.userName}</h1>
      </div>
      <div className="BottomMost">
        <div className="QuadsPage">
          <div className="Quad1">
            {user.firstName} {user.lastName}
          </div>
          <div>
            <img src={user.profileImage} alt="profileImg" />
          </div>
          <div>{Object.entries(posts).length} Post</div>
          <div>
            {followers?.length}
            Follow
            {sessionUser?.userName !== userName && (
              <button
                type="button"
                value={isFollowing}
                onClick={(e) => setIsFollowing(e.target.value)}
              >
                Follow
              </button>
            )}
          </div>
          <div>{following?.length}Following</div>
          <div className="Qaud2">
            <ul>{postComponents}</ul>
          </div>
          <div className="Quad3"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
