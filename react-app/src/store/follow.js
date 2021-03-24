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

const followUser = (follows) => ({
  type: FOLLOW_USER,
  follows,
});

const unfollowUser = (followers) => ({
  type: UNFOLLOW_USER,
  followers
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

export const newFollowUser = (followerId, followedId) => async (dispatch) => {
  const response = await fetch(`/api/follow/${followedId}/follows`, {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({ follower_id: followerId }),
  });
  if (response.ok) {
    const followers = await response.json();
    dispatch(followUser(followers));
  }
};

export const newUnfollowUser = (followerId, followedId) => async (dispatch) => {
  const response = await fetch(`/api/follow/${followedId}/follows`, {
    method: "DELETE",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({ follower_id: followerId }),
  });
  if (response.ok) {
    const followers = await response.json();
    dispatch(unfollowUser(followers));
  }
};

const initialState = {};

const followSession = (state = initialState, action) => {
  switch (action.type) {
    case IS_FOLLOWING:
      return { ...state, following: action.followers.follows };
    case IS_FOLLOWED_BY:
      return { ...state, followers: action.followed_by.followed };
    case FOLLOW_USER:
      // newState = Object.assign({}, state);
      // newState[action.userId] = action.follows;
      const newFollowers = action.follows
      console.log('newFollowers: ', newFollowers)
      return {
        ...state,
        // followers: [...newFollowers]
      };
    case UNFOLLOW_USER:
      const updatedFollowers = action.follows
      return {
        ...state,
        followers: [...updatedFollowers]
      };
    default:
      return state;
  }
};

export default followSession;
