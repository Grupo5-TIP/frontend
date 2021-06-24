import { withRouter, Redirect  } from 'react-router-dom';
import { Flex } from '@chakra-ui/react'
import { validateLogin } from '../utils/validate-login';

const Checkout = (...props) => {
    return(
        <Flex justifyContent={"center"} flexGrow={1} width="100%">
            {
                !validateLogin() ? <Redirect to="/" /> : <p>Dashboard...</p>
            }
        </Flex>
    )
}

export default withRouter(Checkout);