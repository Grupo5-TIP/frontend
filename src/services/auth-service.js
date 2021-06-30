import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/auth`;

class AuthService{
    
    async login(username, password){
        const loginDTO = {
            username,
            password
        }
        return axios.post(API_URL+"/login", loginDTO);
    }

}

export default new AuthService();