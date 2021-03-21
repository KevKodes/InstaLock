import { updateLikes } from  "./posts";

export const likePost = (like) => async (dispatch) => {
    const build = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(like),
    }
    const response = await fetch("/api/postLikes/", build);
    if (response.ok) {
        dispatch(updateLikes(like));
        return response;
    };
};
