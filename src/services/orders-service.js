import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/orders`;

class OrderService{
    confirmOrder(token){
        axios.post(API_URL, token);
    }
}

export default new OrderService();