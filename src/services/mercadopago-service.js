import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/mp/createlink`;
const MP_TOKEN = process.env.REACT_APP_MP_TOKEN
class MercadoPagoService{
    
    async createMPInvoice(tableId, price){
        const mpInvoice = {
            tableId:tableId,
            price:price
        }
        return axios.post(API_URL, mpInvoice);
    }

    async validatePayment(paymentId){
        const headers = {
            Authorization: 'Bearer ' + MP_TOKEN
        }

        console.log(headers);
        return axios.get("https://api.mercadopago.com/v1/payments/"+paymentId, {headers});
    }

}

export default new MercadoPagoService();