import { Stack, Text, Image } from "@chakra-ui/react"
import {parseCurrency} from "../utils/currency";

const Product = (product) => {
    const {id, name, description, price, img} = product.product;

    return (
        <Stack
            key={id}
            borderColor="gray.400"
            borderRadius="md"
            borderWidth={3}
            justifyContent="space-between"
            spacing={1}
            marginBottom={3}
            sm="30em"
            shadow="md"
            backgroundAttachment={img}
            onClick= {() => console.log("agregar...")}
            as="button"
        >            
            <Stack direction="column" padding={0} >
                <Text fontSize="50px" color="gray.600">{name}</Text>
                <Image
                    src={img}
                    backgroundColor="white"
                    borderRadius="none"
                    loading="lazy"
                    alt={name}
                />
                <Stack justifyContent="space-between" spacing={1}>                    
                    <Stack spacing={1}>                        
                        <Text color="blue.500" fontSize="sm" >{description}</Text>
                    </Stack>
                    <Stack justifyContent="space-between">
                        <Text color="red.700" fontSize="sm" fontWeight="700"> {parseCurrency(price)} </Text>
                    </Stack>
                </Stack>
            </Stack>
            
        </Stack>
    );
}

export default Product