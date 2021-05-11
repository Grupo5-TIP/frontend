import { Stack, Button, Text } from '@chakra-ui/react';
import {parseCurrency} from "../utils/currency";

const Item = ({ item, onDeleteProduct }) => {
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
                    <Text as="samp">{parseCurrency(product.price * amount)}</Text>
                    <Button
                        borderRadius={5}
                        color="theme.100"
                        size="xs"
                        onClick={() => onDeleteProduct(product)}
                    >
                        x
                    </Button>
                </Stack>
                <Stack direction="row">
                    <Text fontWeight="500">
                        Cantidad: {amount}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Item;