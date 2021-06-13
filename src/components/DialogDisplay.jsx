import React from "react"
import {
    AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody,
    AlertDialogHeader, AlertDialogFooter, AlertDialogCloseButton, Button,
    FormControl, FormLabel, Radio, RadioGroup, HStack, Flex, Input, Box
} from '@chakra-ui/react';
import { hover } from '../utils/buttonDesign';
import { useState } from "react";

const DialogDisplay = ({ header, firstOption, secondOption, message, action, isOpen, onClose, onCloseAll, body, payment }) => {
    const cancelRef = React.useRef();

    const onClick = () => {
        action();
        onCloseAll();
    }


    const FieldsOnInvoice = () => {
        return (
            <Flex padding={3}>
                <FormControl as="fieldset">
                    <FormLabel as="invoice-option">Método de pago elegido</FormLabel>
                    <RadioGroup defaultValue="EF">
                        <HStack spacing="24px">
                            <Radio value="EF" id="valueEF" onChange={()=> payment.method = "EF"}>Efectivo</Radio>
                            <Radio value="MP" id="valueMP" onChange={()=> payment.method = "MP"}>Mercado pago</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
            </Flex>
        )
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
                    {body ?
                        <FieldsOnInvoice />
                        :
                        null
                    }
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button bg="gray.100" color="theme.100" variant="outline" ref={cancelRef} onClick={onClose}>
                        {firstOption}
                    </Button>
                    <Button bg="theme.100"
                        color="white"
                        margin="3px"
                        _hover={hover}
                        ml={3}
                        onClick={onClick}
                    >
                        {secondOption}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogDisplay;