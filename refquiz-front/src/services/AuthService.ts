import axios from 'axios';
import {AuthRequest} from "../models/AuthRequest";

class AuthService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }


    async authenticate(user: AuthRequest): Promise<AuthRequest> {
        try {
            const response = await axios.post(`${this.baseUrl}`, user);
            return response.data;
        } catch (error: any) {
            console.error('Error authenticating user:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to authenticate user');
        }
    }
}

export default AuthService;
