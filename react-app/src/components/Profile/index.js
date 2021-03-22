import React from "react";
import { getAllPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { userName } = useParams();
  const [user, setUser] = useState({});
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
      console.log("THESE ARE ALL THE POSTS", posts);
      return (
        <li>
          <img className="image" src={post.photoURL} alt="photoURL" />
        </li>
      );
    });

  return (
    <div className="MainPage">
      <div className="TopLess">
        <h1> Album Scroll </h1>
      </div>
      <div className="BottomMost">
        <div className="QuadsPage">
          <div className="Quad1">
            User Info Including picture and follow buttons
          </div>
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
