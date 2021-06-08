import React from "react";
import {
    Box,
    Flex,
    Image
} from "@chakra-ui/react";
import Logo from '../components/Logo';

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