import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import tableService from '../services/tables-service';
import BillItem from './BillItem';
import { Flex, Button, Stack, Box, Text} from "@chakra-ui/react";
import AlertDisplay from '../components/AlertDisplay';


const Bill = ({ tableId }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [itemsFromTable, setItemsFromTable] = useState({});
    const [isAdded, setIsAdded] = useState(false);
    const onClose = () => setTimeout(() => setIsAdded(false), 2000);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (tableId !== 0) {

                tableService.getItemsFromTable(tableId)
                    .then(respTableService => {
                        setItemsFromTable(respTableService.data);
                    })
                    .catch(err => {
                        setError(err);
                    });
            }
            setLoading(false);
        }
        fetchData();
    }, [tableId]);

    const handleCheckPlease = () => {
        setIsAdded(true);
        onClose();
        console.log("pedir cuenta...")
    }

    const renderStatusError = (status, message) => {
        return <AlertDisplay status={status} message={message} />
    }

    return (
        <Flex flexGrow={1}>
            <Flex flexDir="column">
                {isAdded ?
                    <Flex height="100px" width="250px" >
                        {renderStatusError("success", "Se solicitó correctamente el cierre de caja!")}
                    </Flex>
                    :
                    null
                }

                {
                    error !== '' ? renderStatusError("error", "Error al traer del server...")
                        :
                        loading ? <Text color="gray.400"> Cargando... </Text> :
                            <Stack>
                                <Flex flexWrap="wrap" padding={2}  justifyContent="center">
                                    {
                                        itemsFromTable && itemsFromTable.length > 0 ?
                                            itemsFromTable.map(item =>
                                                <BillItem key={item.id} item={item} />
                                            ) : null
                                    }
                                </Flex>
                                <Flex justifyContent="center" padding={2} >
                                    <Button onClick={() => history.push("/menu/" + tableId)} mr={2} bg="gray.100" color="theme.100" variant="outline" data-testid="orders-cancel-button">Volver</Button>
                                    <Button onClick={() => handleCheckPlease()} bg="theme.100" color="gray.100" data-testid="orders-confirm-button">Pedir cuenta</Button>
                                </Flex>
                            </Stack>
                }
            </Flex>

        </Flex>
    )
}

export default Bill;