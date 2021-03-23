const IS_FOLLOWING = "follow/IS_FOLLOWING";
const FOLLOW_USER = "follow/FOLLOW_USER";
const UNFOLLOW_USER = "follow/UNFOLLOW_USER";
const IS_FOLLOWED_BY = "follow/IS_FOLLOWED_BY";

const loadFollowers = (followers) => ({
  type: IS_FOLLOWING,
  followers,
});

const loadFollowedBy = (followed_by) => ({
  type: IS_FOLLOWED_BY,
  followed_by,
});

export const getAllFollowers = (userId) => async (dispatch) => {
  const response = await fetch(`/api/follow/${userId}/follows`);

  if (response.ok) {
    const followers = await response.json();
    dispatch(loadFollowers(followers));
  }

  return response;
};

export const getAllFollowedBy = (userId) => async (dispatch) => {
  const response = await fetch(`/api/follow/${userId}/followedBy`);

  if (response.ok) {
    const followedBy = await response.json();
    dispatch(loadFollowedBy(followedBy));
  }

  return response;
};

const initialState = { isFollowing: false };

const followSession = (state = initialState, action) => {
  switch (action.type) {
    case IS_FOLLOWING:
      return { ...state, following: action.followers.follows };
    case IS_FOLLOWED_BY: {
      return { ...state, followers: action.followed_by.followed };
    }
    default:
      return state;
  }
};

export default followSession;
