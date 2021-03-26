// Action Types
const ADD_LIKE = "ADD_LIKE";
const GET_LIKES = "GET_LIKES";
const DELETE_LIKE = "DELETE_LIKE"


// Action Creators
const addLike = (like) => ({
    type: ADD_LIKE,
    like: like,
});


const getLike = (likes) => ({
    type: GET_LIKES,
    likes
})


const deleteLike = (id) => ({
    type: DELETE_LIKE,
    id: id,
})


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


export const getLikes = () => async (dispatch) => {

    const response = await fetch(`/api/likes/`)

    if (response.ok) {
        const res = await response.json();
        dispatch(getLike(res.likes));
    }

    return response;
};


export const unLike = (likeObj) => async (dispatch) => {

    let likeBody = { userId: likeObj.userId }

    if (likeObj.hasOwnProperty('postId')) {
        likeBody.postId = likeObj.postId
    } else if (likeObj.hasOwnProperty('commentId')) {
        likeBody.commentId = likeObj.commentId
    }

    const response = await fetch('/api/likes/', {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeBody),
    })

    if (response.ok) {
        const res = await response.json();
        if (res.success) {
            dispatch(deleteLike(res.id))
        }
    }

    return response

}


// Reducer
const initialState = {}

const likesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_LIKE:
            newState = {}
            const likeId = action.like.id
            newState[likeId] = action.like
            return {
                ...state,
                ...newState,
            }
        case GET_LIKES:
            newState = {}
            action.likes.forEach(like => newState[like.id] = like)
            return {
                ...state,
                ...newState,
            }
        case DELETE_LIKE:
            newState = { ...state }
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export default likesReducer
