const IS_FOLLOWING = "follow/IS_FOLLOWING";
const UPDATE_FOLLOWERS = "follow/UPDATE_FOLLOWERS"
const IS_FOLLOWED_BY = "follow/IS_FOLLOWED_BY";

// ACTION CREATORS
const loadFollowers = (followers) => ({
  type: IS_FOLLOWING,
  followers,
});

const loadFollowedBy = (followed_by) => ({
  type: IS_FOLLOWED_BY,
  followed_by,
});

const updateFollowers = (followers) => ({
  type: UPDATE_FOLLOWERS,
  followers
});

// THUNKS
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
    dispatch(updateFollowers(followers));
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
    dispatch(updateFollowers(followers));
  }
};

const initialState = {};

const followSession = (state = initialState, action) => {
  switch (action.type) {
    case IS_FOLLOWING:
      return { ...state, following: action.followers.follows };
    case IS_FOLLOWED_BY:
      return { ...state, followers: action.followed_by.followed };
    case UPDATE_FOLLOWERS:
      let updatedFollowers = {}
      if (action.followers?.follows) {
        updatedFollowers = action.followers.follows
      }
      return {...state, followers: updatedFollowers}
    default:
      return state;
  }
};

export default followSession;
