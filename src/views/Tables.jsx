import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Stack, Box, useDisclosure } from '@chakra-ui/react';
import Table from '../components/Table';
import CashierCart from '../components/CashierCart';
import tablesService from '../services/tables-service';
import Loading from '../components/Loading';
import StatusAlertDisplay from '../components/AlertDisplay';

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actualTableId, setTableId] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    useEffect(() => {
        const fetchData = async () => {
            tablesService.getTables()
                .then(resp => {
                    setTables(resp.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                });    
        }
        setLoading(true);
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

    /*const renderStatusAlertDisplay = (status, message) => {
        return (
            <Flex top={2} padding={5} margin="0 auto" h="150px" w="500px" boxShadow="lg">
                <AlertDisplay status={status} message={message} />
            </Flex>
        )
    }*/
    

    return (
        <Flex flexGrow={1} margin="0 auto" width="1024px">
            <Flex
                width="100%"
            >
                {error !== '' ? <StatusAlertDisplay top={2} 
                                    padding={5} 
                                    margin="0 auto" 
                                    h="150px" 
                                    w="500px" 
                                    boxShadow="lg"
                                    status="error"
                                    message= "Error al traer del server..."
                                    /> 
                    :
                    loading ? <Box width="100%"><Loading /></Box>
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