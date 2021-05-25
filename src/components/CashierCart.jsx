import { useEffect, useState } from 'react';
import React from "react"
import { Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, VStack, HStack, 
    Button, Box, StackDivider, Stack, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Flex
} from "@chakra-ui/react";
import tablesService from '../services/tables-service';
import productService from '../services/products-service';
import Items from '../components/Items'

const CashierCart = ({ onDeleteProduct, tableId, onClose, isOpenModal, onOpen, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actualTableId, setTableId] = useState(tableId);
    const [products, setProducts] = useState({});
    const [items, setItemsFromTable] = useState([]);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");

    const addItem = (product) => {
        let tempItem = items.find(item => (item.product.name === product.name));
        if (tempItem !== undefined) {
            tempItem.amount = tempItem.amount + 1;
            setItemsFromTable(items.map((item) => (item)))
        } else {
            product['new'] = 1;
            const item = {
                id: 0,
                amount: 1,
                product: product
            }
            items.push(item);
            setItemsFromTable(items.map((item) => (item)));
        }
    }

    const categories = Object.getOwnPropertyNames(products);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (actualTableId !== 0) {

                productService.getAllProducts()
                    .then(resp => {

                        tablesService.getItemsFromTable(actualTableId)
                            .then(respTableService => {
                                setProducts(resp.data);
                                setItemsFromTable(respTableService.data);
                            })
                            .catch(err => {
                                setProducts(resp.data);
                                setItemsFromTable([]);
                            });
                    })
                    .catch(err => {
                        setError(err);
                    });
            }
            setLoading(false);
        }
        fetchData();
    }, [actualTableId]);



    const RenderCategories = () => {
        return (

            <Accordion allowToggle >
                <AccordionItem>
                    <Box>
                        <AccordionButton>
                            <Box flex="1" textAlign="center" data-testid="cashier-cart-available">
                                Productos disponibles
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </Box>
                    <AccordionPanel>
                        {
                            categories.map((category) =>
                                <Accordion allowToggle key={category}>
                                    <AccordionItem key={category}>
                                            <AccordionButton
                                                justifyContent="space-between"
                                                alignItems="center"
                                                maxWidth="100%"
                                                _expanded={{ bg: "theme.100", color: "white" }}
                                                key={category}>
                                                    
                                                <Box flex="1">
                                                    {category}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        <AccordionPanel width="100%">
                                            {
                                                products[category].map((product) => (
                                                    <Button key={product.id} margin={2} colorScheme="teal" variant="outline" onClick={() => addItem(product)}>
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
        )
    }
    const RenderTableTotal = () => {
        return (
            <Box p="2" flexWrap>
                <Stack direction={["column", "row"]} spacing="24px">
                    <Box w="100%" h="40px">
                        TOTAL: <Text data-testid="cashier-cart-total">{items.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0)}</Text>
                    </Box >
                </Stack>
            </Box>
        )
    }

    const RenderActionButtons = () => {
        return (
            <Box p="2" flexWrap maxWidth="100%">
            {
                [1,2,3,4,5].map((product) => (
                    <Box as="button" borderRadius="md" bg="tomato" color="white" px={4} h={8} p={6} margin={2}>
                        prueba
                    </Box>
                ))
            }
            </Box>
        )
    }

    const RenderItemsList = () => {
        return (
            <Box p="2" flexWrap>
                <Box p="2" flexWrap>
                    <Stack direction={["column", "row"]} spacing="5%">
                        <Box w="25%" h="40px">Producto</Box >
                        <Box w="25%" h="40px">Cantidad</Box >
                        <Box w="25%" h="40px">Precio unitario</Box >
                        <Box w="25%" h="40px">Total</Box >
                    </Stack>
                    <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch"

                    >
                        <Box w="100%" h="40px">
                            <Items items={items}></Items>
                        </Box>
                    </VStack>

                </Box>    
                
            </Box>
        )
    }

    return (
        <>
            {
                loading ?
                    <Box>Buscando...</Box>
                    :
                    !error ?
                        <Modal onClose={onClose} size="full" isOpen={isOpenModal} scrollBehavior={scrollBehavior}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Mesa: {tableId} </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <RenderItemsList/>
                                </ModalBody>
                                <ModalBody>
                                    <RenderTableTotal/>
                                    <RenderCategories/>
                                    <RenderActionButtons/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onClose} data-testid="cashier-cart-button-close">Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        : null
            }
        </>
    )
}

export default CashierCart;