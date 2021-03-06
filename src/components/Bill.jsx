import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import tableService from '../services/tables-service';
import BillItem from './BillItem';
import { Flex, Button, Stack, Box, Text, Icon } from "@chakra-ui/react";
import AlertDisplay from '../components/AlertDisplay';
import { AiOutlinePaperClip } from 'react-icons/ai'
import { GiPaperClip } from 'react-icons/gi'
import { parseCurrency } from '../utils/currency'

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
        tableService.requestBill(tableId)
            .then(resp => {
                setIsAdded(true);
                onClose();
            })
            .catch(err => {
                setError(err);
            });
    }

    const renderStatusAlertDisplay = (status, message) => {
        return <AlertDisplay status={status} message={message} />
    }

    const StatusAlertDisplay = () => {
        return (
            <Flex flexDir="row" alignSelf="center">
                {isAdded ?
                    <Flex height="100px" width="250px" >
                        {renderStatusAlertDisplay("success", "Se solicitó correctamente el cierre de caja!")}
                    </Flex>
                    :
                    null
                }
            </Flex>
        )
    }

    const DisplayBill = ({ items }) => {
        return (
            <Flex
                flexGrow={1}
                direction="column"
                spacing={5}
                padding={3}
            >
                
                {/*<Icon as={AiOutlinePaperClip} color="gray.300" w={10} h={10} position="absolute" left="5%" marginTop={-1} /> */}
                {/*<Icon as={GiPaperClip} color="gray.300" w={10} h={10} position="absolute" /> */}
                <Flex
                    h="20px"
                    w="360px"
                    boxShadow="0 8px 6px -8px black"
                    bg="theme.100"
                >
                    <Icon as={AiOutlinePaperClip} color="gray.300" w={10} h={10} left="5%" />
                </Flex>
                {
                    items.map(item =>
                        <BillItem key={item.id} item={item} />
                    )
                }

            </Flex>
        )
    }

    return (
        <Flex flexGrow={1} flexDir="column" minH="300px" >
            <StatusAlertDisplay />
            {
                error !== '' ? renderStatusAlertDisplay("error", "Error al traer del server...")
                    :
                    loading ? <Text color="gray.400"> Cargando... </Text> :
                        <Flex flexDir="column">
                            <Flex justifyContent="center">
                                {
                                    itemsFromTable && itemsFromTable.length > 0 ?
                                        <Flex padding={5} flexDir="column">
                                            <DisplayBill items={itemsFromTable} />
                                            <Flex justifyContent="flex-end" paddingRight={5} color="theme.500" fontWeight="900">
                                                <Text>Total:</Text> <Text data-testid="cashier-cart-total">{parseCurrency(itemsFromTable.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0))}</Text>
                                            </Flex>
                                        </Flex>
                                        : <Text padding={3} align="center" color="gray.400"> Todavia no realizaste ningún pedido. Volvé y encargate algo para disfrutar!</Text>
                                }

                            </Flex>
                            <Flex justifyContent="center" padding={2} >
                                <Button onClick={() => history.push("/menu/" + tableId)} mr={2} bg="gray.100" color="theme.100" variant="outline" data-testid="orders-cancel-button">Volver</Button>
                                <Button onClick={() => handleCheckPlease()} bg="theme.100" color="gray.100" data-testid="orders-confirm-button">Pedir cuenta</Button>
                            </Flex>
                        </Flex>
            }

        </Flex>
    )
}

export default Bill;