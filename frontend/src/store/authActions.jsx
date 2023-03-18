import axios from "axios";
import { url } from "../api";
import { toast } from "react-toastify";

export const signUp = (user) => {
    return (dispatch) => {
        axios
            .post(`${url}/sign-up`, user)
            .then((token) => {
                localStorage.setItem("token", token.data);

                dispatch({
                    type: "SIGN_UP",
                    token: token.data,
                });
            })
            .catch((err) => {
                console.log(err.response);

                toast.error(err.response?.data, {
                    position: "top-center",
                });
            });
    };
};
export const signIn = (credentials) => {
    return (dispatch) => {
        axios
            .post(`${url}/login`, credentials)
            .then((token) => {
                localStorage.setItem("token", token.data);

                dispatch({
                    type: "SIGN_IN",
                    token: token.data,
                });
            })
            .catch((err) => {
                console.log(err.response);

                toast.error(err.response?.data, {
                    position: "top-center",
                });
            });
    };
};

// Loading the user data
export const loadUser = () => {
    return (dispatch, getState) => {
        // const token = getState().auth.token;
        const { auth } = getState();
        const token = auth?.token;

        if (token) {
            dispatch({
                type: "LOAD_USER",
                token,
            })
        } else {
            return null;
        }
    }
};

// Logging out
export const logOut = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
        });
    };
}