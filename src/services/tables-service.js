import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/tables`;

class TablesService{
    async getTables(){
        return axios.get(API_URL);       
    }
    
    async getItemsFromTable(tableId){
        return axios.get(API_URL+"/"+tableId);
    }

    async requestBill(tableId){
        return axios.get(API_URL+"/request/"+tableId);
    }
}

export default new TablesService();