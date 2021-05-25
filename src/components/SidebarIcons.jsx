import { Flex, Button,  } from '@chakra-ui/react'
import { MdPayment } from 'react-icons/md'
import { CgShoppingCart } from 'react-icons/cg'

const DrawerIcon = ({setDrawerOpen}) => {
    return (
        <Button
            bg="theme.200"
            boxShadow="lg"
            size="lg"
            margin={1}
            onClick={() => setDrawerOpen(true)}
        >
            <CgShoppingCart color="white" />
        </Button>
    )
}

const PaymentIcon = ({setPaymentOpen}) => {
    return (
        <Button
            bg="theme.500"
            boxShadow="lg"
            size="lg"
            margin={1}
            top="10px"
            onClick={() => setPaymentOpen(true)}
        >
            <MdPayment color="white" />
        </Button>
    )

}

const SidebarIcons = ({setDrawerOpen, setPaymentOpen}) => {
    return (
        <Flex flexDir="column" position="absolute" right="2%">
            <DrawerIcon setDrawerOpen={setDrawerOpen}/>
            <PaymentIcon setPaymentOpen={setPaymentOpen}/>
        </Flex>
    )
}

export default SidebarIcons;