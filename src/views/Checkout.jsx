import { Flex } from '@chakra-ui/react'
import Bill from '../components/Bill'

const Checkout = (...props) => {
    return(
        <Flex justifyContent={"center"} flexGrow={1}>
            <Bill tableId={7}></Bill>
        </Flex>
    )
}

export default Checkout;