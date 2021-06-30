import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/tables`;

class TablesService{
    async getTables(){
        return axios.get(API_URL);       
    }
    
    async getItemsFromTable(tableId){
        return axios.get(API_URL+"/items/"+tableId);
    }

    async updateTableOrder(tableId, items ){
        return axios.put(API_URL+"/"+tableId, items);
    }
    async requestBill(tableId){
        return axios.get(API_URL+"/request/"+tableId);
    }

    async getTableById(tableId){
        return axios.get(API_URL+"/"+tableId);
    }

    async deleteTableOrders(tableId){
        return axios.delete(API_URL+"/"+tableId);
    }

    async changeToMpState(tableId) {
        return axios.put(API_URL+"/"+tableId+"/mpstate");
    }
}

export default new TablesService();