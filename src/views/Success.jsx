import { useHistory, useRouteMatch } from 'react-router-dom';
import { Flex, Button, Icon, Text, Stack } from "@chakra-ui/react";
import tableService from '../services/tables-service';
import invoiceService from '../services/invoice-service';
import { AiOutlinePaperClip } from 'react-icons/ai'
import { hover } from '../utils/buttonDesign';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import mercadopagoService from '../services/mercadopago-service';
import StatusAlertDisplay from '../components/AlertDisplay';
=======

>>>>>>> 42bb3fa5f77664fcad9ceb770fe6270bb474dace

const Success = (...props) => {
    const history = useHistory();
    const match = useRouteMatch();
    const tableId = match.url.substring(match.url.lastIndexOf('/') + 1);
<<<<<<< HEAD
    const paymentId = props[0].location.search.substring(props[0].location.search.lastIndexOf('payment_id') + 12, props[0].location.search.lastIndexOf('payment_id')+ 11) || "0";
    const [error, setError] = useState('');
    
=======
    const [error, setError] = useState('');
>>>>>>> 42bb3fa5f77664fcad9ceb770fe6270bb474dace

    useEffect(() => {
        const fetchData = async () => {
            tableService.getTableById(tableId)
            .then(resp => {
                if (resp.data.state === 'mercadoPago'){
                    invoiceService.createInvoice(tableId, 'MP')
                    .catch(err => {
                        setError(err);
                    });
                }else {
                    //aviso que no deberia estar aca.
                }
            })
            .catch(err => {
                setError(err);
            });
        }
        
        //Validar en base a los query params si el pago fue efectuado correctamente.
        mercadopagoService.validatePayment(paymentId)
            .then(resp => {
                fetchData();
            })
            .catch(err => {
                setError(err);
            });   
             
    }, [tableId]);

    return(
        <Stack flexGrow={1}>
            {error !== '' ? <StatusAlertDisplay top={2}
                        padding={5}
                        margin="0 auto"
                        h="150px"
                        w="500px"
                        boxShadow="lg"
                        status="error"
                        message="Usted no debería estar aquí..."
                    />
            :
                <Stack
                    justifyContent="center"
                    flexGrow={1}
                    padding={10}
                    spacing={5}
                    alignItems="center"
                >
                    <Flex
                        h="40px"
                        w="360px"
                        boxShadow="0 8px 6px -8px black"
                        bg="theme.100"
                    >
                        <Icon as={AiOutlinePaperClip} color="gray.300" w={10} h={10} left="5%"/>
                        
                    </Flex>
                    <Text fontWeight={800}  padding={3} align="center" color="gray.400"> El pedido se cobró correctamente!</Text>
                        
                        <Button bg="theme.100"
                            color="white"
                            margin="3px"
                            onClick={() => history.push('/menu/'+tableId)}
                            size="lg"
                            _hover={hover}>
                                Volver a pedir
                        </Button>
                </Stack>
            }
        </Stack>
    )
}

export default Success;