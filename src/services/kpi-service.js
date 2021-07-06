import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/auth`;

class KpiService{
    
    async getDataLastMonths(){
        const months = [
            {
                name: "Enero",
                amount: 30500
            },
            {
                name: "Febrero",
                amount: 25500
            },
            ,
            {
                name: "Marzo",
                amount: 29000
            },
            {
                name: "Abril",
                amount: 20500
            },
            ,
            {
                name: "Mayo",
                amount: 12500
            },
            ,
            {
                name: "Junio",
                amount: 10500
            },
            ,
            {
                name: "Julio",
                amount: 14500
            },
                
        ]

        return months;
        //return axios.post(API_URL+"/login", loginDTO);
    }

}

export default new KpiService();