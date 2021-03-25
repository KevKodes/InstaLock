// Action Types
const ADD_LIKE = "ADD_LIKE";


// Action Creators
const addLike = (like) => ({
    type: ADD_LIKE,
    like: like,
});


// Thunks
export const createLike = (id) => async (dispatch) => {
    // If id has postId property then body equals postId
    // else body equals commentId
    let body = {}

    if (id.hasOwnProperty('postId')) {
        body = { postId: id.postId }
    } else if (id.hasOwnProperty('commentId')) {
        body = { commentId: id.commentId }
    }

    console.log(body)
    const response = await fetch('/api/likes/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    });

    if (response.ok) {
        const res = await response.json();
        dispatch(addLike(res));
    }

    return response;
};


// Reducer
const initialState = {}

const likesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LIKE:
            return state
        default:
            return state
    }
}

export default likesReducer
