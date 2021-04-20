import { Stack, Text, Heading, Image, Alert, AlertIcon} from "@chakra-ui/react"
import {parseCurrency} from "../utils/currency";
import {useState} from 'react';

const Product = ({product, onAddProduct}) => {
    const [isAdded, setIsAdded] = useState(false);
    const onClose = () => setTimeout(() => setIsAdded(false), 2000);
    const {id, name, description, price, image} = product;

    const addProduct = (product) =>{
        setIsAdded(true);
        onAddProduct(product);
    }
    function renderProductAddedCheck() {
        onClose();
        return (
            <Alert status="success" variant="solid" justifyContent="center" textAlign="center">
                <AlertIcon />
                El producto se agregó correctamente al carrito!
            </Alert>
        )
    }
    return (
        <Stack
            key={id}
            borderColor="theme.300"
            borderRadius="md"
            borderWidth={3}
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
                <Heading fontSize="50px" color="theme.100">{name}</Heading>
                <Image
                    src={image}
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
            {isAdded ? renderProductAddedCheck() : null}          
            </Stack>
        </Stack>
    );
}

export default Product;