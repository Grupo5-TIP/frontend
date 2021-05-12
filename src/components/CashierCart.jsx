import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { ModalBody, ModalCloseButton, Button, Box } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react";
import tablesService from '../services/tables-service';
import productService from '../services/products-service';

const CashierCart = ({ onDeleteProduct, tableId, onClose, isOpen, onOpen, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actualTableId, setTableId] = useState(tableId);
    const [products, setProducts] = useState({});
    const [items, setItemsFromTable] = useState([]);

    const addItem = (product) => {
        console.log("agregado", product)
        let tempItem = items.find(item => (item.product.name === product.name));
        if (tempItem !== undefined) {
            tempItem.amount = tempItem.amount + 1;
        } else {
            product['new'] = 1;
            const item = {
                id: 0,
                amount: 1,
                product: product
            }
            items.push(item);
            setItemsFromTable(items.map((item)=> (item)));
        }
    }

    const categories = Object.getOwnPropertyNames(products);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (actualTableId !==0) {

                productService.getAllProducts()
                    .then(resp => {
                        setProducts(resp.data);
                    })
                    .catch(err => {
                        setError(err);
                    });
    
                tablesService.getItemsFromTable(actualTableId)
                    .then(resp => {
                        setItemsFromTable(resp.data);
                    })
                    .catch(err => {
                        setError(err);
                    });
            }
            setLoading(false);
        }
        fetchData();
    }, [actualTableId]);

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
                                    items.map(
                                        (item) => (
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
                                        TOTAL PRICE: {items.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0)}
                                    </Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </Box>
                    <Accordion allowToggle >
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="center">
                                        Available products
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
                                {   
                                    categories.map((category) =>
                                        <Accordion allowToggle >
                                            <AccordionItem key={category}>
                                                <h2>
                                                    <AccordionButton
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        maxWidth="100%"
                                                        _expanded={{ bg: "theme.100", color: "white" }}>

                                                        <Box flex="1">
                                                            {category}
                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel width="100%">
                                                    {

                                                        products[category].map((product) => (
                                                            <Button margin={2} colorScheme="teal" variant="outline" onClick={() => addItem(product)}>
                                                                {product.name}
                                                            </Button>
                                                        ))
                                                    }
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>

                                    )
                                }
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