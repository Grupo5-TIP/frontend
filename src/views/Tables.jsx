import { useState, useEffect } from 'react'
import { Stack, Flex, Box, Text, Image, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import Table from '../components/Table';
import CashierCart from '../components/CashierCart';
import tablesService from '../services/tables-service';
import Loading from '../components/Loading';
import StatusAlertDisplay from '../components/AlertDisplay';
import bgImage from '../../src/bgImage.jpg'

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actualTableId, setTableId] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLarger] = useMediaQuery("(min-width: 380px)");

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
    
    const BgTables = () =>{
        return (
            <Box padding={5}>
                <Image src={bgImage} fit="cover" w="1400px" minH="auto" maxH="100%" alt="" ></Image>
            </Box>
        )
    }

    return (
        <Flex flexGrow={1}>
                {error !== '' ? <StatusAlertDisplay top={2}
                    padding={5}
                    margin="0 auto"
                    h="150px"
                    w="500px"
                    boxShadow="lg"
                    status="error"
                    message="Error al traer del server..."
                />
                    :
                    loading ? <Box width="100%"><Loading /></Box>
                        :
                            <Flex w="100%" bgImage={bgImage} bgRepeat="repeat">
                                {
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
                                    })}

                            </Flex>
                }
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