import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalOverlay, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, VStack, HStack, 
    Button, Box, StackDivider, Stack, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel
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
                                setError(err);
                                //setLoading(false);
                            });
                    })
                    .catch(err => {
                        setError(err);
                        //setLoading(false);
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
                                Available products
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

    const RenderItemsList = () => {
        return (
            <Box p="2" flexWrap>
                <Stack direction={["column", "row"]} spacing="5%">
                    <Box w="25%" h="40px">Product</Box >
                    <Box w="25%x" h="40px">Amount</Box >
                    <Box w="25%" h="40px">Unit price</Box >
                    <Box w="25%" h="40px">Total</Box >
                </Stack>
                <VStack
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={4}
                    align="stretch"

                >
                   <Items items={items}></Items>
                </VStack>

                
                <Stack direction={["column", "row"]} spacing="24px">
                    <Box w="100%" h="40px">
                        TOTAL PRICE: <Text data-testid="cashier-cart-total">{items.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0)}</Text>
                    </Box >
                </Stack>
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
                        <Modal onClose={onClose} size="full" isOpen={isOpenModal}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Table: {tableId} </ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <RenderItemsList />
                                    <RenderCategories />
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