import { useHistory } from 'react-router-dom';
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

const PaymentIcon = ({tableId}) => {
    const history = useHistory();
    return (
        <Button
            bg="theme.500"
            boxShadow="lg"
            size="lg"
            margin={1}
            top="10px"
            onClick={() => history.push("/checkout/"+tableId)}
        >
            <MdPayment color="white" />
        </Button>
    )

}

const SidebarIcons = ({setDrawerOpen, tableId}) => {

    return (
        <Flex flexDir="column" position="absolute" right="2%">
            <DrawerIcon setDrawerOpen={setDrawerOpen}/>
            <PaymentIcon tableId={tableId} />
        </Flex>
    )
}

export default SidebarIcons;