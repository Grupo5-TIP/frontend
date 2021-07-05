import { useState, useEffect } from 'react'
import { Flex } from "@chakra-ui/layout";
import { Stack, Box, Text, Icon, VStack, useMediaQuery } from "@chakra-ui/react"
import './Table.css'

const Table = ({ table }) => {
    const [isLarger] = useMediaQuery("(min-width: 380px)");
    const [bgColor, setBgColor] = useState("theme.200");
    const [positionX, setPositionX] = useState("");
    const [positionY, setPositionY] = useState("");
    const [width, setWidth] = useState("");
    const [stateTable, setStateTable] = useState("Disponible");
    const [iconTable, setIconTable] = useState();
    const [heartBeatClass, setHeartBeatClass] = useState('');

    const CheckBillIcon = () => {
        return (
            <Icon w="3em" h="3em" viewBox="0 0 380.721 380.721">
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
            <Icon w="3em" h="3em" viewBox="0 0 380.721 380.721">
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
            <Icon w="3em" h="3em" viewBox="0 0 380.721 380.721" x="0px" y="0px"> {/*agrandar más con width="100px" height="100px" */}
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

    const MercadoPagoIcon = () => {
        return (
            <Icon w="4em" h="4em" viewBox="0 0 48 48"><ellipse cx="23.5" cy="23.5" fill="none" rx="21.5" ry="15.5" />
            <path d="M22.471,24.946c-1.978-5.537-4.884-10.881-6.085-12.995c-0.352-0.619-0.787-1.186-1.29-1.69 l-2.553-2.553c-0.391-0.391-1.414,
            0-1.414,0L9.497,8.734l-0.162,2.319L8.773,11c-0.518,0-0.938,0.42-0.938,0.938 c0,0.52,0.413,0.969,0.933,0.961c1.908-0.03,3.567,1.601,3.567,1.601h2c0.32,
            0.32,1.139,1.366,1.328,2.439 c0.107,0.611,0.154,1.229,0.119,1.848C15.458,24.622,16.835,26,16.835,26c-5.5-3.5-14.819-2.964-14.819-2.964l0.193,3.016L5,
            31 c0.919,0.212,0.744-0.626,1.765-0.504c6.199,0.741,13.57,0.004,13.57,0.004c1.5,0,1.958-0.793,2.665-1.5 C24,28,22.849,26.004,22.471,24.946z" />
            <path d="M24.913,24.946c1.978-5.537,4.884-10.881,6.085-12.995c0.352-0.619,0.787-1.186,1.29-1.69 l2.553-2.553c0.391-0.391,1.414,0,1.414,
            0L37.814,9l0.235,2.053L38.611,11c0.518,0,0.938,0.42,0.938,0.938 c0,0.52-0.413,0.969-0.933,0.961c-1.908-0.03-3.567,1.601-3.567,1.601h-2c-0.32,0.32-1.139,
            1.366-1.328,2.439 c-0.107,0.611-0.154,1.229-0.119,1.848C31.926,24.622,30.549,26,30.549,26c5.5-3.5,15-3,15-3l-0.165,3l-3,5 c-0.919,
            0.212-0.744-0.626-1.765-0.504c-6.199,0.741-13.57,0.004-13.57,0.004c-1.5,0-1.958-0.793-2.665-1.5 C23.384,28,24.535,26.004,24.913,24.946z" />
            <path d="M43.832,16.326c-0.311-0.415-0.644-0.808-0.992-1.187c-0.059-0.064-0.123-0.123-0.183-0.186 c-0.309-0.326-0.628-0.639-0.96-0.938c-0.026-0.023-0.053-0.045-0.079-0.068c-0.587-0.522-1.201-1.012-1.845-1.454 c0.071-0.175,0.11-0.364,0.11-0.555c0-0.792-0.643-1.437-1.481-1.437c-0.001,0-0.003,0-0.004,0l-0.015,0.002V9.32 c0-0.534-0.288-1.032-0.75-1.299L36.269,7.24c-0.221-0.085-1.356-0.478-1.946,0.113l-1.837,1.838 c-0.381-0.106-0.89-0.25-1.211-0.326C28.893,8.288,26.446,8.014,24,8c-3.031-0.004-6.095,0.39-9.018,1.275l-1.921-1.921 c-0.59-0.59-1.725-0.199-2.018-0.079L9.75,8.021C9.288,8.288,9,8.786,9,9.32v1.186L8.938,10.5c-0.793,0-1.438,0.646-1.438,1.438 c0,0.311,0.103,0.614,0.283,0.865c-0.978,0.715-1.903,1.512-2.722,2.422c-0.315,0.35-0.616,0.715-0.9,1.096 C2.638,18.346,2.061,20.87,2,23.5c-0.035,2.628,0.455,5.223,1.932,7.343c1.478,2.132,3.451,3.854,5.624,5.163 c4.378,2.609,9.436,3.749,14.444,3.846c2.511-0.026,5.023-0.319,7.471-0.924c2.442-0.624,4.81-1.582,6.986-2.9 c2.163-1.328,4.143-3.041,5.617-5.18c1.476-2.122,1.932-4.719,1.894-7.347C45.905,20.87,45.357,18.348,43.832,16.326z M40.793,15.139c0.229,0.225,0.448,0.459,0.662,0.697c0.096,0.107,0.195,0.211,0.288,0.32c0.293,0.347,0.573,0.703,0.828,1.076 c1.088,1.579,1.785,3.39,1.957,5.242c-2.274-0.031-8.444,0.114-13.042,2.342c0.335-1.133,0.619-3.016,0.449-6.058 c-0.03-0.552,0.008-1.135,0.113-1.733c0.139-0.79,0.702-1.618,1.054-2.026h0.727c0.731,0,1.432-0.224,2.025-0.647 c0.624-0.444,1.559-0.981,2.588-0.954c0.072,0,0.139-0.03,0.21-0.04c0.267,0.192,0.536,0.383,0.792,0.587 c0.076,0.061,0.15,0.124,0.225,0.186c0.273,0.224,0.538,0.457,0.795,0.696C40.576,14.93,40.686,15.034,40.793,15.139z M24,9 c2.369,0.026,4.734,0.303,7.027,0.87c0.208,0.053,0.412,0.118,0.617,0.181c-0.482,0.503-0.906,1.054-1.246,1.652 c-1.175,2.068-4.124,7.483-6.121,13.075c-0.075,0.208-0.163,0.43-0.255,0.66c-0.112,0.281-0.226,0.572-0.331,0.868 c-0.104-0.296-0.219-0.588-0.331-0.868c-0.092-0.23-0.18-0.452-0.255-0.66c-2-5.599-4.947-11.009-6.121-13.075 c-0.297-0.523-0.667-1.004-1.074-1.456C18.522,9.461,21.264,9.054,24,9z M5.435,17.238c0.251-0.364,0.524-0.713,0.811-1.052 c0.094-0.112,0.196-0.218,0.294-0.327c0.202-0.225,0.408-0.448,0.625-0.662c0.115-0.114,0.233-0.224,0.351-0.335 c0.229-0.213,0.463-0.421,0.704-0.622c0.099-0.083,0.198-0.166,0.299-0.247c0.243-0.193,0.495-0.376,0.748-0.558 c0.886,0.089,1.707,0.522,2.262,0.918C12.123,14.776,12.823,15,13.555,15h0.727c0.352,0.407,0.915,1.235,1.054,2.026 c0.105,0.597,0.143,1.18,0.113,1.733c-0.17,3.042,0.114,4.927,0.449,6.059c-4.193-2.029-9.734-2.333-12.425-2.344 C3.648,20.623,4.346,18.814,5.435,17.238z M6.236,30.271c-0.192-0.224-0.396-0.437-0.572-0.673 C4.329,27.826,3.49,25.705,3.426,23.5c0-0.008,0.001-0.017,0.001-0.025c2.878,0.006,9.226,0.351,13.305,2.947 c0.211,0.134,0.484,0.088,0.646-0.104c0.162-0.19,0.153-0.477-0.014-0.662c-0.012-0.014-1.218-1.422-0.916-6.842 c0.035-0.63-0.007-1.29-0.126-1.962c-0.218-1.235-1.133-2.372-1.467-2.706C14.76,14.053,14.632,14,14.5,14h-0.945 c-0.522,0-1.021-0.159-1.445-0.462c-0.745-0.531-1.925-1.147-3.185-1.14c-0.131,0.004-0.226-0.063-0.281-0.117 C8.552,12.192,8.5,12.067,8.5,11.938c0-0.242,0.196-0.438,0.391-0.44l0.562,0.054c0.111,0.007,0.216-0.027,0.308-0.084l0.386,0.386 C10.242,11.949,10.37,12,10.5,12c0.053,0,0.106-0.009,0.158-0.025l1.207-0.402l1.281,1.281C13.244,12.951,13.372,13,13.5,13 s0.256-0.049,0.354-0.146c0.195-0.195,0.195-0.512,0-0.707L12.707,11l0.146-0.146C12.951,10.756,13,10.628,13,10.5 s-0.049-0.256-0.146-0.354l-1-1c-0.195-0.195-0.512-0.195-0.707,0C11.049,9.244,11,9.372,11,9.5s0.049,0.256,0.146,0.354 l0.646,0.646l-0.063,0.063l-1.095,0.365L10,10.293V9.32c0-0.178,0.096-0.344,0.25-0.434l1.22-0.712 c0.365-0.139,0.792-0.179,0.883-0.114l2.554,2.554c0.475,0.475,0.882,1.007,1.209,1.583c1.161,2.043,4.076,7.393,6.049,12.917 c0.078,0.219,0.171,0.452,0.267,0.694c0.347,0.871,0.741,1.858,0.58,2.583C22.808,29.309,21.728,30,20.49,30 c-0.07,0.002-7.123,0.139-13.425,0.011C6.798,30.002,6.509,30.114,6.236,30.271z M37.217,33.918 c-1.98,1.119-4.156,1.898-6.385,2.419c-2.228,0.539-4.528,0.798-6.832,0.812c-4.592,0.01-9.259-0.951-13.23-3.208 c-1.401-0.799-2.709-1.764-3.832-2.891c0.036-0.014,0.083-0.038,0.107-0.039C13.367,31.138,20.439,31.001,20.5,31 c1.396,0,2.616-0.673,3.192-1.67c0.575,0.997,1.794,1.67,3.182,1.67c0.071,0.002,7.146,0.139,13.462,0.011 c0.089,0.003,0.272,0.102,0.483,0.249C39.748,32.289,38.531,33.185,37.217,33.918z M42.329,29.593 c-0.247,0.329-0.526,0.635-0.803,0.941c-0.37-0.273-0.81-0.524-1.192-0.524c-0.005,0-0.011,0-0.017,0 c-6.3,0.125-13.354-0.01-13.434-0.011c-1.228,0-2.308-0.691-2.512-1.608c-0.161-0.725,0.232-1.712,0.58-2.583 c0.096-0.242,0.189-0.476,0.267-0.694c1.971-5.518,4.887-10.871,6.049-12.917c0.327-0.576,0.734-1.108,1.209-1.583l2.55-2.551 C35.122,8,35.548,8.037,35.841,8.14l1.293,0.747c0.154,0.09,0.25,0.256,0.25,0.434v0.973l-0.635,0.635l-1.095-0.365L35.591,10.5 l0.646-0.646c0.098-0.098,0.146-0.226,0.146-0.354s-0.049-0.256-0.146-0.354c-0.195-0.195-0.512-0.195-0.707,0l-1,1 c-0.098,0.098-0.146,0.226-0.146,0.354s0.049,0.256,0.146,0.354L34.677,11l-1.146,1.146c-0.195,0.195-0.195,0.512,0,0.707 C33.628,12.951,33.756,13,33.884,13s0.256-0.049,0.354-0.146l1.281-1.281l1.207,0.402C36.777,11.991,36.831,12,36.884,12 c0.13,0,0.258-0.051,0.354-0.146l0.386-0.386c0.092,0.057,0.197,0.092,0.308,0.084l0.515-0.052c0.242,0,0.438,0.196,0.438,0.438 c0,0.129-0.052,0.254-0.143,0.343c-0.056,0.055-0.157,0.109-0.282,0.117c-1.279,0.011-2.439,0.608-3.185,1.14 C34.851,13.841,34.352,14,33.83,14h-0.946c-0.133,0-0.26,0.053-0.354,0.146c-0.334,0.334-1.25,1.473-1.467,2.706 c-0.118,0.674-0.161,1.334-0.126,1.963c0.302,5.419-0.904,6.827-0.907,6.831c-0.18,0.181-0.196,0.468-0.037,0.666 c0.159,0.199,0.442,0.246,0.659,0.109c4.408-2.805,11.576-2.969,13.922-2.942c0,0.007,0.001,0.013,0.001,0.02 C44.507,25.705,43.666,27.824,42.329,29.593z" />
            </Icon>
        )
    }

    const tableConfiguration = (tableState) => {
        switch (tableState) {
            case "empty":
                setBgColor("green.400");
                setIconTable(<EmptyTableIcon />);
                setStateTable("Disponible")
                break;
            case "inUse":
                setBgColor("red.500");
                setIconTable(<FullTableIcon />);
                setStateTable("En uso")
                break;
            case "bill":
                setBgColor("orange");
                setIconTable(<CheckBillIcon />);
                setStateTable("Llamada mozo")
                setHeartBeatClass("heartbeat")
                break;
            case "mercadoPago":
                setBgColor("facebook.300");
                setIconTable(<MercadoPagoIcon />);
                setStateTable("Llamada mozo")
                break;
            default:
                setBgColor("green.400");
                setIconTable(<EmptyTableIcon />);
                setStateTable("Disponible")
                break;
        }
    }

    useEffect(() => {
        const x = `${table.x}px`;
        const y = `${table.y}px`;
        setWidth(`${(1 + table.size * 10 / 100) * 120}px`)
        setPositionX(x);
        setPositionY(y);
        tableConfiguration(table.state);
    }, [table]);


    const viewLargerDevices = () => {
        return (
            <Box
                width={width}
                height="10vh"
                borderWidth="2px"
                borderRadius="lg"
                position="absolute"
                top={positionY}
                left={positionX}
                marginLeft="20%"
                marginTop="12.5%"
                bg={bgColor}
                display="flex"
                justifyContent="space-between"
                padding={5}
                boxShadow="0px 8px 10px -5px #000000"
                className={heartBeatClass}
            >
                <Text fontSize="30px" fontWeight={900}>{table.id}</Text>
                <Box d="flex" justifyContent="center" alignItems="center" h="100%" title={stateTable}>
                    {iconTable}
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
                    className="animate__heartBeat"
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