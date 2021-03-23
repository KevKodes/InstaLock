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

const followUser = (follows, userId) => ({
  type: FOLLOW_USER,
  follows,
  userId,
});

const unfollowUser = (followerId, followedById) => ({
  type: UNFOLLOW_USER,
  followerId,
  followedById,
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

export const newFollowUser = (user1Id, user2Id) => async (dispatch) => {
  const response = await fetch(`/api/follow/${user1Id}/follows`, {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({ follower_id: user2Id }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(followUser(data, user2Id));
  }
};

export const newUnfollowUser = (user1Id, user2Id) => async (dispatch) => {
  const response = await fetch(`/api/follow/${user1Id}/follows`, {
    method: "DELETE",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify({ follower_id: user2Id }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(unfollowUser(data, user2Id));
  }
};

const initialState = {};

const followSession = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case IS_FOLLOWING:
      return { ...state, following: action.followers.follows };
    case IS_FOLLOWED_BY:
      return { ...state, followers: action.followed_by.followed };
    case FOLLOW_USER:
      newState = Object.assign({}, state);
      newState[action.userId] = action.followers;
      return newState;
    case UNFOLLOW_USER:
      newState = Object.assign({}, state);
      delete newState[action.followedById][action.followerId];
      return newState;
    default:
      return state;
  }
};

export default followSession;
