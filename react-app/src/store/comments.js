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
    dispatch(setComments(res.comments));
    return response;
  }
};

// create comment, not sure if we use setComments again or createComments, createComments might only
// be needed if we are going to make comments editable.
export const createComment = (userId, postId, body) => async (dispatch) => {
  const build = {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify({ userId, postId, body }),
  };
  const response = await fetch(`/api/comments/${postId}/`, build);
  if (!response.ok) alert("ERROR");
  const data = await response.json();
  return dispatch(createComments([data]));
};

// Deleting a comment
export const deleteComment = (commentId) => async (dispatch) => {
  const build = {
    method: "DELETE",
  };
  const response = await fetch(`/api/comments/${commentId}`, build);
  const result = await response.json();
  dispatch(deleteComments(result));
  return response;
};

const initialState = {};
const commentsReducer = (state = initialState, action) => {
  let newState;
  let allComments;
  switch (action.type) {
    case SET_COMMENTS:
      allComments = [];
      action.comments.forEach((comment) => {
        allComments.push(comment);
      });
      return {
        commentsArray: allComments,
      };
    case CREATE_COMMENTS:
      allComments = [];
      action.comments.forEach((comment) => {
        allComments.unshift(comment);
      });
      const newCommentsArray = [...allComments, ...state.commentsArray];
      return {
        commentsArray: newCommentsArray,
      };

    case DELETE_COMMENTS:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
