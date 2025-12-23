import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export type UserRole = 'admin' | 'user' | 'guest';

interface User {
    username: string;
    role: UserRole;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const history = useHistory();

    // Mock persistence
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username: string, role: UserRole) => {
        const newUser = { username, role };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        if (role === 'admin') {
            history.push('/admin');
        } else {
            history.push('/');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        history.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
