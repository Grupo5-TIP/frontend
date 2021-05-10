import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Text, useMediaQuery, Stack } from '@chakra-ui/react';
import Table from '../components/Table';
import CashierCart from '../components/CashierCart';
import tablesService from '../services/tables-service';
import productService from '../services/products-service';
import { ModalBody, ModalCloseButton, useDisclosure, Button } from "@chakra-ui/react";

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLarger] = useMediaQuery("(min-width: 380px)");
    const [actualTableId, setTableId] = useState(0);
    const [products, setProducts] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [items, setItemsFromTable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            tablesService.getTables()
                .then(resp => {
                    if (resp.status !== 400) {
                        setTables(resp.data);
                    } else {
                        setTables([]);
                    }
                })
                .catch(err => {
                    setError(err);
                });            
            setLoading(false);
        }

        fetchData();
    }, []);

    const openTable = (tableId) => {
        setTableId(tableId);
        productService.getAllProducts()
            .then(resp => {
                setProducts(resp.data);                
            })
            .catch(err => {
                setError(err);
            });
        tablesService.getItemsFromTable(tableId)
            .then(resp => {
                setItemsFromTable([...resp.data]);
            })
            .catch(err => {
                setError(err);
            });
        onOpen();
    }

    return (
        <>
        <Flex>
            {
                isLarger ?
                    <Flex
                        flexWrap="wrap"
                        justifyContent="center"
                        minHeight="90vh"
                    >
                        {error !== '' ? <Text color="gray.400">Error al traer mesas del server...</Text>
                            :
                            loading ? <Text color="gray.400"> Cargando... </Text>
                                :
                                tables.map(table => {
                                    return <Stack
                                        onClick={() => openTable(table.id)}
                                        as="button"
                                    >
                                        <Table
                                            key={table.id}
                                            table={table}                                            
                                        />
                                    </Stack>
                                })
                        }
                    </Flex>
                    :
                    <Flex
                        flexDirection={"column"}
                    >
                        {error !== '' ? <Text color="gray.400">Error al traer mesas del server...</Text>
                            :
                            loading ? <Text color="gray.400"> Cargando... </Text>
                                :
                                tables.map(table =>
                                    <Table
                                        key={table.id}
                                        table={table}
                                    />
                                )
                        }
                    </Flex>
            }
        </Flex>
        <CashierCart 
            onClose={onClose} 
            isOpen={isOpen}
            onOpen={onOpen}
            items={items}
            products={products}                          
            onDeleteProduct={()=>(console.log())}
            tableId={actualTableId}
        ></CashierCart>
        </>        
    )
}

export default Tables;