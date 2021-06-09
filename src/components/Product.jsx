import { Stack, Text, Heading, Image, Flex } from "@chakra-ui/react"
import { parseCurrency } from "../utils/currency";

const Product = ({ product, onAddProduct }) => {
    const { id, name, description, price, image } = product;

    const addProduct = (product) => {
        onAddProduct(product);
    }

    return (
        <Flex
            bg="white"
            w="280px"
            margin="30px 0"
            min-height="180px"
            boxShadow="0 8px 6px -8px black"
            direction="column"
            onClick= {() => addProduct(product)}
        >
            <Image
                src={image}
                alt={name}
                width="250px"
                height="100px"
                marginLeft="-10px"
                marginTop="-20px"
                fit="cover"
                boxShadow="0px 15px 10px -5px #000000"
            />
            <Stack padding={2}>
                <Heading fontSize="25px" color="theme.100" data-testid="product-name">{name}</Heading>
                <Stack justifyContent="space-between" >                 
                        <Text color="theme.200" fontSize="md" fontWeight="400" data-testid="product-description">{description}</Text>   
                        <Text color="theme.200" fontSize="sm" fontWeight="900" data-testid="product-price"> {parseCurrency(price)} </Text>
                </Stack>
            </Stack>


        </Flex>
    );
}

export default Product;