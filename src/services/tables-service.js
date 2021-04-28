import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/tables`;

class TablesService{
    async getTables(){
        //return axios.get(API_URL);
        const tables =  [
            {id:1,  x:10, y:10, state:"inUse"},
            {id:2,  x:30, y:10, state:"empty"},
            {id:3,  x:50, y:10, state:"inUse"},
            {id:4,  x:50, y:10, state:"empty"},
            {id:5,  x:50, y:10, state:"empty"},
            {id:6,  x:50, y:10, state:"empty"},
        ];
        return tables;
        
    }
}

export default new TablesService();