const SET_COMMENTS = 'SET_COMMENTS';
// const CREATE_COMMENTS = 'CREATE_COMMENTS';
const DELETE_COMMENTS = 'DELETE_COMMENTS';

const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments,
});

// const createComments = (comments) => ({
//     type: CREATE_COMMENTS,
//     comments,
// });

const deleteComments = (id) => ({
    type: DELETE_COMMENTS,
    id,
});

export const getComments = () => async (dispatch) => {
    // get all comments of the posts
    const response = await fetch('/api/comments');
    if (response.ok) {
        const res = await response.json()
        dispatch(setComments(res.comments));
        return response;
    }
};

export const createComment = (userId, postId, body) => async (dispatch) => {
    // create comment, not sure if we use setComments again or createComments, createComments might only
    // be needed if we are going to make comments editable.
    const build =
    {
        method: 'POST',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify({ userId, postId, body })
    }
    const response = await fetch('/api/comments/', build)
    if (!response.ok) alert('ERROR')
    const data = await response.json()
    return dispatch(setComments([data]));
};

export const deleteComment = (id) => async (dispatch) => {
    await dispatch(deleteComments(id));
    const build = {
        method: "DELETE",
    }
    const response = await fetch(`/api/users/COMMENTS/${id}`, build);
    return response.data.message;
};

const initialState = {};
const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            const comments = action.comments.reduce((acc, ele) => {
                acc[ele.id] = ele;
                return acc
            }, {});
            return {
                ...state,
                ...comments,
            };
        case DELETE_COMMENTS:
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        default:
            return state;
    };
};

export default commentsReducer;
