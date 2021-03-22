const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';

const updateProfile = (profile) => {
    return {
        type: UPDATE_PROFILE,
        profile
    }
}

export const updateProfilePic = ({ id, userName, }) => async (dispatch) => {
    const formData = new FormData();
    formData.append('name', userName);
    const build = {
        method: 'PUT',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
    }
    const response = await fetch(`/api/users/${id}/profile/`, build );
    dispatch(updateProfile(response.data.profile));
    return response.data.profile;
};

const initialState = {};
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return { ...state, [action.profile.id]: action.profile };
        default:
            return state;
    }
};

export default profileReducer;
