import { Flex } from '@chakra-ui/react'
import Bill from '../components/Bill'

const Checkout = () => {
    return(
        <Flex justifyContent={"center"} flexGrow={1}>
            <Bill/>
        </Flex>
    )
}

export default Checkout;