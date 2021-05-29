import { Box, Text, Divider, Flex, Stack } from "@chakra-ui/react";
import { parseCurrency } from '../utils/currency';

const BillItem = ({ item }) => {
    const product = item.product;
    const amount = item.amount;
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
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default BillItem;

        {/*<Box>
            <Flex margin={5} width="100%" flexDir="row">
                <Flex flexDir="column">
                    <Text> {item.amount}x</Text>
                    <Text> { item.product.name}</Text>
                    <Text> {item.product.price * item.amount}</Text>
                </Flex>
            </Flex>
            <Divider paddingTop={2} />
        </Box>*/}