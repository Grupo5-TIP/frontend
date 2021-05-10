import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { ModalBody, ModalCloseButton, Button, Grid, Box } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";

const CashierCart = ({ items, products, onDeleteProduct, tableId, onClose, isOpen, onOpen, ...props }) => {
    const [total, setTotal] = useState(0)
    //Order confirmation
    const [isAdded, setIsAdded] = useState(false);
    const [itemsOfTable, setItemList] = useState(items);
    const confirmationAlert = () => { setTimeout(() => setIsAdded(false), 2000); }

    useEffect(() => {
        const calculate = () => {
            const red = items.reduce((total, item) => total + item.product.price * item.amount, 0);
            setTotal(red);
        }

        calculate();
    }, [items]);

    const addItem = (product) => {
        console.log(itemsOfTable);
        let tempItem = itemsOfTable.find(item => (item.product.name === product.name));
        if (tempItem != undefined) {
            tempItem.amount = tempItem.amount + 1;
        } else {
            product['new'] = 1;
            const item = {
                id : 0,
                amount : 1,
                product : product
            }
            itemsOfTable.push(item);
        }        
        setItemList([...itemsOfTable]);
    }

    return (
        
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Table {tableId} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box p="2" flexWrap>
                    <Table variant="striped" colorScheme="teal" size="lg">
                        <Thead>
                            <Tr>
                                <Td>Product</Td>
                                <Td>Amount</Td>
                                <Td>Unit Price</Td>
                                <Td>Total</Td>
                            </Tr>
                        </Thead>
                        <Tbody>                    
                            {
                                itemsOfTable.map((item)=> (
                                    <Tr>
                                        <Td>{item.product.name}</Td>
                                        <Td>{item.amount}</Td>
                                        <Td>{item.product.price}</Td>
                                        <Td>{item.amount * item.product.price}</Td>
                                    </Tr>            
                                    )
                                )
                            }                                          
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>                          
                                    TOTAL PRICE: {itemsOfTable.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0)}
                                </Th>
                            </Tr>                          
                        </Tfoot>
                    </Table>
                </Box>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="center">
                                Available products
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Grid templateColumns="repeat(5, 1fr)" gap={2}>
                                {
                                    products.map((product)=> ( 
                                        <Button colorScheme="teal" variant="outline" onClick = {() => addItem(product)}>
                                            {product.name}
                                        </Button>
                                    ))
                                }
                            </Grid>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CashierCart;