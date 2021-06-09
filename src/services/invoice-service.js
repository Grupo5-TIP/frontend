import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/invoices`;

class InvoiceService{
    
    async createInvoice(tableId, paymentType){
        const invoice = {
            paymentType:paymentType,
        }
        return axios.post(API_URL+"/"+tableId, invoice);
    }

}

export default new InvoiceService();