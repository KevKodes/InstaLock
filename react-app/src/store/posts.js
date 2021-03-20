const LOAD_POSTS = "LOAD_POSTS";
const REMOVE_POST = "REMOVE_POST";
const CREATE_POST = "CREATE_POST";

const load = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

const createPost = (posts) => ({
  type: CREATE_POST,
  posts,
});

const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});

export const getAllPosts = (userId) => async (dispatch) => {
  // get all posts of the user's feed
  const response = await fetch(`/api/posts/${userId}`);
  if (response.ok) {
    const posts = await response.json();
    dispatch(load(posts));
  }
};

// export const getEverySinglePosts = () => async (dispatch) => {
//   const response = await fetch(`/api/posts`);
//   if (response.ok) {
//     const posts = await response.json();
//     dispatch(load(posts));
//   }
// };

// postObjectThatWillPhotoUrlAndCaptionOptionallyOnOurComponent it will have a photoURL and caption and userId
// export const createPost = (payload) => async (dispatch) => {};

const initialState = {};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      console.log('action.posts.posts: ', action.posts.posts)
      const allPost = {};
      Object.values(action.posts.posts).forEach((post) => {
        allPost[post.id] = post;
      });
      console.log('allPost: ', allPost)

      return {
        ...state,
        ...allPost,
        // allPost: action.posts,
      };
    default:
      return state;
  }
};

export default postReducer;
