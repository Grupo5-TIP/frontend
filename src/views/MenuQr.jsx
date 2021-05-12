import { useState, useEffect } from 'react'
import Products from '../components/Products';
import DrawerCart from '../components/DrawerCart'
import productService from '../services/products-service';
import {
    Flex, Button, Stack, Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Image
} from '@chakra-ui/react';
import { editCart } from '../utils/editCart';
import { GrCart } from 'react-icons/gr'

const MenuQr = ({ ...props }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

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
    }

    const DisplayCategory = ({categoryName, productCategory }) => {
        return (
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton
                            justifyContent="space-between"
                            alignItems="center"
                            maxWidth="100%"
                            _expanded={{ bg: "theme.100", color: "white" }}>

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
                     categories.map( category =>
                        <DisplayCategory  
                            key= {category}
                            categoryName={category}
                            productCategory={productsByCategory[category]}
                        />
                        )
                : null}
            </Box>
        )
    }

    return (

        <Flex justifyContent={"center"} minHeight="80vh">
            { error !== '' ? <Text color="gray.400">Error al traer del server...</Text>
                :
                loading ? <Text color="gray.400"> Cargando... </Text> :
                    <Stack>
                        <Flex justifyContent="flex-end" position="fixed" right="2%">

                            <Button as={GrCart}
                                boxSize="50px"
                                bg="theme.200"
                                padding={2}
                                margin={1}
                                onClick={() => setDrawerOpen(true)}
                            >

                            </Button>
                        </Flex>
                        <Flex>
                            <DisplayProducts
                                productsByCategory={products}
                            />

                            <DrawerCart
                                items={cartItems}
                                onClose={() => setDrawerOpen(false)}
                                isOpen={isDrawerOpen}
                                onDeleteProduct={(product) => handleEditCart(product, "delete")}
                                tableId={props.match.url.substring(props.match.url.lastIndexOf('/') + 1)}
                                onConfirm={() => handleEditCart({}, "deleteAll")}
                            />
                        </Flex>
                    </Stack>

            }
        </Flex>
    );

}

export default MenuQr;