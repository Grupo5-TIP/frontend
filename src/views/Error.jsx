import { useHistory, useRouteMatch } from 'react-router-dom';
import { Flex, Button, Icon, Text, Stack } from "@chakra-ui/react";
import { AiOutlinePaperClip } from 'react-icons/ai'
import { hover } from '../utils/buttonDesign';

const Error = (...props) => {
    const history = useHistory();
    const match = useRouteMatch();
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
                <Text fontWeight={800} padding={3} align="center" color="gray.400"> El pago no fue efectuado </Text>
                    
                    <Button bg="theme.100"
                        color="white"
                        margin="3px"
                        onClick={() => history.push('/checkout/'+match.url.substring(match.url.lastIndexOf('/') + 1))}
                        size="lg"
                        _hover={hover}>
                            Reintentar Pago
                    </Button>
            </Stack>
    )
}

export default Error;