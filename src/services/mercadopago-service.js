import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/mp/createlink`;

class MercadoPagoService{
    
    async createMPInvoice(tableId, price){
        const mpInvoice = {
            tableId:tableId,
            price:price
        }
        return axios.post(API_URL, mpInvoice);
    }

    async validatePayment(paymentId){
        return axios.get("https://api.mercadopago.com/v1/payments/"+paymentId);
    }

}

export default new MercadoPagoService();