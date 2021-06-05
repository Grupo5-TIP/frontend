import { useEffect, useState } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Text, Image } from '@chakra-ui/react';
import { Flex, Box } from "@chakra-ui/layout";
import orderService from '../services/orders-service';
import Items from './Items';
import AlertDisplay from './AlertDisplay';
import { parseCurrency } from "../utils/currency";
import { hover } from '../utils/buttonDesign';

const DrawerCart = ({ items, onClose, isOpen, onDecreaseProduct, tableId, onConfirm, onAddProduct, onDeleteProduct, ...props }) => {
    const [total, setTotal] = useState(0)
    //Order confirmation
    const [isAdded, setIsAdded] = useState(false);
    const confirmationAlert = () => { setTimeout(() => setIsAdded(false), 2000); }
    
    useEffect(() => {
        const calculate = () => {
            const red = items.reduce((total, item) => total + item.product.price * item.amount, 0 );
            setTotal(red);
        }

        calculate();
    }, [items]);

    const dispatchCreateCart = () =>{
        const orderDTO = {
            id:0,
            tableId:tableId,
            orderedItems:items
        }
        orderService.confirmOrder(orderDTO)
            .then(resp => {
                setIsAdded(true);
                onConfirm();
            })
            .catch(err => {
                setIsAdded(false);
            });
        
    }

    function renderOrderConfirmationCheck() {
        confirmationAlert();
        setTimeout(() => onClose(), 2000)
        return <AlertDisplay status={"success"} message={"El pedido fue confirmado!"}/>
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="sm"
                {...props}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton 
                            color="whiteAlpha.900"
                        />
                        <DrawerHeader
                            h="100px"
                            bg="theme.100"
                            size="xs"
                            shadow="md"
                        >                            
                            <Box 
                                w="100%"
                                h="100%"
                                bg="gray.200"
                                shadow="md"
                            >
                                <Image
                                    w="100%"
                                    h="100%"                            
                                    src="https://bit.ly/3y3yaIh"
                                />
                            </Box>
                        </DrawerHeader>

                        <DrawerBody>
                            <Flex height="90%">
                                {
                                    items.length ?
                                        <Items 
                                            items={items} 
                                            onDecreaseProduct={onDecreaseProduct} 
                                            onAddProduct={onAddProduct}
                                            onDeleteProduct={onDeleteProduct}
                                        ></Items>
                                    :
                                        <Text color="gray.400" data-testid="drawer-cart-error">No hay elementos en tu carrito</Text>
                                }
                            </Flex>
                        </DrawerBody>
                        
                        
                        <Text
                            color="theme.500"
                            fontWeight="900"                     
                            fontSize="lg"

                            padding={3}
                            data-testid="drawer-cart-total"
                            >
                                Total: {parseCurrency(total)}
                        </Text>
                        <DrawerFooter >                               
                            <Button mr={2} bg="gray.100" color="theme.100" variant="outline" onClick={onClose} data-testid="drawer-cart-cancel-button">Cancelar</Button>
                            <Button  _hover={hover} onClick= {() => dispatchCreateCart()} bg="theme.100" color="gray.100" data-testid="drawer-cart-confirm-button">Confirmar</Button>
                        </DrawerFooter>
                        {isAdded ? renderOrderConfirmationCheck() : null}
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default DrawerCart;