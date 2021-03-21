import React, { useEffect, useState } from "react";
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
            <img
              src={singlePost.photoURL}
              alt="photoURL"
              className="allImages"
            />
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
