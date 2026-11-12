
import {
    createContext,
    useContext,
    useState
} from "react";

import API from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            localStorage.removeItem("user");
            return null;
        }
    });

    const [loading, setLoading] = useState(false);

    // Register user
    const register = async (userData) => {
        const response = await API.post(
            "/auth/register",
            userData
        );

        return response.data;
    };

    // Login user
    const login = async (credentials) => {
        setLoading(true);

        try {
            const response = await API.post(
                "/auth/login",
                credentials
            );

            const token = response.data.access_token;

            const userData = response.data.user;

            if (!token) {
                throw new Error("Access token was not returned.");
            }

            localStorage.setItem("access_token", token);

            if (userData) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(userData)
                );
            }

            setUser(userData || {
                email: credentials.email
            });

            return response.data;

        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        setUser(null);
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: Boolean(user)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom authentication hook
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};
