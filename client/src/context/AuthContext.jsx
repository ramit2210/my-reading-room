import { useReducer, createContext, useEffect } from "react";
import api from "../utils/api";

const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false,
    token: null,
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
                laoding: true, //user is data is fetching...
                isAuthenticated: false, // make it true after user is loaded
                token: action.payload.token,
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

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const token = state.token;
        if (token) {
            loadUser(token);
        } else {
            dispatch({ type: "AUTH_ERROR", payload: "No token found" });
        }
    }, [state.token]);

    async function login(userData) {
        try {
            const token = await api.post("/auth/login", userData);
            dispatch({ type: "LOGIN_SUCCESS", payload: token.data });
        } catch (error) {
            dispatch({
                type: "LOGIN_FAIL",
                payload: error.response || error.message || "Login Failed",
            });
        }
    }

    async function register(userData) {
        try {
            const token = await api.post("/auth/register", userData);
            dispatch({ type: "REGISTER_SUCCESS", payload: token.data });
        } catch (error) {
            dispatch({
                type: "REGISTER_FAIL",
                payload:
                    error.response || error.message || "Registration Failed",
            });
        }
    }

    async function loadUser() {
        try {
            const userData = await api.get("/auth/user");
            dispatch({ type: "USER_LOADED", payload: userData.data });
        } catch (error) {
            dispatch({
                type: "AUTH_ERROR",
                payload:
                    error.response || error.message || "Authentication Failed",
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
        loading: state.laoding,
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
