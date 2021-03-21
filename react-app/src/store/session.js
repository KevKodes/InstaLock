const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
    type: SET_USER,
    user,
});

const removeUser = () => ({
    type: REMOVE_USER,
});

export const login = (email, password) => async (dispatch) => {
    const build = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
        }),
    };
    const response = await fetch('/api/auth/login', build );
    const user = await response.json()
    dispatch(setUser(user));
    return user
};

export const signUp = (username, firstname, lastname, email, password) => async (dispatch) => {
    const build = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            firstname,
            lastname,
            email,
            password,
        }),
    }
    const response = await fetch("/api/auth/signup", build );
    const user = await response.json()
    dispatch(setUser(user));
    return user;
};

export const logout = () => async (dispatch) => {
    const build = {
        headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch('/api/auth/logout', build );
    dispatch(removeUser());
    const res = await response.json()
    return res;
};

const initialState = {
    user: {
        email: 'whyisthissohard@aa.io',
        username: 'bohatestackoverflow',
    }
};

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
