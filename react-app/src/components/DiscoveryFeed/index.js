import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          <div key={singlePost.id} className="boxxy">
            <Link to={`/${singlePost.userName}`}>
              <img
                src={singlePost.photoURL}
                alt="photoURL"
                className="allImages"
              />
            </Link>
          </div>
        );
      });
    });

  return (
    <div className="OuterMost">
      <div className="outerTop">

      </div>
      <div className="outerBottom">
        <div className="LeftQuad">

        </div>
        <div className="MiddleQuad">
          {allPostsComponents}
        </div>
        <div className="RightQuad">

        </div>
      </div>
    </div>
  );
};

export default DiscoveryFeed;
