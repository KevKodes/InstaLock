// Action Types
const ADD_LIKE = "ADD_LIKE";


// Action Creators
const addLike = (like) => ({
    type: ADD_LIKE,
    like: like,
});


// Thunks
export const createLike = (likeObj) => async (dispatch) => {
    // If id has postId property then body equals postId
    // else body equals commentId
    let likeBody = { userId: likeObj.userId }

    if (likeObj.hasOwnProperty('postId')) {
        likeBody.postId = likeObj.postId
    } else if (likeObj.hasOwnProperty('commentId')) {
        likeBody.commentId = likeObj.commentId
    }

    // console.log('This is the likeBody', likeBody)

    const response = await fetch('/api/likes/', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeBody),
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
            const newState = {}
            const likeId = action.like.id
            newState[likeId] = action.like
            return {
                ...state,
                ...newState,
            }
        default:
            return state
    }
}

export default likesReducer
