import { useState } from 'react';
import React from "react"
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogHeader, AlertDialogFooter , AlertDialogCloseButton, Button } from '@chakra-ui/react';

const DialogDisplay = ({ header, firstOption, secondOption, message, action, isOpen, onClose, onCloseAll }) => {
    const cancelRef = React.useRef();

    const onClick = () => {
        action();
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
                <Button ref={cancelRef} onClick={onClose}>
                    {firstOption}
                </Button>
                <Button bg="theme.100" color="white" ml={3} onClick={onClick}>
                    {secondOption}
                </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogDisplay;