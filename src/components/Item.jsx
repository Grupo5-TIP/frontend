import { Stack, Button, Text } from '@chakra-ui/react';
import {parseCurrency} from "../utils/currency";

const Item = ({ item, onDeleteProduct }) => {
    return (
        <Stack key={item.id} direction="row">
            <Stack width="100%">
                <Stack
                    alignItems="center"
                    direction="row"
                    fontWeight="500"
                    justifyContent="space-between"
                    spacing={"10"}
                >
                    <Text fontSize="lg">{item.name}</Text>
                    <Text as="samp">{parseCurrency(item.price * item.amount)}</Text>
                    <Button
                        borderRadius={5}
                        color="theme.100"
                        size="xs"
                        onClick={() => onDeleteProduct(item)}
                    >
                        x
                    </Button>
                </Stack>
                <Stack direction="row">
                    {/*<Button
                        borderRadius={5}
                        color="theme.100"
                        size="xs"
                        onClick={() => console.log("agregando...")}//onClick={() => onDecrement(product)}
                    >
                        +
                    </Button>*/}
                    <Text fontWeight="500">
                        Cant: {item.amount}
                    </Text>
                    {/*<Button
                        borderRadius={5}
                        color="theme.100"
                        size="xs"
                        onClick={() => console.log("sacando...")}//onClick={() => onIncrement(product)}
                    >
                        -
                    </Button>*/}
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Item;