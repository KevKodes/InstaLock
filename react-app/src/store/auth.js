const SET_USER = "setUser";
const REMOVE_USER = "removeUser";

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const authenticate = async () => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const login = (email, password) => async (dispatch) => {
  const build = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  const response = await fetch("/api/auth/login", build);
  const user = await response.json();
  dispatch(setUser(user));
  return user;
};

export const logout = () => async (dispatch) => {
  const build = {
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("/api/auth/logout", build);
  dispatch(removeUser());
  const res = await response.json();
  return res;
};

export const signUp = (
  userName,
  firstName,
  lastName,
  email,
  password
) => async (dispatch) => {
  const build = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName,
      firstName,
      lastName,
      email,
      password,
    }),
  };
  const response = await fetch("/api/auth/signup", build);
  const user = await response.json();
  dispatch(setUser(user));
  return user;
};

const initialState = { user: {} };

const authReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default authReducer;
