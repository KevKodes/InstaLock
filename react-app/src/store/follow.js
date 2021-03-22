const IS_FOLLOWING = "IS_FOLLOWING"
const FOLLOW_USER = "FOLLOW_USER"
const UNFOLLOW_USER = "UNFOLLOW_USER"

const followers = (following) => ({
    type = IS_FOLLOWING,
    following,
})

// export const getAllFollowers = () => {

// }