import { Text, Divider, Flex, Stack, Heading} from "@chakra-ui/react";
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
            alignItems="center"
            spacing={1}
            h="50px"
            w="340px"
            sm="30em"
            padding={2}
            color="theme.100"
        >
            <Stack width="100%" >
                <Flex
                    direction="row"
                    fontWeight="500"
                    spacing={5}
                    justifyContent="space-between"
                >
                    <Text paddingTop={0} fontSize="md" data-testid="amount"> {amount}x </Text><Heading fontSize="19px">{product.name}</Heading>
                    <Text data-testid="total">{parseCurrency(product.price * amount)}</Text>
                </Flex>
                <Divider />
            </Stack>
            
        </Stack>
    )
}

export default BillItem;