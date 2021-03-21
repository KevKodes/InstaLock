import React from "react";
import { getAllPosts } from "../../store/posts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Profile() {
  const posts = useSelector((state) => state?.posts);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userName } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/users/${userName}`);
      const data = await response.json();
      setUser(data);
    };
    getUser();
    dispatch(getAllPosts(user.id));
  }, [dispatch, user.id, userName]);

  const postComponents = posts && Object.values(posts).map((post) => {
    return (
      <li>
        <img src={post.photoURL} alt="photoURL" />
        {post.caption}
      </li>
    );
  });

  return (
    <div>
      <h1> You made it to the profile! </h1>
      <div> Beta: UserName: {user.userName}</div>
      <ul>{postComponents}</ul>
    </div>
  );
}

export default Profile;
