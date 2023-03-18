import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token"),
    username: null,
    email: null,
    id: null,
    public_id: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_USER":
        case "SIGN_UP":
        case "SIGN_IN":
            toast("Welcome...", {
                position: "top-center",
            });
            const user = jwtDecode(action.token);
            return {
                ...initialState,
                token: action.token,
                username: user.username,
                email: user.email,
                id: user.id,
                public_id: user.public_id,
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            toast("Logged out successfully", {
                position: "top-center",
            })
            return {
                token: null,
                username: null,
                email: null,
                id: null,
                public_id: null,
            };
        default:
            return state;
    }
};  

// export default authReducer;