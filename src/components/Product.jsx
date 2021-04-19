import { Stack, Text, Image } from "@chakra-ui/react"
import {parseCurrency} from "../utils/currency";

const Product = ({product, onAddProduct}) => {
    const {id, name, description, price, img} = product;

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
            backgroundAttachment={img}
            onClick= {() => onAddProduct(product)}
            as="button"
            alignItems={"center"} 
        >            
            <Stack  direction="column" padding={0} >
                <Text fontSize="50px" color="theme.100">{name}</Text>
                <Image
                    src={img}
                    backgroundColor="white"
                    borderRadius="none"
                    loading="lazy"
                    alt={name}
                />
                <Stack justifyContent="space-between" spacing={1}>                    
                    <Stack spacing={1}>                        
                        <Text color="theme.200" fontSize="xl" >{description}</Text>
                    </Stack>
                    <Stack justifyContent="space-between">
                        <Text color="theme.500" fontSize="sm" fontWeight="700"> {parseCurrency(price)} </Text>
                    </Stack>
                </Stack>
            </Stack>
            
        </Stack>
    );
}

export default Product