import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../index.css";

const DiscoveryFeed = () => {
  const [allPosts, setAllPosts] = useState({});
  const sessionUser = useSelector(state => state?.session?.user)

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/posts/discovery/${sessionUser?.id}`);
      const data = await response.json();
      setAllPosts(data);
    };
    if (sessionUser?.id) {
      getPosts();
    }
  }, [sessionUser]);

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
              <div className="left">Likes</div>
              <div className="right">Comments</div>
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
