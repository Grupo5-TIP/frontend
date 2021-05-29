import { useEffect, useState } from 'react';
import {
    Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter,
    Button, Image, Box, Flex, Text
} from '@chakra-ui/react';


import orderService from '../services/orders-service';

const Orders = ({ tableId, onClose, isOpen }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            orderService.getOrderByTableId(tableId)
                .then(resp => {
                    setOrders(resp.data);
                })
                .catch(err => {
                    setError(err);
                });
            setLoading(false);
        }
        //fetchData();
        console.log("tableId", tableId);
        console.log("orders", orders);
    }, [])

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="sm"
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
                                    
                                    orders && orders.length >0 ?
                                        orders.map(order => {
                                            {console.log("consoleando por la vida", order)}
                                        <p color="theme.100">asdasds</p>
                                    })
                                        
                                    : <Text color="gray.400" data-testid="drawer-cart-error">No hay compras, hace la primera!</Text>
                                }
                            </Flex>
                        </DrawerBody>


                        <DrawerFooter >
                            <Button mr={2} bg="gray.100" color="theme.100" variant="outline" onClick={onClose} data-testid="drawer-cart-cancel-button">Cancelar</Button>
                            <Button onClick={() => console.log("pedir cuenta...")} bg="theme.100" color="gray.100" data-testid="drawer-cart-confirm-button">Pedir cuenta</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default Orders;