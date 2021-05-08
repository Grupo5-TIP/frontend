import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/orders`;

class OrderService{
    confirmOrder(token){
        axios.post(API_URL, token);
    }

    getOrderByTableId(tableId){
        return axios.get(API_URL+"/"+tableId);
    }
}

export default new OrderService();