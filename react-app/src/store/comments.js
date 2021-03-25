const SET_COMMENTS = "SET_COMMENTS";
const CREATE_COMMENTS = "CREATE_COMMENTS";
const DELETE_COMMENTS = "DELETE_COMMENTS";

const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments,
});

const createComments = (comments) => ({
  type: CREATE_COMMENTS,
  comments,
});

const deleteComments = (id) => ({
  type: DELETE_COMMENTS,
  id,
});

// get all comments in database
export const getComments = () => async (dispatch) => {
  const response = await fetch(`/api/comments/`);
  if (response.ok) {
    const res = await response.json();
    dispatch(setComments(res));
    return response;
  }
};

// create comment, not sure if we use setComments again or createComments, createComments might only
// be needed if we are going to make comments editable.
export const createComment = (postId, body) => async (dispatch) => {
  const build = {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({ body }),
  };
  const response = await fetch(`/api/comments/${postId}/`, build);
  if (!response.ok) alert("ERROR");
  const data = await response.json();
  dispatch(createComments(data));
  return data;
};

// Deleting a comment
export const deleteComment = (postId) => async (dispatch) => {
  const build = {
    method: "DELETE",
  };
  const response = await fetch(`/api/comments/${postId}/`, build);
  const result = response.json();
  dispatch(deleteComments(result));
  return response;
};

const initialState = {};
const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENTS:
      //   const comments = action.comments.reduce((acc, ele) => {
      //     acc[ele.id] = ele;
      //     return acc;
      //   }, {});
      //   return {
      //     ...state,
      //     ...comments,
      //   };
      newState = Object.assign({}, state);
      newState = action.comments;
      return newState;
    case DELETE_COMMENTS:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
