import { Stack, Divider } from '@chakra-ui/react';
import Item from './Item';

const Items = ({items, onDeleteProduct}) =>{
    return(
        <Stack divider={<Divider />} spacing={4}>
            {items.map((product) => (
                  <Item key = {product.id}
                    item = {product}
                    onDeleteProduct = {onDeleteProduct}
                  />
                ))}
        </Stack>
    )
}

export default Items;