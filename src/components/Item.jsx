import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Stack, Text, useMediaQuery, Flex } from '@chakra-ui/react';
import { parseCurrency } from "../utils/currency";

const Item = ({ item, onDecreaseProduct, onAddProduct, onDeleteProduct }) => {
    const [isLarger] = useMediaQuery("(min-width: 380px)");
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
                        <Text fontSize="20px" w="35%">{product.name.toUpperCase()}</Text>
                        <Text paddingTop={2} fontSize="md" w="20%" data-testid="amount">{amount} </Text>                        
                        <Text data-testid="unit" w="20%">{parseCurrency(product.price)}</Text>
                        <Text data-testid="total" w="15%">{parseCurrency(product.price * amount)}</Text>
                        <Stack direction="row" justifyContent="center" spacing={2} marginBottom={5}>

                            <AddIcon
                                color="theme.100"
                                aria-label="Add one item"
                                boxSize={2.5}
                                onClick={() => onAddProduct(product)}
                            >
                            </AddIcon>
                            <MinusIcon
                                color="theme.100"
                                aria-label="Delete one item"
                                boxSize={2.5}
                                onClick={() => onDecreaseProduct(product)}
                            >
                            </MinusIcon>
                            <CloseIcon
                                color="theme.100"
                                aria-label="Delete all"
                                boxSize={2.5}
                                onClick={() => onDeleteProduct(product)}
                            >
                            </CloseIcon>
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
                spacing={1}
                h="120px"
                w="270px"
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

                            <Stack direction="row" justifyContent="center" spacing={2} marginBottom={5}>

                                <AddIcon
                                    color="theme.100"
                                    aria-label="Add one item"
                                    boxSize={2.5}
                                    onClick={() => onAddProduct(product)}
                                >
                                </AddIcon>
                                <MinusIcon
                                    color="theme.100"
                                    aria-label="Delete one item"
                                    boxSize={2.5}
                                    onClick={() => onDecreaseProduct(product)}
                                >
                                </MinusIcon>
                                <CloseIcon
                                    color="theme.100"
                                    aria-label="Delete all"
                                    boxSize={2.5}
                                    onClick={() => onDeleteProduct(product)}
                                >
                                </CloseIcon>
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