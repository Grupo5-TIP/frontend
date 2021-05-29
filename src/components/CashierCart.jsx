import { useEffect, useState } from 'react';
import React from "react"
import { Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, VStack, HStack, Image,
    Button, Box, StackDivider, Stack, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Flex
} from "@chakra-ui/react";
import { editCart } from '../utils/editCart';
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

    const handleEditCart = (product, action) => {
        setItemsFromTable(editCart(product, action));
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
            <Flex p="1" h="60px" float="right" paddingRight="20" flexDirection="row">
                <Text>TOTAL:</Text>     
                <Text data-testid="cashier-cart-total">
                    {items.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0)}
                </Text>      
            </Flex>
        )
    }

    const RenderActionButtons = () => {
        return (
            <Box p="1" flexWrap maxWidth="100%" border="4px" align="center" borderRadius="md">
                <Box as="button" borderRadius="sm" h={5} p={5} margin={1}>
                    <Image src="https://bit.ly/3oYRMJu" boxSize="85px"/>
                </Box>
                <Box as="button" borderRadius="sm" h={5} p={5} margin={1} >
                    <Image src="https://bit.ly/2R00V88" boxSize="85px"/>
                </Box>
                <Box as="button" borderRadius="sm" h={5} p={5} margin={1} >
                    <Image src="https://bit.ly/3ftF8z1" boxSize="85px"/>
                </Box>
                <Box as="button" borderRadius="sm" h={5} p={5} margin={1}>
                    <Image src="https://bit.ly/3c1LEed" boxSize="85px"/>
                </Box>
            </Box>
        )
    }

    const RenderItemsList = () => {
        return (
            <Box p="2" flexWrap>
                <Box p="2" flexWrap>
                    <Stack direction={["column", "row"]} spacing="5%">
                        <Box w="30%" h="40px">Producto</Box >
                        <Box w="15%" h="40px">Cantidad</Box >
                        <Box w="15%" h="40px">Precio unitario</Box >
                        <Box w="15%" h="40px">Total</Box >
                    </Stack>
                    <VStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch"
                    >
                        <Box w="100%" h="40px">
                            <Items 
                                items={items} 
                                onDecreaseProduct={(product) => handleEditCart(product, "decrease")}
                                onAddProduct={(product) => handleEditCart(product, "add")}
                                onDeleteProduct={(product) => handleEditCart(product, "delete")}
                            />
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