import React from "react"
import {
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogHeader, AlertDialogFooter, AlertDialogCloseButton, Button
} from '@chakra-ui/react';
import { hover } from '../utils/buttonDesign';

const DialogPaymentDisplay = ({ header, firstOption, message, action1, action2, isOpen, onClose, onCloseAll }) => {
    const cancelRef = React.useRef();

    const onClickAction1 = () => {
        action1();
        onCloseAll();
    }

    const onClickAction2 = () => {
        action2();
        onCloseAll();
    }

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            closeOnEsc
            closeOnOverlayClick
        >
            <AlertDialogOverlay />

            <AlertDialogContent>
                <AlertDialogHeader>{header}</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {message}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button bg="gray.100" margin="25px" color="theme.100" variant="outline" ref={cancelRef} onClick={onClose}>
                        {firstOption}
                    </Button>
                    <Button bg="theme.100"
                        color="white"                        
                        _hover={hover}
                        ml={3}
                        onClick={onClickAction1}
                    >
                        Efectivo
                    </Button>
                    <Button bg="theme.100"
                        color="white"                        
                        _hover={hover}
                        ml={3}
                        onClick={onClickAction2}
                    >
                        Mercado Pago
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogPaymentDisplay;