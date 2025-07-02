import { useReducer, createContext, useEffect } from "react";
import api from "../utils/api";

const initialState = {
    loading: true,
    error: null,
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    user: null,
};

export const AuthContext = createContext(initialState);

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        case "REGISTER_SUCCESS":
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                loading: true, //user is data is fetching...
                isAuthenticated: false, // make it true after user is loaded
                token: action.payload.token,
                error: null,
            };

        case "USER_LOADED":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };

        case "LOGOUT":
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":
            localStorage.removeItem("token");
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                user: null,
                error: action.payload,
            };

        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // console.log(state.token);
        if (state.token && !state.isAuthenticated && state.loading) {
            loadUser();
        } else if (!state.token && state.loading) {
            dispatch({ type: "AUTH_ERROR", payload: "No token found" });
        }
    }, [state.token]);

    async function login(userData) {
        try {
            // console.log("login token is processing");
            const res = await api.post("/auth/login", userData);
            // console.log(res.data);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({
                type: "LOGIN_FAIL",
                payload: error.response?.data?.message || "Login failed",
            });
        }
    }

    async function register(userData) {
        try {
            const res = await api.post("/auth/register", userData);
            // console.log(res.data);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
        } catch (error) {
            dispatch({
                type: "REGISTER_FAIL",
                payload: error.response?.data?.message || "Registration Failed",
            });
        }
    }

    async function loadUser() {
        const tokenToUse = state.token || localStorage.getItem("token");

        if (tokenToUse) {
            try {
                const userData = await api.get("/auth/user");
                dispatch({ type: "USER_LOADED", payload: userData.data });
            } catch (error) {
                dispatch({
                    type: "AUTH_ERROR",
                    payload:
                        error.response ||
                        error.message ||
                        "Authentication Failed",
                });
            }
        } else {
            dispatch({
                type: "AUTH_ERROR",
                payload: "No token found",
            });
        }
    }

    function logout() {
        dispatch({ type: "LOGOUT" });
    }

    function clearErrors(params) {
        dispatch({ type: "CLEAR_ERRORS" });
    }

    const contextValue = {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
        login,
        register,
        logout,
        clearErrors,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
