import { Flex } from "@chakra-ui/layout";
import Product from './Product';

const Products = ({ products, loading, onAddProduct }) => {
    return (
        <Flex flexDirection={"column"} data-testid="products-loading">

            {!loading && products ?  
                products.map( product =>
                <Product
                    key = {product.id}
                    product={product}
                    onAddProduct ={onAddProduct}
                />
                )
                : <p>Loading...</p>

            }
        </Flex>


    )
}

export default Products