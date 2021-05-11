import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Text, Stack } from '@chakra-ui/react';
import Table from '../components/Table';
import CashierCart from '../components/CashierCart';
import tablesService from '../services/tables-service';
import productService from '../services/products-service';
import { useDisclosure } from "@chakra-ui/react";

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actualTableId, setTableId] = useState(0);
    const [products, setProducts] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [items, setItemsFromTable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            tablesService.getTables()
                .then(resp => {
                    setTables(resp.data);
                })
                .catch(err => {
                    setError(err);
                });

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

    const openTable = (tableId) => {
        setTableId(tableId);
        setError("")
        onOpen();
    }

    return (
        <>
            <Flex>
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
                                return (
                                    <Stack
                                        key={table.id}
                                        onClick={() => openTable(table.id)}
                                        as="button"
                                    >
                                        <Table
                                            key={table.id}
                                            table={table}
                                        />
                                    </Stack>
                                )
                            })
                    }
                </Flex>

            </Flex>
            <CashierCart
                key={actualTableId}
                onClose={onClose}
                isOpen={isOpen}
                onOpen={onOpen}
                items={items}
                products={products}
                onDeleteProduct={() => (console.log())}
                tableId={actualTableId}
            />
        </>
    )
}

export default Tables;