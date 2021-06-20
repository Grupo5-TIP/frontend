import { Flex, Button, Icon, Text, Stack } from "@chakra-ui/react";
import { AiOutlinePaperClip } from 'react-icons/ai'
import { hover } from '../utils/buttonDesign';

const Success = (...props) => {
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
                <Text fontSize="lg" align="center"> El pedido se cobró correctamente!</Text>
                    
                    <Button bg="theme.100"
                        color="white"
                        margin="3px"
                        onClick={() => console.log()}
                        size="lg"
                        _hover={hover}>
                            Volver a pedir
                    </Button>
            </Stack>
    )
}

export default Success;