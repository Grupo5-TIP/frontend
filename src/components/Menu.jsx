import { useHistory } from 'react-router-dom';
import { Flex, Button,  } from '@chakra-ui/react'
import { RiDashboardLine } from 'react-icons/ri'
import { BiFoodMenu } from 'react-icons/bi'

const DashboardIcon = ({history}) => {
    return (
        <Button
            bg="theme.200"
            boxShadow="lg"
            size="lg"
            margin={1}
            onClick={() => history.push("/dashboard/")}
        >
            <RiDashboardLine color="white" />
        </Button>
    )
}

const MenuIcon = ({history}) => {
    return (
        <Button
            bg="theme.200"
            boxShadow="lg"
            size="lg"
            margin={1}
            top="10px"
            onClick={() => history.push("/tables/")}
        >
            <BiFoodMenu color="white" />
        </Button>
    )

}

const Menu = () => {
    const history = useHistory();
    return (
        <Flex flexDir="column" position="absolute" right="2%">
            <DashboardIcon history={history}/>
            <MenuIcon history={history} />
        </Flex>
    )
}

export default Menu;