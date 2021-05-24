import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { Stack, Button, Text, IconButton } from '@chakra-ui/react';
import {parseCurrency} from "../utils/currency";

const Item = ({ item, onDeleteProduct, onAddProduct, onDeleteAllProduct }) => {
    const product = item.product;
    const amount = item.amount;

    return (
        <Stack key={product.id} direction="row">
            <Stack width="100%">
                <Stack
                    alignItems="center"
                    direction="row"
                    fontWeight="500"
                    justifyContent="space-between"
                    spacing={"10"}
                >
                    <Text fontSize="lg">{product.name}</Text>
                    <Text as="samp" data-testid="total">{parseCurrency(product.price * amount)}</Text>
                    {/*<IconButton
                        bg="theme.100"
                        boxSize="20px"
                        aria-label="Delete item"
                        icon={<CloseIcon color="white"/>}
                        onClick={() => console.log("gggg product")}
                    >
                    </IconButton>*/}
                    <AddIcon
                        color="theme.100"
                        aria-label="Add one item"
                        onClick={() => onAddProduct(product)}
                    >
                    </AddIcon>
                    <MinusIcon
                        color="theme.100"
                        aria-label="Delete one item"
                        onClick={() => onDeleteProduct(product)}
                    >
                    </MinusIcon>
                    <CloseIcon
                        color="theme.100"
                        aria-label="Delete all"
                        onClick={() => onDeleteAllProduct(product)}
                    >
                    </CloseIcon>
                    {/*<Button
                        borderRadius={5}
                        color="theme.100"
                        size="xs"
                        onClick={() => onDeleteProduct(product)}
                        data-testid="button-delete"
                    >
                        x
                    </Button>*/}
                </Stack>
                <Stack direction="row">
                    <Text fontWeight="500" data-testid="amount">
                        Cantidad: {amount}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Item;