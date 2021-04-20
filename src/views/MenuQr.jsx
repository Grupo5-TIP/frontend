import { useState, useEffect } from 'react'
import Products from '../components/Products';
import DrawerCart from '../components/DrawerCart'
import productService from '../services/products-service';
import { Flex, Icon, Tooltip, Button, Box, Stack } from '@chakra-ui/react';
import { editCart } from '../utils/editCart';
import { GrCart } from 'react-icons/gr'

const MenuQr = ({...props}) => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const products = await productService.getAllProducts();
          setProducts(products.data);
          setLoading(false);
        }

        fetchData();
    }, []);

    const handleEditCart = (product, action) => {
        setCartItems(editCart(product, action));
    }

    return (
        <Flex justifyContent={"center"} height="100vh">
            {loading ? <p> Cargando... </p> :
                <Stack>
                    <Flex justifyContent="flex-end" position="fixed" right="2%">

                        <Button as= {GrCart} 
                            boxSize="50px"
                            bg="theme.200" 
                            padding={2}
                            margin={1}
                            onClick = {() => setDrawerOpen(true)}
                            >
                        </Button>                        
                    </Flex>
                    <Flex>
                        <Products
                            products={products}
                            loading={loading}
                            onAddProduct={(product) => handleEditCart(product, "add")}
                        />
                        <DrawerCart
                            items={cartItems}
                            onClose={() => setDrawerOpen(false)}
                            isOpen={isDrawerOpen}
                            onDeleteProduct={(product) => handleEditCart(product, "delete")}
                            tableId= {props.match.url.substring(props.match.url.lastIndexOf('/') + 1)}
                        />
                    </Flex>
                </Stack>
            }
        </Flex>
    );

}

export default MenuQr;