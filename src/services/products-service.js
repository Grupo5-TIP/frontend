import axios from 'axios';
import { REST_API_URL } from './constants'

const API_URL = `${REST_API_URL}/products`;

class ProductService{
    async allProducts(){
        //const { data } = await axios.get(API_URL);
        const data =  [
            {id:1, name:"Coca-Cola", description:"Coca-Cola 500ml", price:120.00, img:"https://www.pasosonline.com.ar/wp-content/uploads/2018/08/coca-cola-225L-almacen-gaseosas-casa-segal-mendoza-600x600-1.jpg"},
            {id:2, name:"Milanesa con papas", description:"Milanesa de ternera con papas fritas o españolas", price:450.00, img:"https://media-cdn.tripadvisor.com/media/photo-s/05/63/ac/3d/milanesa-con-papas-fritas.jpg"},
            {id:3, name:"Copa de vino", description:"Vino del día", price:120.00, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/A_glass_of_red_wine.jpg/1200px-A_glass_of_red_wine.jpg"},
        ];
        return data;
    }
    
}

export default new ProductService();
