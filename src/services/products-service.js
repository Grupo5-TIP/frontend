import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/products`;

class ProductService{
    async getAllProducts(){
        return axios.get(API_URL);
    }    
}

export default new ProductService();
