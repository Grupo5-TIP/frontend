import { Alert, AlertIcon } from '@chakra-ui/react';

const AlertDisplay = ({status, message}) =>{
    return (
        <Alert status={status} variant="solid" justifyContent="center" textAlign="center">
            <AlertIcon />
            {message}
        </Alert>
    )
}

export default AlertDisplay;