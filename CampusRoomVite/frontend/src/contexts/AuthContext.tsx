import { createContext, useContext, useEffect, useState, type ReactNode } from "react";


interface User {
    user_id: number;
    username: string;
    role_id: number;
    role_name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("/api/auth/me", {
                    credentials: "include",
                });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Failed to check authentication, error: ", error)
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    checkAuth();
}, []);

async function login(username: string, password: string) {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({username,password}),
    });

    const data = await response.json();

    if (!response.ok) { 
        throw new Error(data.message || "Login Failed");
    }
    setUser(data.user);
}

async function logout() {
    try { 
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
    } finally { 
        setUser(null);
    }
}

const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    loading,
    login,
    logout,
};

return(
<AuthContext.Provider value={value}>
    {children}
</AuthContext.Provider>
);
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
