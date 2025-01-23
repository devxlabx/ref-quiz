import axios from 'axios';
import {User} from '../models/User';

class UserService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    
    async createUser(user: User): Promise<User> {
        try {
            const response = await axios.post(`${this.baseUrl}/create-user`, user);
            return response.data; 
        } catch (error: any) {
            console.error('Error creating user:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Failed to create user');
        }
    }
}

export default UserService;
