// ACTION TYPES
const LOAD_POSTS = "LOAD_POSTS";
// const REMOVE_POST = "REMOVE_POST";
// const CREATE_POST = "CREATE_POST";
const LIKE_POST = "LIKE_POST";


// ACTION CREATORS
const load = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

// const createPost = (post) => ({
//   type: CREATE_POST,
//   post,
// });

// const removePost = (postId) => ({
//   type: REMOVE_POST,
//   postId,
// });

const likePost = (post) => ({
  type: LIKE_POST,
  post,
});

// THUNKS
export const getAllPosts = (userId) => async (dispatch) => {
  // get all posts of the user's feed
  const response = await fetch(`/api/posts/${userId}`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts));
  }

  return response;
};

export const updateLikes = (like) => async (dispatch) => {
  const { postId } = like;
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const res = await response.json();
    dispatch(likePost(res));
  }
  return response;
};

export const getFollowingPosts = (userId) => async (dispatch) => {
  const response = await fetch(`/api/posts/following/${userId}`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts));
  }

  return response;
};

export const createNewPost = newPost => async (dispatch) => {
  const response = await fetch(`/api/posts/create_post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newPost
    })
  })
  return await response.json();
}

// REDUCER
const initialState = {};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      const allPost = {};
      Object.values(action.posts.posts).forEach((post) => {
        allPost[post.id] = post;
      });

      return {
        // ...state, #we do not want to expand our state.
        ...allPost,
      };

    case LIKE_POST:
      const newPosts = { ...state };
      const index = action.post.id;
      newPosts[index] = action.post;

      return newPosts;
    default:
      return state;
  }
};

export default postReducer;
