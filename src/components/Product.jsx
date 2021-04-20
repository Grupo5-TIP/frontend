<<<<<<< HEAD
import { Stack, Text, Heading, Image, Alert, AlertIcon} from "@chakra-ui/react"
=======
import { Stack, Text, Image } from "@chakra-ui/react"
>>>>>>> 28bd134c5d0a5fa502f68294efe9c4cc92c79140
import {parseCurrency} from "../utils/currency";
import {useState} from 'react';

const Product = ({product, onAddProduct}) => {
<<<<<<< HEAD
    const [isAdded, setIsAdded] = useState(false);
    const onClose = () => setTimeout(() => setIsAdded(false), 2000);
    const {id, name, description, price, image} = product;
=======
    const {id, name, description, price, img} = product;
>>>>>>> 28bd134c5d0a5fa502f68294efe9c4cc92c79140

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
            justifyContent="space-between"
            spacing={1}
            marginBottom={3}
            sm="30em"
            shadow="md"
<<<<<<< HEAD
            backgroundAttachment={image}
            onClick= {() => addProduct(product)}
=======
            backgroundAttachment={img}
            onClick= {() => onAddProduct(product)}
>>>>>>> 28bd134c5d0a5fa502f68294efe9c4cc92c79140
            as="button"
            alignItems={"center"} 
        >            
            <Stack  direction="column" padding={0} >
<<<<<<< HEAD
                <Heading fontSize="50px" color="theme.100">{name}</Heading>
=======
                <Text fontSize="50px" color="theme.100">{name}</Text>
>>>>>>> 28bd134c5d0a5fa502f68294efe9c4cc92c79140
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