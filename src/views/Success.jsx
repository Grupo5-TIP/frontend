import { useHistory, useRouteMatch } from 'react-router-dom';
import { Flex, Button, Icon, Text, Stack } from "@chakra-ui/react";
import tableService from '../services/tables-service';
import invoiceService from '../services/invoice-service';
import { AiOutlinePaperClip } from 'react-icons/ai'
import { hover } from '../utils/buttonDesign';
import { useState, useEffect } from 'react';


const Success = (...props) => {
    const history = useHistory();
    const match = useRouteMatch();
    const tableId = match.url.substring(match.url.lastIndexOf('/') + 1);
    const [error, setError] = useState('');

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
        fetchData();
    }, [tableId]);

    return(
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
    )
}

export default Success;