import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getComments } from "../../store/comments";
import "../../index.css";

const DiscoveryFeed = () => {
  const dispatch = useDispatch();
  const [allPosts, setAllPosts] = useState({});
  const sessionUser = useSelector((state) => state?.session?.user);
  const comments = useSelector((state) => state?.comments);
  // const post = useSelector((state) => state?.post?.personalPosts);

  // need user
  // getAllPosts

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch(`/api/posts/discovery/${sessionUser?.id}`);
      const data = await response.json();
      setAllPosts(data.posts);
    };
    if (sessionUser?.id) {
      getPosts();
    }
    dispatch(getComments(comments));
  }, [dispatch, sessionUser]);

  const allPostsComponents =
    allPosts &&
    Object.values(allPosts).map((post) => {
      let commentCount = 0;
      Object.values(comments).map((comment) => {
        if (comment.postId === post.id) commentCount += 1;
      });
      return (
        <div key={post.id} className="boxxy">
          <Link to={`/${post.userName}`}>
            <img src={post.photoURL} alt="photoURL" className="allImages" />
            <div className="left">Likes</div>
            <div className="right">{commentCount}: Comments</div>;
          </Link>
        </div>
      );
    });

  return (
    <div className="OuterMost">
      <div className="outerTop"></div>
      <div className="outerBottom">
        <div className="LeftQuad"></div>
        <div className="MiddleQuad">{allPostsComponents}</div>
        <div className="RightQuad"></div>
      </div>
    </div>
  );
};
export default DiscoveryFeed;
