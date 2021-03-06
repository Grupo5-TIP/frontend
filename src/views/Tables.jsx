import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Text, Stack } from '@chakra-ui/react';
import Table from '../components/Table';
import CashierCart from '../components/CashierCart';
import tablesService from '../services/tables-service';
import { useDisclosure } from "@chakra-ui/react";

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actualTableId, setTableId] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    

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
    }, [actualTableId]);

    const openTable = (tableId) => {
        setTableId(tableId);
        setError("")
        onOpen();
    }

    const onCloseCashierCart = () => {
        setTableId(0);
        onClose();
    }


    return (
        <Flex flexGrow={1}>
            <Flex
                flexWrap="wrap"
                justifyContent="center"
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
            <CashierCart
                key={actualTableId}
                onCloseModal={onCloseCashierCart}
                isOpenModal={isOpen}
                onOpenModal={onOpen}
                tableId={actualTableId}
            />
        </Flex>
    )
}

export default Tables;