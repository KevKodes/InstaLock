import React, { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import "./DiscoveryFeed.css";

const DiscoveryFeed = () => {
  const [allPosts, setAllPosts] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/posts/");
      const data = await response.json();
      setAllPosts(data);
    };
    getPosts();
  }, []);

  const allPostsComponents =
    allPosts &&
    Object.values(allPosts).map((posts) => {
      return Object.values(posts).map((singlePost) => {
        return (
          <li key={singlePost.id}>
            <Link to={`/${singlePost.userName}`}>
              <img
                src={singlePost.photoURL}
                alt="photoURL"
                className="allImages"
              />
            </Link>
          </li>
        );
      });
    });

  return (
    <>
      <h1>You made it to the Discovery Page!</h1>
      <div className="pageContainer">
        <ul>{allPostsComponents}</ul>
      </div>
    </>
  );
};

export default DiscoveryFeed;
