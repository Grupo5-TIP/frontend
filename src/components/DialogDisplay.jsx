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
    const [isFormValid, setIsFormValid] = useState(!body);
    const [methodSelected, setMethodSelected] = useState("EF");

    const onClick = () => {
        action();
        onCloseAll();
    }

    const validateForm = () =>{
        payment.method =  methodSelected;
        payment.amount = document.getElementById('amountPayment').value ;
        setIsFormValid( payment.method !== '' && payment.amount > 0);
    }

    const FieldsOnInvoice = () => {
        return (
            <Flex padding={3}>
                <FormControl as="fieldset" >
                    <FormLabel as="invoice-option">Método de pago elegido</FormLabel>
                    <RadioGroup defaultValue="EF">
                        <HStack spacing="24px">
                            <Radio value="EF" id="valueEF" onChange={()=> setMethodSelected(document.getElementById('valueEF').value) }>Efectivo</Radio>
                            <Radio value="MP" id="valueMP" onChange={()=> setMethodSelected(document.getElementById('valueMP').value) }>Mercado pago</Radio>
                        </HStack>
                    </RadioGroup>

                    <Box padding={3}>
                        <FormLabel>Monto a facturar</FormLabel>
                        <Input id="amountPayment" placeholder="Monto a facturar" onChange={() => validateForm()}/>
                    </Box>

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
                        disabled={!isFormValid}
                    >
                        {secondOption}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogDisplay;