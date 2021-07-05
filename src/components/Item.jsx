import { Stack, Text, useMediaQuery, Flex, HStack, Box } from '@chakra-ui/react';
import { parseCurrency } from "../utils/currency";
import { IoMdAddCircle, IoMdCloseCircle, IoMdRemoveCircle } from 'react-icons/io'

const Item = ({ item, onDecreaseProduct, onAddProduct, onDeleteProduct }) => {
    const [isLarger] = useMediaQuery("(min-width: 500px)");
    const product = item.product;
    const amount = item.amount;
    
    const viewLargerDevices = () => {
        return (
            <Stack
                key={product.id}
                direction="row"
                borderColor="theme.300"
                borderRadius="10px"
                padding={0}
                alignItems="center"
                spacing={1}
                h="50px"
                w="100%"
                sm="30em"
                boxShadow="0 8px 6px -8px black"
                color="theme.100"
            >
                <Stack width="100%" >
                    <Stack
                        direction="row"
                        fontWeight="100"
                        alignSelf="left"
                        spacing={0}
                    >
                        <Text fontWeight="400" fontSize="20px" w="35%">{product.name.toUpperCase()}</Text>
                        <HStack w="20%" >
                            <Box >
                                <IoMdAddCircle
                                    aria-label="Add one"
                                    color="theme.100"
                                    size={25}
                                    onClick={() => onAddProduct(product)}>
                                </IoMdAddCircle>
                            </Box>
                            <Text fontWeight="400" fontSize="md" data-testid="amount">{amount} </Text>
                            <Box boxSize={6}>
                                <IoMdRemoveCircle
                                    aria-label="Remove one"
                                    color="theme.100"
                                    size={25}
                                    onClick={() => onDecreaseProduct(product)}>
                                </IoMdRemoveCircle>
                            </Box>

                        </HStack>

                        <Text fontWeight="400" data-testid="unit" w="20%">{parseCurrency(product.price)}</Text>
                        <Text fontWeight="400" data-testid="total" w="15%">{parseCurrency(product.price * amount)}</Text>
                        <Stack direction="row" justifyContent="center" spacing={2} marginBottom={5}>
                            <Box boxSize={6}>
                                <IoMdCloseCircle
                                    aria-label="Delete item"
                                    color="theme.100"
                                    size={25}
                                    onClick={() => onDeleteProduct(product)}>
                                </IoMdCloseCircle>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    const viewSmallDevices = () => {
        return (
            <Stack
                key={product.id}
                direction="row"
                borderColor="theme.300"
                borderRadius="10px"
                padding={3}
                alignItems="center"
                h="120px"
                w="300px"
                sm="30em"
                boxShadow="0 8px 6px -8px black"
                color="theme.100"
            >
                <Stack width="100%" >
                    <Stack
                        direction="row"
                        fontWeight="500"
                        alignSelf="center"
                        spacing={10}
                    >
                        <Text paddingTop={2} fontSize="md" data-testid="amount"> {amount}x </Text><Text fontSize="25px">{product.name.toUpperCase()}</Text>
                    </Stack>
                    <Stack direction="column">
                        <Stack direction="row" justifyContent="space-between">
                            <Text data-testid="total">{parseCurrency(product.price * amount)}</Text>

                            <Stack direction="row" justifyContent="center" spacing={1} marginBottom={5}>
                                <Box >
                                    <IoMdAddCircle
                                        aria-label="Add one"
                                        color="theme.100"
                                        size={25}
                                        onClick={() => onAddProduct(product)}>
                                    </IoMdAddCircle>
                                </Box>

                                <Box boxSize={6}>
                                    <IoMdRemoveCircle
                                        aria-label="Remove one"
                                        color="theme.100"
                                        size={25}
                                        onClick={() => onDecreaseProduct(product)}>
                                    </IoMdRemoveCircle>
                                </Box>

                                <Box boxSize={6}>
                                    <IoMdCloseCircle
                                        aria-label="Delete item"
                                        color="theme.100"
                                        size={25}
                                        onClick={() => onDeleteProduct(product)}>
                                    </IoMdCloseCircle>
                                </Box>

                                {/* <IconButton
                                    as={IoMdAddCircle}
                                    aria-label="Add one item"
                                    boxSize={6}
                                    color="theme.100"
                                    onClick={() => onAddProduct(product)}
                                />
                                <IconButton
                                    as={IoMdRemoveCircle}
                                    aria-label="Add one item"
                                    boxSize={6}
                                    color="theme.100"
                                    onClick={() => onDecreaseProduct(product)}
                                >
                                </IconButton>

                                <IconButton
                                    as={IoMdCloseCircle}
                                    aria-label="Add one item"
                                    boxSize={6}
                                    color="theme.100"
                                    onClick={() => onDeleteProduct(product)}
                                >
                               </IconButton>*/}
                            </Stack>
                        </Stack>
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

export default Item;