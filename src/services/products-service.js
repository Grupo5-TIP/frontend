import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/products`;

class ProductService{
    async allProducts(){
        //const { data } = await axios.get(API_URL);
        const data =  [
            {id:1, name:"Coca-Cola", description:"Coca-Cola 500ml", price:120.00, img:"https://assets.entrepreneur.com/content/3x2/2000/20200122182134-Depositphotos-147827697-l-2015.jpeg?width=700&crop=2:1"},
            {id:2, name:"Milanesa con papas", description:"Milanesa de ternera con papas fritas o españolas", price:450.00, img:"https://www.pngkey.com/png/detail/346-3464387_imgenes-de-papas-fritas-milanesa-de-pollo-con.png"},
            {id:3, name:"Tiramisu", description:"Verdadero tiramisu italiano", price:120.00, img:"https://vod-hogarmania.atresmedia.com/cocinatis/images/images01/2020/09/01/5f4e2a588bf27b0001846f11/1239x697.jpg"},
        ];
        return data;
    }

    async getAllProducts(){
        return axios.get(API_URL);
    }    
}

export default new ProductService();
