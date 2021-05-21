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
import { HamburgerIcon } from "@chakra-ui/icons";
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
        >{/*
                <Text>Link1</Text>
                <Text>Link2</Text>
                <Text>Link3</Text> */}
        </Stack>
    )
}

const BackgroundHeader = () => {
    return (
        <Box >
            <Image  
                src="https://bit.ly/3wcGMuL"
            />
        </Box>
    )
}

const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    return (
        <Flex
            as="nav"
            align="center"
            bg="gray.900"

        >
            <Flex align="center">
                <Logo />
                <BackgroundHeader />
                <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                    <HamburgerIcon />
                </Box>

            </Flex>


            <Menu isOpen={isOpen} />
        
        </Flex>
    )
}

export default Header;