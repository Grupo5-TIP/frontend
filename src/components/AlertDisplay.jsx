import { Alert, AlertIcon } from '@chakra-ui/react';

const AlertDisplay = ({status, message}) =>{
    return (
        <Alert status={status} variant="solid" justifyContent="center" textAlign="center" data-testid="alert-message" >
            <AlertIcon />
            {message}
        </Alert>
    )
}

export default AlertDisplay;