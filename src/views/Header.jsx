import { Box, Flex, Image} from "@chakra-ui/react";

const Header = () => {
    return(
        <Flex>
            <Box 
                w="20%"
                h="100px"
                bg="gray.900"
                marginBottom={4}
                shadow="md"
                alignItems="end"
            >
                <Image
                   
                    w="100%"
                    objectFit="cover"
                    src="https://bit.ly/3eErw3N"
                />
            </Box>
            <Box 
                w="80%"
                h="100px"
                bg="gray.200"
                marginBottom={4}
                shadow="md"
                alignItems="end"
            >
                <Image
                    float="right"
                    w="100%"
                    h="100px"
                    objectFit="cover"
                    src="https://bit.ly/3wcGMuL"
                />
                
            </Box>
        </Flex>
    )
}

export default Header;