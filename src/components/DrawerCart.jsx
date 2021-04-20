import { useEffect, useState } from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Text } from '@chakra-ui/react';
import { Flex } from "@chakra-ui/layout";
import Items from './Items';
import { parseCurrency } from "../utils/currency";


const DrawerCart = ({ items, onClose, isOpen, onDeleteProduct, tableId, ...props }) => {

    const [total, setTotal] = useState(0)

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
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size="xs"
                {...props}
            >
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader
                            bg="theme.200"
                            color="theme.100"
                            size="xs"
                            shadow="md"
                        >
                            <Text
                                fontSize="2xl"
                            >
                                Orden
                            </Text>
                        </DrawerHeader>

                        <DrawerBody >
                            <Flex height="90%">
                                {items.length ?
                                    <Items items={items} onDeleteProduct={onDeleteProduct}></Items>
                                    :
                                    <p>No items...</p>}
                            </Flex>
                        </DrawerBody>
                        
                        <Text
                            color="theme.100"
                            as="samp"
                            fontSize="lg"
                            align="center"
                            >
                                Total: {parseCurrency(total)}
                        </Text>
                        <DrawerFooter>                               
                            <Button mr={2} bg="gray.100" color="theme.100" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button onClick= {() => dispatchCreateCart()} bg="theme.300" color="theme.100">Confirmar</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}

export default DrawerCart;