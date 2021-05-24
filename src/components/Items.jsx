import { Stack, Divider, Text } from '@chakra-ui/react';
import Item from './Item';

const Items = ({items, onDeleteProduct, onAddProduct, onDeleteAllProduct}) =>{
    return(
        <Stack data-testid='test-items' divider={<Divider />} spacing={4}>
            {
              items.length ?
                items.map( 
                  (item) => (
                      <Item key = {item.product.id}
                        item = {item}
                        onDeleteProduct = {onDeleteProduct}
                        onAddProduct={onAddProduct}
                        onDeleteAllProduct = {onDeleteAllProduct}
                      />
                    )
              )
                :
                    <Text color="gray.400" data-testid='items-error'>No hay elementos en tu orden</Text>
            }

            


        </Stack>
    )
}

export default Items;