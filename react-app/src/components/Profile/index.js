import React from "react";
import { getAllPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const posts = useSelector((state) => state?.post?.allPost);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userName } = useParams();

  console.log("THIS IS POSTS", posts);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/users/${userName}`);
      const data = await response.json();
      setUser(data);
    };
    getUser();
    dispatch(getAllPosts(user.id));
  }, [dispatch, user.id, userName]);

  const postComponents = posts && Object.entries(posts).map((post) => {
    return (
      <li>
        <img src={post.photoURL} alt="photoURL">
          {post.caption}
        </img>
      </li>
    );
  });

  return (
    <div>
      <h1> You made it to the profile! </h1>
      <div> UserName: {user.userName}</div>
      <ul>{postComponents}</ul>
    </div>
  );
}

export default Profile;
