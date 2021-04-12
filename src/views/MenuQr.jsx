import {useState, useEffect} from 'react'
import Products from '../components/Products';
import productService from '../services/products-service';
import { Flex } from '@chakra-ui/react';

const MenuQr = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {    
        const fetchData = async () => {
          setLoading(true);
          const products = await productService.allProducts();
          setProducts(products)
          setLoading(false);
        }

        fetchData();
      }, []);

    return(
        <Flex justifyContent={"center"} height="100vh">
            {loading ? <p> Cargando... </p> :<Products products = {products} loading = {loading} /> }
        </Flex>
    );

}

export default MenuQr;