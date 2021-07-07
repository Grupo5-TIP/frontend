import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import tableService from '../services/tables-service';
import mercadopagoService from '../services/mercadopago-service';
import BillItem from './BillItem';
import { Flex, Box, Button, Text, Icon, Stack, useToast } from "@chakra-ui/react";
import { AiOutlinePaperClip } from 'react-icons/ai'
import { parseCurrency } from '../utils/currency'
import Loading from './Loading';
import StatusAlertDisplay from './StatusAlertDisplay';
import { hover } from '../utils/buttonDesign';

const Bill = ({ tableId }) => {
    const [loading, setLoading] = useState(true);
    const [pedirCuenta, setPedirCuenta] = useState(false);
    const [error, setError] = useState('');
    const [itemsFromTable, setItemsFromTable] = useState({});
    const [, setIsAdded] = useState(false);
    const onClose = () => setTimeout(() => setIsAdded(false), 2000);
    const history = useHistory();
    const toast = useToast()

    useEffect(() => {
        const fetchData = async () => {
            if (tableId !== 0) {
                tableService.getTableById(tableId)
                    .then(resp => {
                        setPedirCuenta(resp.data.state !== 'mercadoPago')
                    })
                    .catch(err => {
                        setError(err);
                    });
                tableService.getItemsFromTable(tableId)
                    .then(respTableService => {
                        setItemsFromTable(respTableService.data);

                        setLoading(false);
                    })
                    .catch(err => {
                        setError(err);
                    });
            }
        }
        setLoading(true);
        fetchData();
    }, [tableId]);

    const handleCheckPlease = () => {
        if (pedirCuenta) {
            tableService.requestBill(tableId)
                .then(resp => {
                    //setIsAdded(true);
                    toast({
                        title: "Cerrado de caja.",
                        description: "Se solicitó correctamente el cierre de caja!",
                        status: "success",
                        duration: 1500,
                        isClosable: true,
                    })
                    onClose();
                })
                .catch(err => {
                    setError(err);
                });
        } else {
            mercadopagoService.createMPInvoice(tableId, getPrice())
                .then(resp => {
                    window.open(resp.data.url, "_self");
                })
                .catch(err => {
                    setError(err);
                });
        }
    }

    const getPrice = () => {
        return itemsFromTable.reduce((accumulator, item) => accumulator + (item.product.price * item.amount), 0);
    }

    const DisplayBill = ({ items }) => {
        return (
            <Stack
                flexGrow={1}
                direction="column"
                paddingTop={3}
            >
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

            </Stack>
        )
    }
    if (error !== '') {
        return (
            <StatusAlertDisplay top={2}
                padding={5}
                margin="0 auto"
                h="150px"
                w="500px"
                boxShadow="lg"
                status="error"
                message="Error al traer del server..."
            />
        )
    }

    return (
        <Flex flexGrow={1}>
            {

                loading ? <Box margin="0 auto" width="300px" padding={3}><Loading /></Box> :
                    <Flex flexDir="column">
                        <Flex>
                            {
                                itemsFromTable && itemsFromTable.length > 0 ?
                                    <Flex flexDir="column">
                                        <DisplayBill items={itemsFromTable} />
                                        <Flex justifyContent="flex-end" paddingRight={5} color="theme.500" fontWeight="900">
                                            <Text>Total:</Text> <Text data-testid="cashier-cart-total">{parseCurrency(getPrice())}</Text>
                                        </Flex>
                                    </Flex>
                                    : <Text padding={3} align="center" color="gray.400"> Todavia no realizaste ningún pedido. Volvé y encargate algo para disfrutar!</Text>
                            }

                        </Flex>
                        <Flex justifyContent="center" padding={2} >
                            <Button onClick={() => history.push("/menu/" + tableId)} mr={2} bg="gray.100" color="theme.100" variant="outline" data-testid="orders-cancel-button">Volver</Button>
                            <Button
                                bg="theme.100"
                                color="white"
                                disabled={itemsFromTable.length < 1}
                                onClick={() => handleCheckPlease()}
                                _hover={hover}
                                data-testid="orders-confirm-button">
                                {pedirCuenta ? "Pedir cuenta" : "Pagar con Mercado Pago"}
                            </Button>
                        </Flex>
                    </Flex>
            }
        </Flex>
    )
}

export default Bill;