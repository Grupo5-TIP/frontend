import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/tables`;

class TablesService{
    async getTables(){
        return axios.get(API_URL);       
    }
    
    async getItemsFromTable(actualTableId){
        return axios.get(API_URL+"/"+actualTableId);
    }
}

export default new TablesService();