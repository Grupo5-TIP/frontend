import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Stack, Text } from '@chakra-ui/react';
import { parseCurrency } from "../utils/currency";

const Item = ({ item, onDecreaseProduct, onAddProduct, onDeleteProduct }) => {
    const product = item.product;
    const amount = item.amount;

    return (
        <Stack
            key={product.id}
            direction="row"
            borderColor="theme.300"
            borderRadius="md"
            justifyContent="center"
            padding={3}
            alignItems="center"
            spacing={1}
            h="100px"
            w="280px"
            sm="30em"
            shadow="lg"
            color="theme.100"
        >
            <Stack width="100%">
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

                        <Stack direction="row" justifyContent="center" spacing={3}>

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

export default Item;