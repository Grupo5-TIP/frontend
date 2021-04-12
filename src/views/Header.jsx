import { Box, Flex } from "@chakra-ui/react";

const Header = () => {
    return(
        <Flex>
            <Box 
                w="100%"
                h="80px"
                /*bgGradient="linear(to-r,theme.500,theme.400,theme.500)"*/
                bg="theme.200"
                marginBottom={4}
                shadow="md"
            >
            </Box>
        </Flex>
    )
}

export default Header;