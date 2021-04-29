// ACTION TYPES
const LOAD_POSTS = "LOAD_POSTS";
// const REMOVE_POST = "REMOVE_POST";
const UPDATE_POST = "UPDATE_POST";
const LIKE_POST = "LIKE_POST";
const DELETE_POST = "DELETE_POST";

// ACTION CREATORS
const load = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

const updatePost = (post) => ({
  type: UPDATE_POST,
  post,
});

const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

// THUNKS

export const getEverySinglePosts = () => async (dispatch) => {
  const response = await fetch(`/api/posts`);
  if (response.ok) {
    const results = await response.json();
    dispatch(load(results));
  }

  return response;
};

export const getAllPosts = (userId) => async (dispatch) => {
  // get all posts of the user's feed
  const response = await fetch(`/api/posts/${userId}`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts));
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

export const createNewPost = (newPost) => async (dispatch) => {
  const response = await fetch(`/api/posts/create_post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  if (response.ok) {
    const personalPosts = await response.json();
    dispatch(load(personalPosts));
  }
  return response;
};

export const updatePostVault = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/update/${postId}`);
  if (response.ok) {
    const post = await response.json();
    dispatch(updatePost(post));
  }
  return response;
};

export const deleteSinglePost = (postId) => async (dispatch) => {
  const build = { method: "DELETE" };
  const response = await fetch(`/api/posts/${postId}`, build);
  const result = await response.json();
  dispatch(deletePost(result));
  return response;
};

// REDUCER
const initialState = {};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      const allPost = []; // need to keep it in an array so it says in newest first order
      action.posts.posts.forEach((post) => {
        allPost.push(post);
      });
      return {
        personalPosts: allPost,
      };
    case UPDATE_POST:
      // updating happens on the profile page (state.posts.personalPosts)
      const updatedPosts = [...state.personalPosts];
      const newPostId = action.post.id;
      const changedIndex = updatedPosts.findIndex(
        (post) => post.id === newPostId
      );
      updatedPosts[changedIndex] = action.post;
      return {
        ...state,
        personalPosts: [...updatedPosts],
      };
    case LIKE_POST:
      const newPosts = { ...state };
      const index = action.post.id;
      newPosts[index] = action.post;
      return newPosts;
    case DELETE_POST:
      const thePosts = { ...state };
      delete thePosts[action.postId];
      return thePosts;
    default:
      return state;
  }
};

export default postReducer;
