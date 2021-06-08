import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Stack, Box, Text, Badge, Icon, VStack, useMediaQuery, createIcon } from "@chakra-ui/react"
import { BsHouseDoor, BsHouseDoorFill } from 'react-icons/bs'
import { FiPhoneCall } from 'react-icons/fi'
import { ReactComponent as FullTable } from '../icons/full-table.svg';
import { ReactComponent as EmptyTable } from '../icons/empty-table.svg';
import { ReactComponent as CheckBill } from '../icons/check-bill.svg';

const Table = ({ table }) => {
    const [isLarger] = useMediaQuery("(min-width: 380px)");
    const [bgColor,] = useState("theme.200");
    const [positionX, setPositionX] = useState("");
    const [positionY, setPositionY] = useState("");
    const [width, setWidth] = useState("");

    const CheckBillIcon = () => {
        return (
            <Icon w={10} h={10} viewBox="0 0 380.721 380.721">
                <path d="M58.727,281.236c0.32-5.217,0.657-10.457,1.319-15.709c1.261-12.525,3.974-25.05,6.733-37.296
			c1.725-6.101,3.561-12.106,5.449-17.997c2.463-5.729,4.868-11.433,7.25-17.01c5.438-10.898,11.491-21.07,18.724-29.593
			c1.737-2.19,3.427-4.328,5.095-6.46c1.912-1.894,3.805-3.747,5.676-5.588c3.863-3.509,7.221-7.273,11.107-10.091
			c7.686-5.711,14.529-11.137,21.477-14.506c6.698-3.724,12.455-6.982,17.631-8.812c10.125-4.084,15.883-6.141,15.883-6.141
			s-4.915,3.893-13.502,10.207c-4.449,2.917-9.114,7.488-14.721,12.147c-5.803,4.461-11.107,10.84-17.358,16.992
			c-3.149,3.114-5.588,7.064-8.551,10.684c-1.452,1.83-2.928,3.712-4.427,5.6c-1.261,2.074-2.533,4.165-3.84,6.286
			c-5.537,8.208-9.673,17.858-13.995,27.664c-1.748,5.1-3.566,10.283-5.391,15.534c-1.249,5.473-2.638,10.98-4.16,16.476
			c-2.266,11.271-4.502,22.761-5.438,34.612c-0.68,4.287-1.022,8.633-1.383,12.979c94,0.023,166.775,0.069,268.589,0.069
			c0.337-4.462,0.534-8.97,0.534-13.536c0-85.746-62.509-156.352-142.875-165.705c5.17-4.869,8.436-11.758,8.436-19.433
			c-0.023-14.692-11.921-26.612-26.631-26.612c-14.715,0-26.652,11.92-26.652,26.642c0,7.668,3.265,14.558,8.464,19.426
			c-80.396,9.353-142.869,79.96-142.869,165.706c0,4.543,0.168,9.027,0.5,13.467C39.736,281.236,49.327,281.236,58.727,281.236z"/>
            </Icon>
        )
    }

    const EmptyTableIcon = () => {
        return (
            <Icon w={10} h={10} viewBox="0 0 380.721 380.721">
                <path d="M190.372,29.813c-88.673,0-160.546,71.873-160.546,160.547c0,65.89,39.73,122.438,96.504,147.173l2.092-40.525
			c0-32.242-23.83-21.912-23.83-44.465c0-12.641,0.395-38.98,0.395-58.755c0-52.697,22.377-103.673,27.874-115.048
			c5.53-11.363,18.537-23.76,18.677-11.828c0,17.312,0.738,218.618,0.738,218.618h-0.035l2.463,61.241
			c11.497,2.626,23.395,4.125,35.669,4.125c6.728,0,13.304-0.546,19.822-1.349l5.31-102.906
			c-13.106-2.869-24.283-11.212-31.295-21.68c-8.685-13.014,6.675-128.067,6.675-128.067h10.004v107.978h9.922V96.894h10.84v107.978
			h9.889V96.894h11.258v107.978h9.911V96.894h7.668c0,0,15.349,115.054,6.669,128.067c-6.947,10.363-18.009,18.682-30.952,21.633
			c-0.232,0.07-0.441,0.163-0.441,0.163l5.02,95.993c63.995-21.11,110.249-81.307,110.249-152.39
			C350.907,101.687,279.034,29.813,190.372,29.813z"/>
                <path d="M190.372,0C85.415,0,0,85.397,0,190.36C0,295.3,85.415,380.721,190.372,380.721c104.952,0,190.35-85.421,190.35-190.361
			C380.721,85.397,295.324,0,190.372,0z M190.372,366.523c-97.144,0-176.18-79.03-176.18-176.163
			c0-97.144,79.036-176.18,176.18-176.18c97.133,0,176.175,79.036,176.175,176.18C366.546,287.493,287.504,366.523,190.372,366.523z
			"/>
            </Icon>
        )
    }

    const FullTableIcon = () => {
        return (
            <Icon w={10} h={10} viewBox="0 0 380.721 380.721" x="0px" y="0px"> {/*agrandar más con width="100px" height="100px" */}
                <path d="M344.308,327.389l0.116-0.047c0,0-82.888-84.119-91.021-92.252c-5.042-1.487-34.53-14.454-35.041-38.83
		c12.583-14.418,30.882-28.268,57.907-28.541c0.046-0.023,0.186-0.035,0.256-0.035c12.223,0.331,24.562-3.724,34.38-12.304
		c0.685-0.604,2.3-2.248,2.3-2.248l67.517-85.089l-8.11-8.139l-82.597,87.448l-9.748-9.777l85.014-85.008l-7.146-7.105
		l-85.514,85.531l-8.087-8.093l85.525-85.531l-7.865-7.849l-85.525,85.52l-9.586-9.568l88.279-82.818l-7.413-7.413l-81.354,63.38
		c0,0-2.95,2.486-3.973,3.521c-11.166,11.16-15.965,26.305-14.361,40.892c-1.127,18.503-7.11,32.242-14.871,42.687
		C61.724,17.344,4.531,33.215,4.531,33.215L0,37.81c0,0,101.983,102.262,164.997,165.398c-22.11,22.134-128.7,128.724-128.7,128.724
		l0.011,0.023c-0.093,0.092-0.209,0.127-0.319,0.243c-7.616,7.622-7.587,19.961,0.012,27.571c7.604,7.61,19.979,7.61,27.565,0.023
		c0.122-0.116,0.157-0.244,0.227-0.314l0.023,0.023c0,0,106.724-106.693,128.706-128.665c11.525,11.538,19.217,19.241,20.728,20.751
		c9.341,9.389,103.383,103.43,103.383,103.43h0.116c0,0.116,0.104,0.221,0.209,0.268c7.599,7.656,20.077,7.656,27.664,0
		c7.703-7.588,7.703-20.02,0-27.664C344.529,327.504,344.424,327.458,344.308,327.389z"/>
            </Icon>
        )
    }


    const tableConfiguration = (tableState) => {
        const config = { bgColor: "", icon: "" };
        switch (tableState) {
            case "empty":
                config.bgColor = "green.400"
                config.icon = <EmptyTableIcon />
                break;
            case "inUse":
                config.bgColor = "red.500"
                config.icon = <FullTableIcon />
                break;
            case "bill":
                config.bgColor = "orange"
                config.icon = <CheckBillIcon />
                break;
            default:
                config.bgColor = "theme.300"
                config.icon = <EmptyTableIcon />
                break;
        }
        return config;
    }

    useEffect(() => {
        const x = `${table.x}px`;
        const y = `${table.y}px`;
        setWidth(`${(1 + table.size * 10 / 100) * 120}px`)
        setPositionX(x);
        setPositionY(y);
    }, [table]);


    const viewLargerDevices = () => {
        return (
            <Box
                width={width}
                height="10vh"
                margin={10}
                borderWidth="2px"
                borderRadius="lg"
                position="absolute"
                top={positionY}
                left={positionX}
                marginTop={200}
                bg={tableConfiguration(table.state).bgColor}
            >
                <Box d="flex" justifyContent="center" alignItems="center" h="100%">
                    {tableConfiguration(table.state).icon}

                </Box>
            </Box>
        )
    }

    const viewSmallDevices = () => {
        return (
            <VStack bgColor={bgColor} key={table.id} margin="3" width="100%" borderRadius="lg" shadow="md">
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
            </VStack>
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