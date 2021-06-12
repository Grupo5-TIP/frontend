import { Alert, AlertIcon } from '@chakra-ui/react';

const AlertDisplay = ({status, message}) =>{
    return (
        <Alert status={status} variant="solid" justifyContent="center" textAlign="center" data-testid="alert-message" fontSize="lg" fontWeight={400}>
            <AlertIcon />
            {message}
        </Alert>
    )
}

export default AlertDisplay;