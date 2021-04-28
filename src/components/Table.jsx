import { useState, useEffect, useCallback } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Stack, Text, useMediaQuery } from "@chakra-ui/react"

const Table = ({ table }) => {
    const [isLarger] = useMediaQuery("(min-width: 380px)")
    const [bgColor, setBgColor] = useState("theme.200");

    const isEmpty = useCallback(() => { 
        //i need do this way because useEffect Hook change on every render.
        return table.state === 'empty';
      }, [table]);


    useEffect(() => {
        const calculateBgColor = () => {
            isEmpty() ? setBgColor("theme.300") : setBgColor("theme.500");
        }
        calculateBgColor();
        
    }, [isEmpty]);

    
    const viewLargerDevices = () => {
        return (
            <p>Grande re pistolón</p>
        )
    }

    const viewSmallDevices = () => {
        return (
            <Stack bgColor={bgColor} key={table.id} margin="3" direction="row" width="50vh" borderRadius="lg" shadow="md">
                <Stack width="100%" >
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={"10"}
                        padding={3}
                        sm="30em"
                        
                    >
                        <Text color="theme.100" fontSize="lg">{table.id}</Text>
                        <Text color="theme.100" fontSize="lg" as="em" >{table.state}</Text>
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