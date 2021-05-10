import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/tables`;

class TablesService{
    async getTables(){
        return axios.get(API_URL);
        /*const tables =  [
            {id:1,  x:0, y:10, state:"inUse", size:6},
            {id:2,  x:450, y:10, state:"empty", size:4},
            {id:3,  x:900, y:100, state:"inUse", size:8},
            {id:4,  x:0, y:330, state:"empty", size:2},
            {id:5,  x:450, y:500, state:"empty", size:2},
            {id:6,  x:900, y:300, state:"empty", size:2},
        ];
        return tables;*/
        
    }
    getItemsFromTable(actualTableId){
        return axios.get(API_URL+"/"+actualTableId);
    }
}

export default new TablesService();