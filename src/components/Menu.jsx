import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button, Box } from '@chakra-ui/react'
import { RiDashboardLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { BiFoodMenu } from 'react-icons/bi'

const LogoutIcon = ({ history }) => {
    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("username");
        history.push("/");
    }

    return (
        <Button
            bg="theme.500"
            boxShadow="lg"
            size="lg"
            margin={1}
            onClick={() => handleLogout()}
        >
            <RiLogoutBoxRLine color="white" />
        </Button>
    )
}

const DashboardIcon = ({ history, isAdmin }) => {
    return (
        <Box>
            {isAdmin === 'true'? <Button
                bg="theme.200"
                boxShadow="lg"
                size="lg"
                margin={1}
                onClick={() => history.push("/dashboard/")}
            >
                <RiDashboardLine color="white" />
            </Button> : null}
        </Box>

    )
}

const MenuIcon = ({ history }) => {
    return (
        <Button
            bg="theme.200"
            boxShadow="lg"
            size="lg"
            margin={1}
            onClick={() => history.push("/tables/")}
        >
            <BiFoodMenu color="white" />
        </Button>
    )

}

const Menu = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            setIsAdmin(localStorage.getItem("isAdmin"));
            setLoading(false)
        }
        fetchData();
        setLoading(true)
    }, [setIsAdmin, setLoading])

    return (
        <Flex flexDir="column" position="absolute" right="2%">
            {loading ?
                <Flex flexDir="column" spacing={2}>
                    <DashboardIcon history={history} isAdmin={isAdmin} />
                    <MenuIcon history={history} />
                    <LogoutIcon history={history} />
                </Flex>

                : null
            }
        </Flex>

    )

}

export default Menu;