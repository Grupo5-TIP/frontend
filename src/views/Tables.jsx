import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Text, useMediaQuery } from '@chakra-ui/react';
import Table from '../components/Table';
import tablesService from '../services/tables-service';

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLarger] = useMediaQuery("(min-width: 380px)");

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
        console.log(tables);
    }, []);

    return (
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
                                tables.map(table => 
                                    <Table
                                        key={table.id}
                                        table={table}
                                    />
                                )
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