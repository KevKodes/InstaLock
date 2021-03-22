const IS_FOLLOWING = "IS_FOLLOWING"
const FOLLOW_USER = "FOLLOW_USER"
const UNFOLLOW_USER = "UNFOLLOW_USER"
const IS_FOLLOWED_BY = "IS_FOLLOWED_BY"


const loadFollowers = (following) => ({
    type = IS_FOLLOWING,
    following,
})


const loadFollowedBy = (followed_by) => ({
    type = IS_FOLLOWED_BY,
    followed_by,
})

export const getAllFollowers = (userId) => async dispatch => {
    const response = await fetch(`/api/follow/${userId}/follows`)

    if (response.ok) {
        const followers = await response.json()
        dispatch(loadFollowers(followers))
    }

    return response
}

export const getAllFollowedBy = (userId) => async dispatch => {
    const response = await fetch(`/api/follow/${userId}/followedBy`)

    if (response.ok) {
        const followedBy = await response.json()
        dispatch(loadFollowedBy(followedBy))
    }

    return response
}