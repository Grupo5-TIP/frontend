import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Text } from '@chakra-ui/react';
import Table from '../components/Table';
import tablesService from '../services/tables-service';

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await tablesService.getTables()
                .then(resp => {
                    setTables(resp);
                })
                .catch(err => {
                    setError(err);
                });
            setLoading(false);
        }

        fetchData();
    }, []);
    
    
    return (
        <Flex flexDirection={"column"} minHeight="80vh">

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
        </Flex>
    )
}

export default Tables;