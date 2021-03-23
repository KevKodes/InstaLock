import { csrfFetch } from "./csrf";
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

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
  const response = await csrfFetch("/api/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const build = {
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch("/api/auth/logout/", build);
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
  const response = await csrfFetch("/api/auth/signup/", build);
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await fetch("/api/auth/");
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
