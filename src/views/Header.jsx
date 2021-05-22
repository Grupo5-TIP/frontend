import React from "react";
import {
    Box,
    Stack,
    Flex,
    Image,
    Text,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import Logo from '../components/Logo';

const Menu = (isOpen, ...props) => {
    return (
        <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: isOpen ? "block" : "none", md: "flex" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
        >
            {/* <Text>Link1</Text>
                <Text>Link2</Text>
                <Text>Link3</Text> */}
        </Stack>
    )
}

const BackgroundHeader = () => {
    return (
        <Box w="80%">
            <Image

                w="100%"
                h="125px"
                objectFit="cover"

                src="https://bit.ly/3wcGMuL"
            />
        </Box>
    )
}

const Header = (props) => {

    return (
        <Flex
            as="nav"
            align="center"
            bg="gray.900"
            h="150px"
            justifyContent="center"
        >
            <Logo />
            <BackgroundHeader />

        </Flex>
    )
}

export default Header;