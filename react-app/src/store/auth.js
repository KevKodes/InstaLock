const SET_USER = "auth/SET_USER";
const REMOVE_USER = "auth/REMOVE_USER";

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
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  console.log("THIS IS THE RESPPONNSSSSSSSSEEEE", response);
  const data = await response.json();
  console.log("THIS IS THE DATAAAAAAAAAA", data);
  dispatch(setUser(data.user));
  return data;
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

const initialState = { user: null };

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
