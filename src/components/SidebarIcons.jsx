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

const PaymentIcon = () => {
    return (
        <Button
            bg="theme.500"
            boxShadow="lg"
            size="lg"
            top="10px"
            onClick={() => console.log("payment icon")}
        >
            <MdPayment color="white" />
        </Button>
    )

}

const SidebarIcons = ({setDrawerOpen}) => {
    return (
        <Flex flexDir="column" position="absolute" right="2%">
           <DrawerIcon setDrawerOpen={setDrawerOpen}/>
           <PaymentIcon/>
        </Flex>
    )
}

export default SidebarIcons;