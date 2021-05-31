import { useState } from 'react';
import React from "react"
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogHeader, AlertDialogFooter , AlertDialogCloseButton, Button } from '@chakra-ui/react';

const DialogDisplay = ({ header, firstOption, secondOption, message, action }) => {
    const [isOpen, setIsOpen] = useState(true);
    const onCloseDialog = () => setIsOpen(false);
    const cancelRef = React.useRef();

    const onClick = () => {
        action;
        onCloseDialog;
    }

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            motionPreset="slideInBottom"
            onClose={onCloseDialog}
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
                <Button ref={cancelRef} onClick={onCloseDialog}>
                    {firstOption}
                </Button>
                <Button colorScheme="blackAlpha" ml={3} onClick={onClick}>
                    {secondOption}
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogDisplay;