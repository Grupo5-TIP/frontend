import { Stack, Text, Heading, Image, Alert, AlertIcon, ChakraProvider} from "@chakra-ui/react"
import {parseCurrency} from "../utils/currency";
import theme from "../utils/theme";
import {useState} from 'react';

const Product = (product) => {
    const {id, name, description, price, image} = product.product;
    const [isAdded, setIsAdded] = useState(false);
    const onClose = () => setTimeout(() => setIsAdded(false), 2000);

    function renderiza() {
        onClose();
        return (
            <Alert status="success" variant="solid" justifyContent="center" textAlign="center">
                <AlertIcon />
                El producto se agregó correctamente al carrito!
            </Alert>
        )
    }
    return (
        <ChakraProvider theme={theme}>
            <Stack
                key={id}
                borderColor="gray.400"
                borderRadius="md"
                borderWidth={3}
                justifyContent="space-between"
                spacing={0}
                marginBottom={3}
                sm="30em"
                shadow="md"
                onClick= {() => setIsAdded(true)}
                as="button"
            >
                <Stack direction="column" padding={0} >
                    <Heading fontSize="50px" color="gray.600" padding={0}>{name}</Heading>
                    <Image
                        src={image}
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
            {isAdded ? renderiza() : null}          
            </Stack>
        </ChakraProvider>
    );
}

export default Product