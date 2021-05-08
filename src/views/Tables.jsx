import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Text, useMediaQuery, Stack } from '@chakra-ui/react';
import Table from '../components/Table';
import CashierCart from '../components/CashierCart';
import tablesService from '../services/tables-service';
import ordersService from '../services/orders-service';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { ModalBody, ModalCloseButton, useDisclosure, Button } from "@chakra-ui/react";

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLarger] = useMediaQuery("(min-width: 380px)");
    const [actualTableId, setTableId] = useState(0);
    const [orders, setOrders] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    //HARDCODE LISTA DE ITEMS
    const itemsPrueba = [
        {
            amount:2,
            product: {
                description: "Coca Cola 2 lts",
                id: 1,
                image: "https://bit.ly/2Qx0RML",
                name: "Coca Cola",
                price: 200
            }
        },
        {
            amount:1,
            product: {
                description: "Tiramisu",
                id: 2,
                image: "https://bit.ly/2Qx0RML",
                name: "Tiramisu",
                price: 300
            }
        }
    ]


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
            setLoading(false);
        }

        fetchData();
    }, []);

    const openTable = (tableId) => {
        setTableId(tableId);
        ordersService.getOrderByTableId(tableId)
            .then(resp => {
                setOrders(resp.data)
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
                items={itemsPrueba}                           
                onDeleteProduct={()=>(console.log())}
                tableId={actualTableId}   
            ></CashierCart>
        )
        
        </>
        /*<Flex   
            //flexWrap="wrap" // delete when we use the xy values
            //justifyContent="center"
            //minHeight="90vh"
            flexDirection={"column"}
            >

            { error !== '' ? <Text color="gray.400">Error al traer mesas del server...</Text>
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
        </Flex>*/
    )
}

export default Tables;