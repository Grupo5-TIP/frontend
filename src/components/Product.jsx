import { Stack, Text, Heading, Image } from "@chakra-ui/react"
import {parseCurrency} from "../utils/currency";

const Product = ({product, onAddProduct}) => {
    const {id, name, description, price, image} = product;

    const addProduct = (product) =>{
        onAddProduct(product);
    }

    return (
        <Stack
            key={id}
            borderColor="theme.300"
            borderRadius="md"
            justifyContent="space-between"
            spacing={1}
            marginBottom={3}
            sm="30em"
            shadow="md"
            backgroundAttachment={image}
            onClick= {() => addProduct(product)}
            as="button"
            alignItems={"center"} 
        >            
            <Stack  direction="column" padding={0} >
                <Heading fontSize="30px" color="theme.100" data-testid="product-name">{name}</Heading>
                <Image
                    src={image}
                    backgroundColor="white"
                    borderRadius="none"
                    loading="lazy"
                    alt={name}
                    width="80%"
                    height="60%"
                    alignSelf="center"
                />
                <Stack justifyContent="space-between" spacing={1}>                    
                    <Stack spacing={1}>                        
                        <Text color="theme.200" fontSize="xl" data-testid="product-description">{description}</Text>
                    </Stack>
                    <Stack justifyContent="space-between">
                        <Text color="theme.500" fontSize="sm" fontWeight="700" data-testid="product-price"> {parseCurrency(price)} </Text>
                    </Stack>
                </Stack>        
            </Stack>
        </Stack>
    );
}

export default Product;