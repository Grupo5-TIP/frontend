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

    async updateTableOrder(tableId, items ){
        console.log(items);
        return axios.put(API_URL+"/"+tableId, items);
    }
    async requestBill(tableId){
        return axios.get(API_URL+"/request/"+tableId);
    }

    async checkBill(tableId){
        return axios.get(API_URL+"/check/"+tableId);
    }

    async deleteTableOrders(tableId){
        return axios.delete(API_URL+"/"+tableId);
    }
}

export default new TablesService();