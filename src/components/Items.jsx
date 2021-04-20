import { Stack, Divider } from '@chakra-ui/react';
import Item from './Item';

const Items = ({items, onDeleteProduct}) =>{
    return(
        <Stack divider={<Divider />} spacing={4}>
            {items.map((item) => (
                  <Item key = {item.product.id}
                    item = {item}
                    onDeleteProduct = {onDeleteProduct}
                  />
                ))}
        </Stack>
    )
}

export default Items;