import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Stack, Box, Text, Badge, useMediaQuery, Tag, TagLeftIcon } from "@chakra-ui/react"
import { BsHouseDoor, BsHouseDoorFill } from 'react-icons/bs'
import { FiPhoneCall } from 'react-icons/fi'

const Table = ({ table }) => {
    const [isLarger] = useMediaQuery("(min-width: 380px)");
    const [bgColor,] = useState("theme.200");
    const [positionX, setPositionX] = useState("");
    const [positionY, setPositionY] = useState("");
    const [width, setWidth] = useState("");
    
    const tableConfiguration = (tableState) => {
        const config = {bgColor:"", icon:""};
        switch (tableState) {
            case "empty":
                config.bgColor = "green.400"
                config.icon = <BsHouseDoor />
                break;
            case "inUse":
                config.bgColor = "red.500"
                config.icon = <BsHouseDoorFill />
                break;
            case "bill":
                config.bgColor = "orange"
                config.icon = <FiPhoneCall />
                break;
            default:
                config.bgColor = "theme.300"
                config.icon = <BsHouseDoor />
                break;
          }
        return config;
    }

    useEffect(() => {
        const x = `${table.x}px` ;
        const y = `${table.y}px` ;
        setWidth(`${ (1+table.size * 10 /100) * 150}px` )
        setPositionX(x);
        setPositionY(y);
    }, [table]);


    const viewLargerDevices = () => {
        return (
            <Box 
                width={width} 
                height="10vh"
                margin={"10"} 
                borderWidth="2px" 
                borderRadius="lg" 
                position="absolute"
                top={positionY}
                left={positionX}
                marginTop={150}
                bg={tableConfiguration(table.state).bgColor}
            >                
                <Box d="flex" alignItems="baseline">
                    {tableConfiguration(table.state).icon}
                    <Badge borderRadius="full" fontSize="large" 
                        fontWeight="extrabold" px="1" colorScheme="" color="gray.700" data-testid="table-badge">                        
                        {table.id}
                    </Badge>
                    <Box
                        color="gray.700"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                        data-testid="table-size"
                        fontSize="md"
                    >
                        &bull; tamaño: {table.size}
                    </Box>
                </Box>
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    data-testid="table-detail"
                >
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