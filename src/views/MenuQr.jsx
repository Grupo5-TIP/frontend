import { useState, useEffect } from 'react'
import Products from '../components/Products';
import DrawerCart from '../components/DrawerCart'
import productService from '../services/products-service';
import { hover, expanded } from '../utils/buttonDesign';
import {
    Flex, Stack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react';
import { editCart } from '../utils/editCart';
import SidebarIcons from '../components/SidebarIcons'
import Loading from '../components/Loading';
import StatusAlertDisplay from '../components/StatusAlertDisplay';

const MenuQr = ({ ...props }) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState({});
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {      
            productService.getAllProducts()
                .then(resp => {
                    setProducts(resp.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                });
        }
        setLoading(true);
        fetchData();
    }, []);

    const handleEditCart = (product, action) => {
        setCartItems(editCart(product, action));
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
                            _expanded={expanded}
                            _hover={hover}>

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


    return (

        <Flex flexGrow={1} justifyContent="center" width="100%" >
            <Flex flexDir="column">
                {error !== '' ? <StatusAlertDisplay top={2} 
                                    padding={5} 
                                    margin="0 auto" 
                                    h="150px" 
                                    w="300px" 
                                    boxShadow="lg"
                                    status="error"
                                    message= "Error al traer del server..."
                                    /> 
                    :
                    loading ? <Box margin="0 auto" width="300px"><Loading /></Box> :
                        <Stack>
                            <SidebarIcons setDrawerOpen={setDrawerOpen} tableId={props.match.url.substring(props.match.url.lastIndexOf('/') + 1)} />
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