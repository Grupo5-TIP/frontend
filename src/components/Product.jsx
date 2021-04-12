import { Stack, Button, Text, Image, Box } from "@chakra-ui/react"
import {parseCurrency} from "../utils/currency";

const Product = (product) => {
    const {id, name, description, price, img} = product.product;

    return (
        <Stack
            key={id}
            borderColor="gray.100"
            borderRadius="md"
            borderWidth={1}
            justifyContent="space-between"
            spacing={2}
            marginBottom={5}
            sm="30em"
            shadow="md"
            onClick= {() => console.log("agregar...")}
        >
            <Stack direction="row" padding={1}>
                <Image
                    src={img}
                    backgroundColor="white"
                    borderRadius="full"
                    boxSize= "150px"
                    loading="lazy"
                    alt={name}
                />
                <Stack justifyContent="space-between" spacing={1}>
                    
                        <Stack spacing={1}>
                            <Text fontWeight="500">{name}</Text>
                            <Text color="red.500" fontSize="sm" >{description}</Text>
                        </Stack>
                        <Stack alignItems="flex-end" direction="row" justifyContent="space-between">
                            <Text color="red.500" fontSize="sm" fontWeight="500"> {parseCurrency(price)} </Text>
                        </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Product