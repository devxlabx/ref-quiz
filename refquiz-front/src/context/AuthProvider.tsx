import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {User} from "../models/User";

// Contexte pour l'authentification
interface AuthContextProps {
    isAuthenticated: boolean;
    user: User;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth', { email, password }, { withCredentials: true });
            setIsAuthenticated(true);
            const _cookies = response.data.cookies;
            let accessToken = null;
            for (let i = 0; i < _cookies.length; i++) {
                if (_cookies[i].name === 'ACCESS_TOKEN') {
                    accessToken = _cookies[i].value;
                    break;
                }
            }
            const res = await axios.get('http://localhost:8080/api/v1/auth/user', { withCredentials: true });
            const user: User = {
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                createdAt: new Date(res.data.createdAt),
                roles: res.data.roles || [],
            };
            setUser(user);
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post("http://localhost:8080/api/v1/auth/logout", null, {
                withCredentials: true,
            });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
