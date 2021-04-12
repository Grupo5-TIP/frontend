import { Box, Flex, Text, Link } from "@chakra-ui/react";

const Footer = () => {
    return(
        <Flex>
            <Box align="center" 
                w="100%"
                h="100px" 
                bg="theme.100"
                color="white"
            >
                <Text >Made with ♥</Text>
                <Link color="theme.300"  href="https://github.com/Grupo5-TIP" isExternal>About us</Link>
            </Box>
        </Flex>
    )
}

export default Footer;