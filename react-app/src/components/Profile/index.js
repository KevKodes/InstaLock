import React from "react";
import { getAllPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { userName } = useParams();
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/users/${userName}`);
      const data = await response.json();
      setUser(data);
    };
    getUser();
    dispatch(getAllPosts(user.id));
  }, [dispatch, user.id, userName]);

  const postComponents =
    posts &&
    Object.values(posts).map((post) => {
      return (
        <div className="boxxy">
          <img
          src={post.photoURL}
          className="allImages"
          alt="photoURL" />
        </div>
      );
    });

  console.log("This is posts ", posts);
  console.log("This is user ", user);

  // type="button" value={isFollowing} onClick={e => setIsFollowing(e.target.value)}

  return (
    <div className="OuterMost">
      <div className="outerTop"></div>
      <div className="outerBottom">
          <div className="LeftQuad"></div>
          <div className="MiddleQuad">
            {postComponents}
          </div>
          <div className="RightQuad2">
            <div className="nameandphoto">
              <img src={user.profileImage} alt="" className="photohere" />
              {user.userName}
            </div>
            <div className="followbuttons">
              <button
                className="fbutton"
                value={isFollowing}
                onClick={(e) => setIsFollowing(e.target.value)}>
                Follow
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Profile;
