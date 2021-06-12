import { withRouter } from 'react-router-dom';
import { Flex } from '@chakra-ui/react'
import Bill from '../components/Bill'

const Checkout = (...props) => {
    return(
        <Flex justifyContent={"center"} flexGrow={1} width="100%">
            <Bill tableId={props[0].match.params.tableid}></Bill>
        </Flex>
    )
}

export default withRouter(Checkout);