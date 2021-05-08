import { useEffect, useState } from 'react';
import Items from '../components/Items';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { ModalBody, ModalCloseButton, Button, Grid, Box } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";

const CashierCart = ({ items, onDeleteProduct, tableId, onClose, isOpen, onOpen, ...props }) => {
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

    return (
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Table {tableId} </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                        items.map((item)=> (
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
                    <Th>                          
                        TOTAL PRICE: {items.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0)}
                    </Th>                          
                </Tfoot>
                </Table>
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
                                    items.map((item)=> ( 
                                        <Button colorScheme="teal" variant="outline">
                                            {item.product.name}
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