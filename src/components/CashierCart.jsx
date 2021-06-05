import { useEffect, useState } from 'react';
import React from "react"
import {
    Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, VStack, Button, Box,
    StackDivider, Stack, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Flex
} from "@chakra-ui/react";
import { editCart } from '../utils/editCart';
import tablesService from '../services/tables-service';
import productService from '../services/products-service';
import Items from '../components/Items';
import DialogDisplay from '../components/DialogDisplay';
import { hover, expanded } from '../utils/buttonDesign';
import { RiDeleteBin5Line } from 'react-icons/ri'
import { ImCancelCircle } from 'react-icons/im'
import { BiSave } from 'react-icons/bi'
import { FaMoneyBillWave } from 'react-icons/fa'



const CashierCart = ({ tableId, onCloseModal, isOpenModal, onOpenModal, ...props }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actualTableId,] = useState(tableId);
    const [products, setProducts] = useState({});
    const [items, setItemsFromTable] = useState([]);
    const [scrollBehavior,] = React.useState("inside");
    const [isOpenVoid, setIsOpenVoid] = React.useState(false)
    const [isOpenCancel, setIsOpenCancel] = React.useState(false)
    const [isOpenSave, setIsOpenSave] = React.useState(false)
    const [isOpenBill, setIsOpenBill] = React.useState(false)

    const onClose = () => {
        setIsOpenVoid(false);
        setIsOpenCancel(false);
        setIsOpenSave(false);
        setIsOpenBill(false);
    }

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
                                setItemsFromTable(respTableService.data.map((item) => (item)));
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
                <AccordionItem >
                    <Box >
                        <AccordionButton
                            bg="theme.100"
                            color="white"
                            justifyContent="space-between"
                            alignItems="center"
                            maxWidth="100%"
                            _expanded={expanded}
                            _hover={hover}>
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
                                            key={category}
                                            _expanded={expanded}
                                            _hover={hover}>

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
                <Text fontWeight="semibold">TOTAL: </Text>
                <Text fontWeight="semibold" data-testid="cashier-cart-total">
                    {items.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0)}
                </Text>
            </Flex>
        )
    }

    const RenderActionButtons = () => {
        return (
            <Box p="1" flexWrap maxWidth="100%" border="1px" align="center" borderRadius="none">
                <Button bg="theme.100"
                    color="white"
                    margin="3px"
                    leftIcon={<RiDeleteBin5Line />}
                    onClick={() => (setIsOpenVoid(true))}
                    _hover={hover}>
                    Anular
                </Button>
                <Button bg="theme.100"
                    color="white"
                    margin="3px"
                    leftIcon={<ImCancelCircle />}
                    _hover={hover}
                    onClick={() => (setIsOpenCancel(true))}
                >
                    Cancelar
                </Button>
                <Button bg="theme.100"
                    color="white"
                    margin="3px"
                    leftIcon={<BiSave />}
                    _hover={hover}
                    onClick={() => (setIsOpenSave(true))}
                >
                    Guardar
                </Button>
                <Button bg="theme.100"
                    color="white"
                    margin="3px"
                    leftIcon={<FaMoneyBillWave />}
                    _hover={hover}
                    onClick={() => (setIsOpenBill(true))}
                >
                    Facturar
                </Button>
            </Box>
        )
    }

    const RenderItemsList = () => {
        return (
            <Box p="2" flexWrap>
                <Box p="2" flexWrap>
                    <Stack direction={["column", "row"]} spacing="5%">
                        <Box w="30%" h="40px" fontWeight="semibold">Producto</Box >
                        <Box w="15%" h="40px" fontWeight="semibold">Cantidad</Box >
                        <Box w="15%" h="40px" fontWeight="semibold">Precio unitario</Box >
                        <Box w="15%" h="40px" fontWeight="semibold">Total</Box >
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
                        <>
                            <Modal onClose={onCloseModal} size="full" isOpen={isOpenModal} scrollBehavior={scrollBehavior}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Mesa: {tableId} </ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <RenderItemsList />
                                    </ModalBody>
                                    <ModalBody>
                                        <RenderTableTotal />
                                        <RenderCategories />
                                        <RenderActionButtons />
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={onCloseModal} data-testid="cashier-cart-button-close">Close</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>

                            {
                                <Box>
                                    <DialogDisplay
                                        header="Anulación del pedido"
                                        firstOption="Cancelar"
                                        secondOption="Anular"
                                        message="¿ Desea anular definitivamente el pedido ?"
                                        onCloseAll={onCloseModal}
                                        onClose={onClose}
                                        isOpen={isOpenVoid}
                                        action={() => (tablesService.deleteTableOrders(actualTableId))}
                                    />

                                    <DialogDisplay
                                        header="Cancelación del pedido"
                                        firstOption="Cancelar"
                                        secondOption="Aceptar"
                                        message="¿ Desea cancelar el pedido ?"
                                        onCloseAll={onCloseModal}
                                        onClose={onClose}
                                        isOpen={isOpenCancel}
                                        action={() => onClose()}
                                    />

                                    <DialogDisplay
                                        header="Guardar pedido"
                                        firstOption="Cancelar"
                                        secondOption="Aceptar"
                                        message="¿ Desea guardar el pedido ?"
                                        onCloseAll={onCloseModal}
                                        onClose={onClose}
                                        isOpen={isOpenSave}
                                        action={() => (tablesService.updateTableOrder(actualTableId, items))}
                                    />

                                    <DialogDisplay
                                        header="Facturar pedido"
                                        firstOption="Cancelar"
                                        secondOption="Aceptar"
                                        message="¿ Desea facturar el pedido ?"
                                        onCloseAll={onCloseModal}
                                        onClose={onClose}
                                        isOpen={isOpenBill}
                                        action={() => (tablesService.checkBill(actualTableId))}
                                    />
                                </Box>
                            }
                        </>
                        : null
            }
        </>
    )
}

export default CashierCart;