import { Flex } from "@chakra-ui/layout";
import Product from './Product';

const Products = ({products, loading}) => {
    return (
        <Flex flexDirection={"column"}>
            {!loading ?  
                products.map( product =>
                <Product
                    key = {product.id}
                    product={product}
                />
                )
            : <p>Loading...</p>}
        </Flex>
    )
}

export default Products