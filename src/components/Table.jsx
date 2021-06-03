import { useState, useEffect, useCallback } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Stack, Box, Text, Badge, useMediaQuery } from "@chakra-ui/react"

const Table = ({ table }) => {
    const [isLarger] = useMediaQuery("(min-width: 380px)");
    const [bgColor, setBgColor] = useState("theme.200");
    const [positionX, setPositionX] = useState("");
    const [positionY, setPositionY] = useState("");
    const [width, setWidth] = useState("");

    const isEmpty = useCallback(() => {
        //i need do this way because useEffect Hook change on every render.
        return table.state === 'empty';
    }, [table]);

    const isInUse = useCallback(() => {
        //i need do this way because useEffect Hook change on every render.
        return table.state === 'inUse';
    }, [table]);


    useEffect(() => {
        const calculateBgColor = () => {
            isEmpty() ? setBgColor("theme.300") : isInUse() ? setBgColor("theme.500") : setBgColor("blue")
        }
        calculateBgColor();
        const x = `${table.x}px` ;
        const y = `${table.y}px` ;
        setWidth(`${ (1+table.size * 10 /100) * 150}px` )
        setPositionX(x);
        setPositionY(y);
    }, [isEmpty, table]);


    const viewLargerDevices = () => {
        return (
            <Box 
                width={width} 
                height="20vh"
                margin={"10"} 
                borderWidth="1px" 
                borderRadius="lg" 
                position="absolute"
                top={positionY}
                left={positionX}
                marginTop={150}
            >
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" fontSize="xl" px="2" colorScheme="gray.400" color={bgColor} data-testid="table-badge">
                        {table.id}.
                        {table.state}
                    </Badge>
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                        data-testid="table-size"
                    >
                        &bull; size: {table.size}
                    </Box>
                </Box>
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    data-testid="table-detail"
                >
                    {isEmpty()? null : <Text>Detalle...</Text>}
                </Box>
            </Box>
        )
    }

    const viewSmallDevices = () => {
        return (
            <Stack bgColor={bgColor} key={table.id} margin="3" width="100%" borderRadius="lg" shadow="md">
                <Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        direction="row"
                        spacing={"10"}
                        padding={3}
                        width="43vh"
                    >
                        <Text color="theme.100" fontSize="lg" data-testid="table-small-id">{table.id}</Text>
                        <Text color="theme.100" fontSize="lg" as="em" data-testid="table-small-state">{table.state}</Text>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    return (
        <Flex>
            {
                isLarger ? viewLargerDevices() : viewSmallDevices()
            }
        </Flex>
    )
}

export default Table;