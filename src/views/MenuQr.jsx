import { useState, useEffect } from 'react'
import Products from '../components/Products';
import DrawerCart from '../components/DrawerCart'
import productService from '../services/products-service';
import AlertDisplay from '../components/AlertDisplay';

import {
    Flex, Button, Stack, Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react';
import { editCart } from '../utils/editCart';
import { GrCart } from 'react-icons/gr'
import { MdPayment } from 'react-icons/md'
import { CgShoppingCart } from 'react-icons/cg'


const MenuQr = ({ ...props }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isAdded, setIsAdded] = useState(false)
    const onClose = () => setTimeout(() => setIsAdded(false), 2000);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            productService.getAllProducts()
                .then(resp => {
                    setProducts(resp.data);
                })
                .catch(err => {
                    setError(err);
                });
            setLoading(false);
        }

        fetchData();
    }, []);

    const handleEditCart = (product, action) => {
        setCartItems(editCart(product, action));
        if (action === "add") {
            setIsAdded(true)
        }
    }

    function renderProductAddedCheck() {
        onClose();
        return <AlertDisplay status={"success"} message={"El producto se agregó correctamente al carrito!"} />
    }

    const DisplayCategory = ({ categoryName, productCategory }) => {
        return (
            <Accordion allowToggle width="300px" paddingBottom="20px" >
                <AccordionItem>
                    <h2>
                        <AccordionButton
                            bg="theme.100"
                            color="white"
                            justifyContent="space-between"
                            alignItems="center"
                            maxWidth="100%"
                            _expanded={{ bg: "theme.300", color: "white" }}>

                            <Box flex="1" width={200} padding={3}>
                                {categoryName}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Products
                            products={productCategory}
                            loading={loading}
                            onAddProduct={(product) => handleEditCart(product, "add")}
                        />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        )

    }
    const DisplayProducts = ({ productsByCategory }) => {
        const categories = Object.getOwnPropertyNames(productsByCategory);
        return (
            <Box>
                {categories ?
                    categories.map(category =>
                        <DisplayCategory
                            key={category}
                            categoryName={category}
                            productCategory={productsByCategory[category]}
                        />
                    )
                    : null}
            </Box>
        )
    }

    const DrawerIcon = () => {
        return (
            <Button
                bg="theme.200"
                boxShadow="lg"
                size="lg"
                padding={2}
                margin={1}
                color="white"
                onClick={() => setDrawerOpen(true)}
            >
                <CgShoppingCart color="white" />
            </Button>
        )
    }

    const PaymentIcon = () => {
        return (
            <Button
                bg="theme.500"
                boxShadow="lg"
                size="lg"
                padding={2}
                margin={1}
                top="50px"
                color="white"
                onClick={() => console.log("payment icon")}
            >
                <MdPayment color="white" />
            </Button>
        )

    }

    const SidebarIcons = () => {
        return (
            <Flex flexDir="column" position="absolute" right="2%">
               <DrawerIcon/>
               <PaymentIcon/>
            </Flex>
        )
    }

    return (

        <Flex flexGrow={1} justifyContent="center" width="100%" >
            <Flex flexDir="column">
                {isAdded ?
                    <Box height="100px" width="250px">
                        {renderProductAddedCheck()}
                    </Box>
                    :
                    null
                }
                {error !== '' ? <Text color="gray.400">Error al traer del server...</Text>
                    :
                    loading ? <Text color="gray.400"> Cargando... </Text> :
                        <Stack>
                            <SidebarIcons />
                            <Flex>
                                <DisplayProducts
                                    productsByCategory={products}
                                />

                                <DrawerCart
                                    items={cartItems}
                                    onClose={() => setDrawerOpen(false)}
                                    isOpen={isDrawerOpen}
                                    onDecreaseProduct={(product) => handleEditCart(product, "decrease")}
                                    tableId={props.match.url.substring(props.match.url.lastIndexOf('/') + 1)}
                                    onConfirm={() => handleEditCart({}, "deleteAll")}
                                    onAddProduct={(product) => handleEditCart(product, "add")}
                                    onDeleteProduct={(product) => handleEditCart(product, "delete")}
                                />


                            </Flex>
                        </Stack>

                }
            </Flex>
        </Flex>
    );

}

export default MenuQr;